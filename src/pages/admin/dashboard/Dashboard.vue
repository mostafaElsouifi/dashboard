<script lang="ts" setup>
//mport RevenueUpdates from './cards/RevenueReport.vue'
// import RevenueByLocationMap from './cards/RevenueByLocationMap.vue'
// import DataSection from './DataSection.vue'
// import YearlyBreakup from './cards/YearlyBreakup.vue'
// import MonthlyEarnings from './cards/MonthlyEarnings.vue'
// import RegionRevenue from './cards/RegionRevenue.vue'
// import Timeline from './cards/Timeline.vue'
import TableData from './cards/TableData.vue'
import ProductionSpeedTable from './cards/ProductionSpeedTable.vue'
import ProductionOutputLineChart from './cards/ProductionOutputLineChart.vue'
</script>

<template>
  <h1 class="page-title" style="font-size: 2rem; line-height: 0.5 !important">Dashboard</h1>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <TableData class="w-full sm:w-[100%] mb-20 mt-4" />
    </div>

    <div
      class="flex flex-wrap align-center justify-center md:flex-nowrap md:flex-row w-[100%] gap-4 sm:justify-between"
    >
      <ProductionSpeedTable id="chart1" class="w-[50%] w-full md:w-3/6" />

      <ProductionOutputLineChart id="chart2" class="w-[50%] w-full md:w-3/6" />
    </div>
  </section>
</template>
