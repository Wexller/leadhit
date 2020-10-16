<script>
  import {Line} from "vue-chartjs";
  import chartData from '../chartData';

  export default {
    extends: Line,
    data: () => ({
      chartData: chartData,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,

        title: {
          display: true,
          text: "Аналитика по визитам"
        },

      },
      labels: [],
      visits: []
    }),
    created() {
      // Подготовка данных для графика
      for (const obj of chartData) {
        const transformedDate = this.transformDate(obj['date']);
        this.labels.push(transformedDate);

        this.visits.push(obj['visits']);
      }
    },
    methods: {
      transformDate(date) {
        if (typeof date === 'string') {
          date = Date.parse(date);
        }

        const newDateFormat = new Date(date)
        const options = {
          day: "numeric",
          month: "long",
        }

        return newDateFormat.toLocaleDateString('ru', options);
      }
    },
    mounted() {
      const chartData = {
        labels: this.labels,
        datasets: [{
          label: 'Количесвто визитов',
          data: this.visits,
          backgroundColor: "#e6c8fa",
          borderColor: "#9500fc",
          pointBackgroundColor: "#9500fc",
          lineTension: 0,
          pointRadius: 5,
          hoverRadius: 8
        }],
      };

      this.renderChart(chartData, this.chartOptions);
    }
  };
</script>