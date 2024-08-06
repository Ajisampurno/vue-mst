<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                    <i class="bi bi-list"></i>
                </a>
            </li>

            <li class="nav-item d-none d-sm-inline-block">
                <router-link to="dashboard" class="nav-link">Dashboard</router-link>
            </li>
            <li class="nav-item d-none d-sm-inline-block">
                <router-link to="/daftar-transaksi" class="nav-link">Transaksi</router-link>
            </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">

            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="bi bi-arrows-fullscreen"></i>
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link" href="#" @click.prevent="handleLogout">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        handleLogout() {
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('token')
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scoped>
/* Gaya default untuk ikon SVG */
.nav-link .icon {
    fill: #000;
    /* Warna default */
    transition: fill 0.3s ease;
    /* Transisi warna */
}

/* Efek hover */
.nav-link:hover .icon {
    fill: #007bff;
    /* Warna saat hover */
}
</style>
