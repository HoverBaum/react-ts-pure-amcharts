import React, { useEffect, useRef } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'

am4core.useTheme(am4themes_animated)

const Chart = () => {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Code for chart inspired by: https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/
    const chart = am4core.create(chartRef.current, am4charts.XYChart)

    const data = []
    let visits = 10
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10)
      data.push({
        date: new Date(2019, 0, i),
        name: 'name' + i,
        value: Math.abs(visits)
      })
    }

    chart.data = data

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())

    valueAxis.renderer.minWidth = 50

    let series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'value'

    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()

    return () => {
      if (!chart) return
      chart.dispose()
    }
  }, [chartRef])

  return <div ref={chartRef}>Chart</div>
}

export default Chart
