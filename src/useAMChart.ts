import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import { useEffect, useState, RefObject } from 'react'

const useAMChart = (
  ref: RefObject<HTMLElement>,
  amChartType: new () => am4charts.XYChart
) => {
  const [chart, setChart] = useState<am4charts.XYChart | undefined>(undefined)

  useEffect(() => {
    if (!ref.current) return
    const createdChart = am4core.create(ref.current, amChartType)
    setChart(createdChart)

    return () => createdChart.dispose()
  }, [ref, amChartType])

  return chart
}

export default useAMChart
