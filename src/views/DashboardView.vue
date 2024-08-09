<template>
    <div class="wrapper">
        <!-- Navbar -->
        <Navbar />

        <!-- Sidebar -->
        <Sidebar />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content py-3">
                <div class="container-fluid">
                    <div class="row">

                        <!-- Donut Chart Section -->
                        <div class="col-12 col-md-4 mb-3">
                            <div class="card">
                                <div class="card-header">Sales Barang</div>
                                <div class="card-body d-flex justify-content-center align-items-center">
                                    <DonutChart />
                                </div>
                            </div>

                            <!-- Total Penjualan Hari Ini -->
                            <div class="card">
                                <div class="card-header">Total Penjualan Hari Ini</div>
                                <div class="card-body text-center">
                                    {{ totalTransactionsToday }}
                                </div>
                            </div>
                        </div>

                        <!-- Bar Chart Section -->
                        <div class="col-12 col-md-8 mb-3">
                            <div class="card h-100">
                                <div class="card-header">Sales per Tanggal</div>
                                <div class="card-body">
                                    <BarChart />
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
import axios from '@/plugins/axios';
import DonutChart from '@/components/chart/DonutChart.vue';
import BarChart from '@/components/chart/BarChart.vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        BarChart,
        DonutChart,
        Navbar,
        Sidebar
    },
    data() {
        return {
            totalTransactionsToday: 0
        }
    },
    mounted() {
        this.fetchTotalTransactionsToday();
    },
    methods: {
        async fetchTotalTransactionsToday() {
            try {
                const response = await axios.get('/sales-today');
                this.totalTransactionsToday = response.data.total_transactions;
            } catch (error) {
                console.error('Error fetching total transactions today:', error);
            }
        }
    }
};
</script>

<style scoped>
.content-wrapper {
    overflow-x: hidden;
}

.card.h-100 {
    height: 100%;
}

@media (max-width: 767.98px) {
    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .sidebar {
        display: none;
    }

    .content-wrapper {
        margin-left: 0;
    }
}
</style>
