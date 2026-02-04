<template>
  <div class="chart-container">
    <h2>Album Prices Chart</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import type { Album } from '../types/album'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Props {
  albums: Album[]
}

const props = defineProps<Props>()

const chartData = computed(() => ({
  labels: props.albums.map(album => album.title.length > 20 ? album.title.substring(0, 20) + '...' : album.title),
  datasets: [
    {
      label: 'Price ($)',
      data: props.albums.map(album => album.price),
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }
  ]
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Album Prices'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
</script>

<style scoped>
.chart-container {
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.chart-container h2 {
  text-align: center;
  color: white;
  margin-bottom: 1rem;
}
</style>