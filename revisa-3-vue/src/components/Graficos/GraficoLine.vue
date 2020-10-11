<script>
import { Line } from 'vue-chartjs';
import { Busao } from '../../main';

export default {
  extends: Line,
  name: 'line-chart',
  data () {
    return {
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              maxBarThickness: 70,
              categoryPercentage: 0.2,
            },
          ],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 1000,
            },
          }],
        },
        maintainAspectRatio: false,
      },
    };
  },
  props: {
    chartdata: {
      datasets: [],
      labels: [],
    },
  },
  methods: {
    reiniciar2 () {
      this.renderChart(this.chartdata, this.options);
    },
  },

  mounted () {
    this.reiniciar2();
    Busao.$on('reiniciar', () => {
      this.reiniciar2();
    });
  },
};
</script>

<style scoped>

</style>
