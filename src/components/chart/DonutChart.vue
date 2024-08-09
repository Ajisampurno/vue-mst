<template>
    <div>
        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
import axios from '@/plugins/axios';
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            series: [],  // Data untuk diagram donut
            chartOptions: {
                chart: {
                    type: 'donut'
                },
                labels: []  // Label untuk masing-masing data
            }
        };
    },
    mounted() {
        this.fetchSalesPercentage();
    },
    methods: {
        async fetchSalesPercentage() {
            try {
                const response = await axios.get('/sales-by-product');
                const data = response.data;

                this.series = data.map(item => item.percentage);

                // Memperbarui seluruh objek chartOptions
                this.chartOptions = {
                    ...this.chartOptions, // Tetap mempertahankan properti lain dalam chartOptions
                    labels: data.map(item => item.nama)
                };

            } catch (error) {
                console.error('Error fetching sales percentage:', error);
            }
        }
    }
};
</script>
