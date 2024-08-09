<template>
    <div>
        <Navbar />
        <Sidebar />
        <div class="wrapper">
            <div class="content-wrapper">
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="container py-3">
                                <div class="card">
                                    <div class="card-header">
                                        <h3 class="card-title">Daftar Transaksi</h3>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mb-3">
                                            <div class="col-12 mb-2">
                                                <router-link class="btn btn-primary" to="transaksi">
                                                    <i class="bi bi-plus-lg"></i> Tambah Transaksi
                                                </router-link>
                                            </div>
                                            <div class="col-4">
                                                <input type="text" class="form-control mb-2" placeholder="Search"
                                                    v-model="searchQuery" />
                                            </div>
                                            <div class="col-4">
                                                <input type="date" class="form-control mb-2" v-model="dateFilter" />
                                            </div>
                                            <div class="col-4">
                                                <select class="form-control mb-2" v-model="selectedDiscount">
                                                    <option value="">Semua Diskon</option>
                                                    <option v-for="(item, index) in discountOptions" :key="index"
                                                        :value="item">
                                                        {{ formatCurrency(item) }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>No Transaksi</th>
                                                        <th>Tanggal</th>
                                                        <th>Nama</th>
                                                        <th>Kuantitas</th>
                                                        <th>Subtotal</th>
                                                        <th>Diskon</th>
                                                        <th>Ongkir</th>
                                                        <th>Total Bayar</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in filteredTransactions" :key="item.id">
                                                        <td>{{ index + 1 }}</td>
                                                        <td>{{ item.code }}</td>
                                                        <td>{{ formatDate(item.tgl) }}</td>
                                                        <td>{{ item.nama }}</td>
                                                        <td>{{ item.qty }}</td>
                                                        <td>{{ formatCurrency(item.subtotal) }}</td>
                                                        <td>{{ formatCurrency(item.diskon) }}</td>
                                                        <td>{{ formatCurrency(item.ongkir) }}</td>
                                                        <td>{{ formatCurrency(item.total_bayar) }}</td>
                                                        <td>
                                                            <div class="d-flex">
                                                                <button class="btn btn-warning btn-sm"
                                                                    @click="editTransaction(item)">
                                                                    <i class="bi bi-pencil"></i>
                                                                </button>
                                                                <button class="btn btn-danger btn-sm mx-2"
                                                                    @click="deleteTransaction(item.id, index)">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="9" class="text-right"><strong>Grand Total:</strong>
                                                        </td>
                                                        <td>{{ formatCurrency(grandTotal) }}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/plugins/axios'
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import Swal from 'sweetalert2';

export default {
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            searchQuery: '',
            dateFilter: '',
            selectedDiscount: '',
            transactions: [],
            grandTotal: 0
        }
    },
    computed: {
        filteredTransactions() {
            return this.transactions.filter(item => {
                const isDateMatch = this.dateFilter ? item.tgl.startsWith(this.dateFilter) : true
                const isDiscountMatch = this.selectedDiscount ? item.diskon === this.selectedDiscount : true
                const isSearchMatch = !this.searchQuery ||
                    item.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    item.tgl.includes(this.searchQuery)

                return isDateMatch && isDiscountMatch && isSearchMatch
            })
        },
        discountOptions() {
            const discounts = this.transactions.map(item => item.diskon);
            return [...new Set(discounts)];
        }
    },
    mounted() {
        this.fetchTransactions()
    },
    methods: {
        async fetchTransactions() {
            try {
                const response = await http.get('/transaksis')
                this.transactions = response.data.transaksis
                this.grandTotal = response.data.grandTotal
            } catch (error) {
                console.error('Error fetching transactions:', error)
            }
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString()
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
        },
        async deleteTransaction(id, index) {
            const result = await Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Anda tidak dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus itu!'
            });

            if (result.isConfirmed) {
                try {
                    await http.delete(`/transaksis/${id}`)
                    this.transactions.splice(index, 1)
                    Swal.fire(
                        'Dihapus!',
                        'Transaksi telah dihapus.',
                        'success'
                    );
                    await this.fetchTransactions();
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Terjadi kesalahan saat menghapus transaksi. Silakan coba lagi.',
                        'error'
                    );
                    console.error('Error deleting transaction:', error)
                }
            }
        },
        editTransaction(item) {
            console.log('Editing transaction:', item);
            this.currentTransaction = { ...item };
            this.showEditModal = true;
        },
    }
}
</script>
