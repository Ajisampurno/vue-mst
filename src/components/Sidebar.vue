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
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="https://adminlte.io/themes/v3/dist/img/user2-160x160.jpg" class="img-circle elevation-2"
                        alt="User Image">
                </div>
                <div class="info">
                    <a href="#" class="d-block">Alexander Pierce</a>
                </div>
            </div>
            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/transaksi" class="nav-link">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                Form Transaksi
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/daftar-transaksi" class="nav-link">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                Daftar Transaksi
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/daftar-customer" class="nav-link">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                Daftar Customer
                            </p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/daftar-barang" class="nav-link">
                            <i class="nav-icon fas fa-th"></i>
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
