<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="#" class="brand-link">
            <img src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png" alt="AdminLTE Logo"
                class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">AdminLTE 3</span>
        </a>
        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link">
                            <i class="bi bi-speedometer2"></i>
                            <p>
                                Dashboard
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/transaksi" class="nav-link">
                            <i class="bi bi-cash-coin"></i>
                            <p>
                                Form Transaksi
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/daftar-transaksi" class="nav-link">
                            <i class="bi bi-card-list"></i>
                            <p>
                                Daftar Transaksi
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/daftar-customer" class="nav-link">
                            <i class="bi bi-people-fill"></i>
                            <p>
                                Daftar Customer
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/daftar-barang" class="nav-link">
                            <i class="bi bi-box-seam-fill"></i>
                            <p>
                                Daftar Barang
                            </p>
                        </router-link>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped>
/* Tambahkan gaya kustom Anda di sini */
</style>
