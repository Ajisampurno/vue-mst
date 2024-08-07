<template>
    <div class="wrapper">
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="container p-3">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">{{ isEditMode ? 'Edit Transaksi' : 'Tambah Transaksi' }}</h3>
                                </div>
                                <div class="card-body">
                                    <form @submit.prevent="submitForm">
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="mb-2">
                                                    <label for="noTransaksi" class="form-label">No Transaksi</label>
                                                    <input type="text" id="noTransaksi"
                                                        class="form-control form-control-sm" v-model="transaction.kode"
                                                        required readonly />
                                                </div>
                                                <div class="mb-2">
                                                    <label for="tgl" class="form-label">Tanggal</label>
                                                    <input type="date" id="tgl" class="form-control form-control-sm"
                                                        v-model="transaction.tgl" required />
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="mb-2">
                                                    <label for="namaCustomer" class="form-label">Nama Customer</label>
                                                    <select v-model="transaction.cust_id"
                                                        class="form-control form-control-sm">
                                                        <option selected disabled>select customer</option>
                                                        <option v-for="customer in customers" :key="customer.cust_id"
                                                            :value="customer.id">
                                                            {{ customer.kode }} | {{ customer.nama }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Button to trigger modal -->
                                        <div class="d-flex justify-content-end">
                                            <button type="button" class="btn btn-success my-3"
                                                @click="showModal = true">
                                                <i class="bi bi-plus-lg"></i> Add
                                            </button>
                                        </div>

                                        <!-- Table -->
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-sm table-striped small-table">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">No</th>
                                                        <th class="text-center">Kode</th>
                                                        <th class="text-center">Nama</th>
                                                        <th class="text-center">Qty</th>
                                                        <th class="text-center">Harga Bandrol</th>
                                                        <th class="text-center">Disc %</th>
                                                        <th class="text-center">Disct Rp.</th>
                                                        <th class="text-center">Harga Diskon</th>
                                                        <th class="text-center">Total</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in cartItems" :key="index">
                                                        <td class="text-center">{{ index + 1 }}</td>
                                                        <td>
                                                            <input v-model="item.kode" type="text" class="form-table"
                                                                style="width: 60px;" readonly :value="item.kode">
                                                        </td>
                                                        <td>
                                                            <input v-model="item.nama" type="text" class="form-table"
                                                                readonly>
                                                        </td>
                                                        <td>
                                                            <input v-model="item.qty" type="text" class="form-table"
                                                                style="width: 30px;" readonly :value="item.qty">
                                                        </td>
                                                        <td>
                                                            <input v-model="item.harga_bandrol" type="text"
                                                                class="form-table" style="width: 70px;" readonly
                                                                :value="item.harga_bandrol">
                                                        </td>
                                                        <td>
                                                            <input v-model="item.diskon_pct" type="text"
                                                                class="form-table" style="width: 30px;" readonly
                                                                :value="item.diskon_pct">
                                                        </td>
                                                        <td>
                                                            <input v-model="item.diskon_nilai" type="text"
                                                                class="form-table" style="width: 90px;" readonly
                                                                :value="item.diskon_nilai">
                                                        </td>
                                                        <td>
                                                            <input v-model="item.harga_diskon" type="text"
                                                                class="form-table" style="width: 90px;" readonly
                                                                :value="item.harga_diskon">
                                                        </td>
                                                        <td>
                                                            <input v-model="item.total" type="text" class="form-table"
                                                                style="width: 90px;" readonly :value="item.total">
                                                        </td>
                                                        <td>
                                                            <button type="button" class="btn btn-warning btn-sm mx-1"
                                                                @click="editCartItem(index)"><i
                                                                    class="bi bi-pencil"></i></button>
                                                            <button type="button" class="btn btn-danger btn-sm mx-1"
                                                                @click="removeFromCart(index)"><i
                                                                    class="bi bi-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <div class="row justify-content-end mt-2">
                                            <div class="card text-dark bg-light" style="max-width: 18rem;">
                                                <div class="card-body">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td class="px-2">Subtotal</td>
                                                                <td class="px-2">:</td>
                                                                <td class="px-2">
                                                                    <input v-model="summary.subtotal" type="text"
                                                                        class="form-table">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-2">Diskon</td>
                                                                <td class="px-2">:</td>
                                                                <td class="px-2">
                                                                    <input v-model="transaction.diskon" type="text"
                                                                        style="max-width: 70px;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-2">Ongkir</td>
                                                                <td class="px-2">:</td>
                                                                <td class="px-2">
                                                                    <input v-model="transaction.ongkir" type="text"
                                                                        style="max-width: 70px;">
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td class="px-2">Total bayar</td>
                                                                <td class="px-2">:</td>
                                                                <td class="px-2">
                                                                    {{ new
                                                                        Intl.NumberFormat().format(summary.total_bayar) }}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row justify-content-center">
                                            <button type="submit" class="btn btn-primary mx-2"
                                                @click="submit">Submit</button>
                                            <button type="button" class="btn btn-secondary mx-2"
                                                @click="cancel">Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <!-- Modal -->
                            <div v-if="showModal" class="modal fade show" style="display: block;" aria-modal="true"
                                role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">{{ editIndex !== null ? 'Edit Item' : 'Add Item' }}
                                            </h5>
                                            <button type="button" class="close" @click="closeModal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="form-group">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <label>Kode</label>
                                                        <select v-model="cart.barang_id" class="form-control"
                                                            style="width: 100%;" @change="updateProductDetails">
                                                            <option selected disabled>select Kode</option>
                                                            <option v-for="barang in barangs" :key="barang.id"
                                                                :value="barang.id">
                                                                {{ barang.kode }}
                                                            </option>
                                                        </select>

                                                        <div class="form-group">
                                                            <label>Qty</label>
                                                            <input v-model="cart.qty" type="number"
                                                                class="form-control form-control-sm" min="1"
                                                                @input="updateTotals">
                                                        </div>

                                                        <div class="form-group">
                                                            <label>Diskon (%)</label>
                                                            <input v-model="cart.diskon_pct" type="number"
                                                                class="form-control form-control-sm" max="100" min="0"
                                                                @input="updateTotals">
                                                        </div>
                                                    </div>

                                                    <div class="col-6">
                                                        <div class="form-group">
                                                            <label>Nama</label>
                                                            <input v-model="cart.nama" type="text"
                                                                class="form-control form-control-sm" readonly>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Harga Bandrol</label>
                                                            <input v-model="cart.harga_bandrol" type="number"
                                                                class="form-control form-control-sm" readonly>
                                                        </div>

                                                        <div class="form-group">
                                                            <label>Diskon Nilai</label>
                                                            <input v-model="cart.diskon_nilai" type="number"
                                                                class="form-control form-control-sm" readonly>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Harga Diskon</label>
                                                            <input v-model="cart.harga_diskon" type="number"
                                                                class="form-control form-control-sm" readonly>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Total</label>
                                                            <input v-model="cart.total" type="number"
                                                                class="form-control form-control-sm" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                @click="closeModal">Close</button>
                                            <button type="button" class="btn btn-primary" @click="addToCart">Save
                                                changes</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- Backdrop -->
                            <div v-if="showModal" class="modal-backdrop fade show"></div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import http from '@/plugins/axios'

export default {
    data() {
        return {
            customers: [],

            isEditMode: false,
            cart: {
                barang_id: null,
                kode: '',
                nama: '',
                harga_bandrol: '',
                qty: null,
                diskon_pct: '',
                diskon_nilai: '',
                harga_diskon: '',
                total: ''
            },
            cartItems: [],
            showModal: false,
            barangs: [],
            editIndex: null,

            transaction: {
                kode: this.generateTransactionNumber(),
                tgl: '',
                cust_id: null,
                subtotal: 0,
                diskon: 0,
                ongkir: 0,
                total_bayar: 0,
                cartItems: [],
            },
        };
    },
    computed: {
        summary() {
            var ret = {
                subtotal: 0,
                total_bayar: 0
            };
            for (var i = 0; i < this.cartItems.length; i++) {
                ret.subtotal += Math.round(this.cartItems[i].total * 1, 2);
            }
            ret.total_bayar = ret.subtotal - this.transaction.diskon + this.transaction.ongkir;
            return ret;
        }
    },
    watch: {
        cartItems: {
            handler() {
                this.transaction.subtotal = this.summary.subtotal;
                this.transaction.total_bayar = this.summary.total_bayar;
            },
            deep: true
        }
    },
    methods: {
        updateTotals() {
            const hargaBandrol = parseFloat(this.cart.harga_bandrol) || 0;
            const qty = parseFloat(this.cart.qty) || 0;
            const diskonPct = parseFloat(this.cart.diskon_pct) || 0;
            const diskonNilai = hargaBandrol * (diskonPct / 100);
            const hargaDiskon = hargaBandrol - diskonNilai;
            const total = Math.round(hargaDiskon * qty);

            this.cart.diskon_nilai = Math.round(diskonNilai);
            this.cart.harga_diskon = Math.round(hargaDiskon);
            this.cart.total = total;
        },

        async fetchData() {
            try {
                const response = await http.get('/transaksis');
                this.barangs = response.data.barangs;
                this.customers = response.data.customers;
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        },
        generateTransactionNumber() {
            const now = new Date();
            //const datePart = now.toISOString().split('T')[0].replace(/-/g, '');
            const timePart = now.toTimeString().split(' ')[0].replace(/:/g, '');
            const randomPart = Math.floor(Math.random() * 1000);
            return `TRX-${timePart}-${randomPart}`;
        },

        updateProductDetails() {
            const selectedProduct = this.barangs.find(barang => barang.id === this.cart.barang_id);
            if (selectedProduct) {
                this.cart.kode = selectedProduct.kode;
                this.cart.nama = selectedProduct.nama;
                this.cart.harga_bandrol = selectedProduct.harga;
                this.updateTotals();
            }
        },

        //Modal item
        addToCart() {
            if (this.editIndex !== null) {
                this.cartItems[this.editIndex] = { ...this.cart };
                this.editIndex = null;
            } else {
                this.cartItems.push({ ...this.cart });
            }

            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

            this.cart = { barang_id: null, kode: '', nama: '', harga_bandrol: '', qty: 1, diskon_pct: 0, diskon_nilai: '', harga_diskon: '', total: '' };

            this.showModal = false;
        },
        removeFromCart(index) {
            this.cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        },
        editCartItem(index) {
            this.cart = { ...this.cartItems[index] };
            this.editIndex = index;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.cart = { barang_id: null, kode: '', nama: '', harga_bandrol: '', qty: 1, diskon_pct: 0, diskon_nilai: '', harga_diskon: '', total: '' };
            this.editIndex = null;
        },
        submit() {
            http.post('/transaksis', this.transaction)
                .then(response => {
                    console.log('Transaction created successfully:', response.data);
                    this.$router.push({ name: 'daftar-transaksi' });
                })
                .catch(error => {
                    console.error('Error creating transaction:', error.response.data);
                });
        }
    },
    mounted() {
        this.fetchData();
        this.transaction.subtotal = this.summary.subtotal;
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            this.cartItems = JSON.parse(savedCartItems);
            this.transaction.cartItems = JSON.parse(savedCartItems);
        }
    }
};
</script>

<style scoped>
.modal {
    transition: opacity 0.15s linear;
}

.form-table {
    border: 0;
    background-color: transparent;
}
</style>
