<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import * as d3 from 'd3'

const data = ref([
  { letter: 'A', frequency: 0.08167 },
  { letter: 'B', frequency: 0.01492 },
  { letter: 'C', frequency: 0.02782 },
  { letter: 'D', frequency: 0.04253 },
  { letter: 'E', frequency: 0.12702 },
  { letter: 'F', frequency: 0.02288 },
  { letter: 'G', frequency: 0.02015 },
  { letter: 'H', frequency: 0.06094 },
  { letter: 'I', frequency: 0.06966 },
  { letter: 'J', frequency: 0.00153 },
  { letter: 'K', frequency: 0.00772 },
  { letter: 'L', frequency: 0.04025 },
  { letter: 'M', frequency: 0.02406 },
  { letter: 'N', frequency: 0.06749 },
  { letter: 'O', frequency: 0.07507 },
  { letter: 'P', frequency: 0.01929 },
  { letter: 'Q', frequency: 0.00095 },
  { letter: 'R', frequency: 0.05987 },
  { letter: 'S', frequency: 0.06327 },
  { letter: 'T', frequency: 0.09056 },
  { letter: 'U', frequency: 0.02758 },
  { letter: 'V', frequency: 0.00978 },
  { letter: 'W', frequency: 0.0236 },
  { letter: 'X', frequency: 0.0015 },
  { letter: 'Y', frequency: 0.01974 },
  { letter: 'Z', frequency: 0.00074 }
])

var svg = null

const createChart = () => {
  const width = 928
  const height = 500
  const marginTop = 30
  const marginRight = 0
  const marginBottom = 30
  const marginLeft = 40

  const x = d3
    .scaleBand()
    .domain(
      d3.groupSort(
        data.value,
        ([d]) => -d.frequency,
        (d) => d.letter
      )
    )
    .range([marginLeft, width - marginRight])
    .padding(0.1)

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data.value, (d) => d.frequency)])
    .range([height - marginBottom, marginTop])

  svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  svg
    .append('g')
    .attr('fill', 'steelblue')
    .selectAll()
    .data(data.value)
    .join('rect')
    .attr('x', (d) => x(d.letter))
    .attr('y', (d) => y(d.frequency))
    .attr('height', (d) => y(0) - y(d.frequency))
    .attr('width', x.bandwidth())

  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0))

  svg
    .append('g')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .append('text')
        .attr('x', -marginLeft)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('↑ Frequency (%)')
    )

  console.log('start;=========================')
  return svg.node()
}

// 在组件挂载后创建图表
onMounted(() => {
  nextTick(() => createChart())
})

// 当数据变化时重新创建图表
watch(
  data,
  () => {
    console.log('change')
    d3.select('#chart').html('') // 清空图表
    createChart() // 重新绘制图表
  },
  { deep: true }
)
</script>

<template>
  <div id="chart" class="area-chart"></div>
  <div>
    <el-form :model="form" :inline="true" label-width="auto" style="max-width: 1000px">
      <el-form-item v-for="(item, index) in data" :key="index" :label="item.letter">
        <el-input-number
          v-model="item.frequency"
          :precision="4"
          :step="0.0001"
          :max="0.12"
          style="width: 240px"
          placeholder="Please input"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.area-chart {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
