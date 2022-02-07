import * as d3 from 'd3'
import { DateTime, Interval } from 'luxon'

export const formatPriceKRW = (price: number) => new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price)

export const formatPercent = (percent = 0) => {
 return `${parseFloat(`${percent}`) > 0 ? '+' : ''}${d3.format('.2%')(percent / 100)}`
}

export const getPeriod = (date: Date) => {
 if (!date) return 6

 const now = DateTime.utc()
 const before = DateTime.fromJSDate(date)
 const i = Interval.fromDateTimes(before, now)

 return i.length('months')
}

export const getXTicks = (months: number) => {
 if (months <= 2) return d3.timeDay.every(5)?.filter((d) => d.getDate() !== 31)
 if (months <= 6) return d3.timeMonth.every(1)
 if (months <= 13) return d3.timeMonth.every(2)

 return d3.timeYear.every(1)
}

export const getXTickFormat = (months: number) => {
 if (months <= 2) return d3.timeFormat('%d %b')
 if (months <= 6) return d3.timeFormat('%b')
 if (months <= 13) return d3.timeFormat('%b %Y')

 return d3.timeFormat('%Y')
}
