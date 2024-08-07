<template>
    <div class="wrapper">
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-6">
                            <div class="card">
                                <div class="card-body">
                                    <DonutChart />
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
import DonutChart from '@/components/chart/DonutChart.vue'

export default {
    components: {
        DonutChart,
    }
};
</script>

<style scoped>
/* Tambahkan gaya khusus untuk DashboardView jika diperlukan */
</style>
