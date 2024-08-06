<template>
    <div class="wrapper">
        <Navbar />
        <Sidebar />
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <!-- Your content here -->
                    <slot></slot>
                </div>
            </section>
        </div>
        <!-- /.content-wrapper -->
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar
    }
}
</script>

<style scoped>
/* Tambahkan gaya kustom Anda di sini */
</style>
