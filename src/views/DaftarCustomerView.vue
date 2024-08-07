<template>
    <div class="wrapper">
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="container py-3">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Daftar Customer</h3>
                            </div>
                            <div class="card-body">
                                <button class="btn btn-primary mb-4" @click="openAddModal">
                                    Add Customer
                                </button>

                                <div class="table-responsive">
                                    <table class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Kode</th>
                                                <th>Nama</th>
                                                <th>Telepon</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="customer in customers" :key="customer.id">
                                                <td>{{ customer.kode }}</td>
                                                <td>{{ customer.nama }}</td>
                                                <td>{{ customer.telp }}</td>
                                                <td>
                                                    <button class="btn btn-warning btn-sm"
                                                        @click="openEditModal(customer)">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                    <button class="btn btn-danger btn-sm ml-2"
                                                        @click="deleteCustomer(customer.id)">
                                                        <i class="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Add Customer Modal -->
                                <div v-if="showAddModal" class="modal fade show" style="display: block;" tabindex="-1"
                                    role="dialog" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="addCustomerModalLabel">Add Customer</h5>
                                                <button type="button" class="close" @click="closeAddModal">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form @submit.prevent="addCustomer">
                                                    <div class="form-group">
                                                        <label for="nama">Nama:</label>
                                                        <input v-model="newCustomer.nama" type="text"
                                                            class="form-control" id="nama" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="telp">Telepon:</label>
                                                        <input v-model="newCustomer.telp" type="text"
                                                            class="form-control" id="telp" required />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Add</button>
                                                    <button type="button" class="btn btn-secondary mx-1"
                                                        @click="closeAddModal">Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Edit Customer Modal -->
                                <div v-if="showEditModal" class="modal fade show" style="display: block;" tabindex="-1"
                                    role="dialog" aria-labelledby="editCustomerModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="editCustomerModalLabel">Edit Customer</h5>
                                                <button type="button" class="close" @click="closeEditModal">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form @submit.prevent="updateCustomer">
                                                    <div class="form-group">
                                                        <label for="edit-nama">Nama:</label>
                                                        <input v-model="currentCustomer.nama" type="text"
                                                            class="form-control" id="edit-nama" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="edit-telp">Telepon:</label>
                                                        <input v-model="currentCustomer.telp" type="text"
                                                            class="form-control" id="edit-telp" required />
                                                    </div>
                                                    <button type="submit" class="btn btn-primary">Update</button>
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
            </section>
        </div>
    </div>
</template>

<script>
import axios from '@/plugins/axios'
import Swal from 'sweetalert2';


export default {
    data() {
        return {
            customers: [],
            newCustomer: {
                kode: '',
                nama: '',
                telp: ''
            },
            currentCustomer: {},
            showAddModal: false,
            showEditModal: false
        }
    },
    methods: {
        async fetchCustomers() {
            try {
                const response = await axios.get('/customers')
                this.customers = response.data
            } catch (error) {
                console.error('Error fetching customers:', error)
            }
        },
        openAddModal() {
            this.showAddModal = true
        },
        closeAddModal() {
            this.showAddModal = false
        },
        openEditModal(customer) {
            this.currentCustomer = { ...customer }
            this.showEditModal = true
        },
        closeEditModal() {
            this.showEditModal = false
        },
        async addCustomer() {
            try {
                // Generate kode automatically
                this.newCustomer.kode = 'C' + (this.customers.length + 1).toString().padStart(3, '0')
                const response = await axios.post('/customers', this.newCustomer)
                this.customers.push(response.data)
                this.newCustomer = { kode: '', nama: '', telp: '' }
                this.closeAddModal()
                // SweetAlert for success
                Swal.fire({
                    icon: 'success',
                    title: 'Customer Added',
                    text: 'The customer has been added successfully!',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                // SweetAlert for error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error adding the customer. Please try again.',
                    confirmButtonText: 'OK'
                });
                console.error('Error adding customer:', error)
            }
        },
        async updateCustomer() {
            try {
                const response = await axios.put(`/customers/${this.currentCustomer.id}`, this.currentCustomer)
                const index = this.customers.findIndex(c => c.id === this.currentCustomer.id)
                if (index !== -1) {
                    this.customers[index] = response.data
                }
                this.closeEditModal()
                Swal.fire(
                    'Update!',
                    'The customer has been deleted.',
                    'success'
                );
            } catch (error) {
                // Error alert
                Swal.fire(
                    'Error!',
                    'There was an error deleting the customer. Please try again.',
                    'error'
                );
                console.error('Error updating customer:', error)
            }
        },
        async deleteCustomer(customerId) {
            try {
                await axios.delete(`/customers/${customerId}`)
                this.customers = this.customers.filter(c => c.id !== customerId)
                Swal.fire(
                    'Deleted!',
                    'The customer has been deleted.',
                    'success'
                );
            } catch (error) {
                // Error alert
                Swal.fire(
                    'Error!',
                    'There was an error deleting the barang. Please try again.',
                    'error'
                );
                console.error('Error deleting customer:', error)
            }
        }
    },
    mounted() {
        this.fetchCustomers()
    }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
