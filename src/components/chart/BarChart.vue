<template>
    <div>
        <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
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
            series: [{
                name: 'Percentage',
                data: [] // Data untuk persentase penjualan per tanggal
            }],
            chartOptions: {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: [] // Tanggal penjualan akan dimasukkan di sini
                },
                yaxis: {
                    title: {
                        text: 'Percentage (%)'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "%";
                        }
                    }
                }
            }
        };
    },
    mounted() {
        this.fetchSalesPercentageByDate();
    },
    methods: {
        async fetchSalesPercentageByDate() {
            try {
                const response = await axios.get('/sales-by-date');
                const data = response.data;

                // Menyusun data untuk chart
                this.series[0].data = data.map(item => item.percentage);

                this.chartOptions = {
                    ...this.chartOptions, // Tetap mempertahankan properti lain dalam chartOptions
                    xaxis: {
                        categories: data.map(item => item.tanggal)
                    }
                };

            } catch (error) {
                console.error('Error fetching sales percentage by date:', error);
            }
        }
    }
};
</script>
<style scoped>
.apexcharts-canvas {
    max-width: 100%;
    margin: 0 auto;
}
</style>
