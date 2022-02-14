export type loading = 'idle' | 'pending'

type Market = 'KRW-BTC'

export interface UpbitProps {
 market: Market
 candle_date_time_utc: Date
 candle_date_time_kst: Date
 opening_price: number
 high_price: number
 low_price: number
 trade_price: number
 timestamp: number
 candle_acc_trade_price: number
 candle_acc_trade_volume: number
 unit: number
}

export interface UseResizeProps {
 width: number
 height: number
 top: number
 left: number
}

export type DefaultShape = {
 top: number
 bottom: number
 left: number
 right: number
}

export interface UseDimensionsParamsProps {
 maxHeight: number
 margin?: DefaultShape
 scaleCoef: number
}

export interface UseDimensionsProps {
 svgWidth: number
 svgHeight: number
 width: number
 height: number
}
