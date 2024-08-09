<template>
    <Navbar />
    <Sidebar />
    <div class="wrapper">
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="container py-3">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Daftar Barang</h3>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-primary mb-4" @click="openAddModal">
                                    Add Barang
                                </button>

                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped">

                                        <thead>
                                            <tr>
                                                <th>Kode</th>
                                                <th>Nama</th>
                                                <th>Harga</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="barang in barangs" :key="barang.id">
                                                <td>{{ barang.kode }}</td>
                                                <td>{{ barang.nama }}</td>
                                                <td>{{ barang.harga }}</td>
                                                <td>
                                                    <button class="btn btn-warning btn-sm"
                                                        @click="openEditModal(barang)">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm ml-2"
                                                        @click="deletebarang(barang.id)">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <!-- Add barang Modal -->
                                    <div v-if="showAddModal" class="modal fade show" style="display: block;"
                                        tabindex="-1" role="dialog" aria-labelledby="addbarangModalLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="addbarangModalLabel">Add barang</h5>
                                                    <button type="button" class="close" @click="closeAddModal">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form @submit.prevent="addbarang">
                                                        <div class="form-group">
                                                            <label for="nama">Nama:</label>
                                                            <input v-model="newbarang.nama" type="text"
                                                                class="form-control" id="nama" required />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="harga">Harha:</label>
                                                            <input v-model="newbarang.harga" type="text"
                                                                class="form-control" id="harga" required />
                                                        </div>
                                                        <button type="submit" class="btn btn-primary mx-1">Add</button>
                                                        <button type="button" class="btn btn-secondary mx-1"
                                                            @click="closeAddModal">Cancel</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Edit barang Modal -->
                                    <div v-if="showEditModal" class="modal fade show" style="display: block;"
                                        tabindex="-1" role="dialog" aria-labelledby="editbarangModalLabel"
                                        aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="editbarangModalLabel">Edit barang</h5>
                                                    <button type="button" class="close" @click="closeEditModal">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <form @submit.prevent="updatebarang">
                                                        <div class="form-group">
                                                            <label for="edit-nama">Nama:</label>
                                                            <input v-model="currentBarang.nama" type="text"
                                                                class="form-control" id="edit-nama" required />
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="edit-harga">Telepon:</label>
                                                            <input v-model="currentBarang.harga" type="text"
                                                                class="form-control" id="edit-harga" required />
                                                        </div>
                                                        <button type="submit"
                                                            class="btn btn-primary mx-1">Update</button>
                                                        <button type="button" class="btn btn-secondary mx-1"
                                                            @click="closeEditModal">Cancel</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import axios from '@/plugins/axios'
import Swal from 'sweetalert2';

export default {
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            barangs: [],
            newbarang: {
                kode: '',
                nama: '',
                harga: ''
            },
            currentBarang: {},
            showAddModal: false,
            showEditModal: false
        }
    },
    methods: {
        async fetchbarangs() {
            try {
                const response = await axios.get('/barangs')
                this.barangs = response.data
            } catch (error) {
                console.error('Error fetching barangs:', error)
            }
        },
        openAddModal() {
            this.showAddModal = true
        },
        closeAddModal() {
            this.showAddModal = false
        },
        openEditModal(barang) {
            this.currentBarang = { ...barang }
            this.showEditModal = true
        },
        closeEditModal() {
            this.showEditModal = false
        },
        async addbarang() {
            try {
                this.newbarang.kode = 'C' + (this.barangs.length + 1).toString().padStart(3, '0')
                const response = await axios.post('/barangs', this.newbarang)
                this.barangs.push(response.data)
                this.newbarang = { kode: '', nama: '', harga: '' }
                this.closeAddModal()
                Swal.fire({
                    icon: 'success',
                    title: 'Customer Added',
                    text: 'The customer has been added successfully!',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error adding the customer. Please try again.',
                    confirmButtonText: 'OK'
                });
                console.error('Error adding barang:', error)
            }
        },
        async updatebarang() {
            try {
                const response = await axios.put(`/barangs/${this.currentBarang.id}`, this.currentBarang)
                const index = this.barangs.findIndex(c => c.id === this.currentBarang.id)
                if (index !== -1) {
                    this.barangs[index] = response.data
                }
                this.closeEditModal()
                Swal.fire({
                    icon: 'success',
                    title: 'Barang Added',
                    text: 'The barang has been added successfully!',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error adding the barang. Please try again.',
                    confirmButtonText: 'OK'
                });
                console.error('Error updating barang:', error)
            }
        },
        async deletebarang(barangId) {
            try {
                await axios.delete(`/barangs/${barangId}`)
                this.barangs = this.barangs.filter(c => c.id !== barangId)
                Swal.fire(
                    'Deleted!',
                    'The barang has been deleted.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the barang. Please try again.',
                    'error'
                );
                console.error('Error deleting barang:', error)
            }
        }
    },
    mounted() {
        this.fetchbarangs()
    }
}
</script>
