<template>
  <div class="analytics-block">
    <h1>Аналитика</h1>

    <div class="chart-container">
      <LineChart />
    </div>

    <div class="link-back">
      <router-link to="/">Вернуться назад</router-link>
    </div>
  </div>
</template>

<script>
  import LineChart from '../components/LineChart.vue'

  export default {
    name: "Analytics",
    components: {
      LineChart
    },
  }
</script>

<style scoped>
  .analytics-block {
    padding: 40px 0;
  }

  h1 {
    text-align: center;
  }

  .chart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px 0;
  }

  .link-back {
    text-align: center;
  }
</style>