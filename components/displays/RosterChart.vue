<template>
	<div id="chart">
		<div class="center-content">
			<common-header title="How complete are the existing game rosters?" />
			<Bar :data="chartData" :options="chartOptions" class="h-30rem" />
		</div>
	</div>
</template>

<script setup>
	import { Bar } from 'vue-chartjs'
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
	} from 'chart.js'

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	)

	const chartData = ref()
	const chartOptions = ref()
	const rosters = ref([])

	const getRosters = async () => {
		//
		// Get chart data
		//
		const { data } = await useFetch('/game_player_stats/getrosterstats', {
			method: 'get',
		})
		return data.value
	}

	const setChartData = () => {
		const documentStyle = getComputedStyle(document.documentElement)

		const datasets = []
		const labels = rosters.value.map((item) => item.yr)

		const label1 = 'Complete Roster'
		const data1 = rosters.value.map((item) => item.ct_atleastfifteen)
		const backgroundColor1 = documentStyle.getPropertyValue('--blue-500')

		const label2 = 'Partial Roster'
		const data2 = rosters.value.map((item) => item.ct_partial)
		const backgroundColor2 = documentStyle.getPropertyValue('--green-500')

		const label3 = 'No Roster'
		const data3 = rosters.value.map((item) => item.ct_none)
		const backgroundColor3 = documentStyle.getPropertyValue('--yellow-500')

		datasets.push({
			label: label1,
			data: data1,
			backgroundColor: backgroundColor1,
		})
		datasets.push({
			label: label2,
			data: data2,
			backgroundColor: backgroundColor2,
		})
		datasets.push({
			label: label3,
			data: data3,
			backgroundColor: backgroundColor3,
		})

		return {
			labels,
			datasets,
		}
	}

	const setChartOptions = () => {
		const documentStyle = getComputedStyle(document.documentElement)
		const textColor = documentStyle.getPropertyValue('--text-color')

		return {
			maintainAspectRatio: false,
			aspectRatio: 0.8,
			plugins: {
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				legend: {
					labels: {
						color: textColor,
					},
				},
			},

			scales: {
				x: {
					stacked: true,
					ticks: {
						color: '#00f',
					},
					grid: {
						color: '#fff',
					},
				},
				y: {
					stacked: true,
					ticks: {
						color: '#0ff',
					},
					grid: {
						color: '#000',
					},
				},
			},
		}
	}

	rosters.value = await getRosters()
	chartData.value = setChartData()
	chartOptions.value = setChartOptions()
</script>
