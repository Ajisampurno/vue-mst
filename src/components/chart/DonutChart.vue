<template>
    <div>
        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            series: [44, 55, 41, 17, 15],  // Data untuk diagram donut
            chartOptions: {
                chart: {
                    type: 'donut'
                },
                labels: ['Apples', 'Oranges', 'Berries', 'Grapes', 'Bananas']  // Label untuk masing-masing data
            }
        };
    }
};
</script>

<style scoped>
.apexcharts-canvas {
    max-width: 100%;
    margin: 0 auto;
}
</style>
