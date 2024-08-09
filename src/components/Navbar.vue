<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button">
                    <i class="bi bi-list"></i>
                </a>
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
.nav-link .icon {
    fill: #000;
    transition: fill 0.3s ease;
}

.nav-link:hover .icon {
    fill: #007bff;
}
</style>
