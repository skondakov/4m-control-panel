import {AxiosResponse} from 'axios';
import {getRequest} from "./apiService";

export interface Order {
  id: number
  opportunity_uuid: string | null
  arbitrage_type: string
  restore_order: boolean
  exchange_id: number
  pair_id: number
  order_type: string
  time_in_force: string
  order_status: string
  order_ref: string | null
  order_side: string
  amount: number
  filled_amount: number | null
  price: number
  price_with_fee: number
  avg_exec_price: number | null
  avg_exec_price_with_fee: number | null
  fee: number | null
  fee_asset_id: number | null
  price_slippage: number | null
  price_slippage_percent: number | null
  price_latency_ms: number | null
  build_time_ms: number | null
  execution_time_ms: number | null
  placed_on: Date
  filled_on: Date | null
  order_payload: Record<string, unknown> | null
  error: string | null
  environment: string
  dry_run: boolean;
  created_on: Date;
  updated_on: Date | null;
}

export interface OrderResponse {
  orders: Order[];
  total: number;
}

export const getOrders = async (page: number, per_page: number): Promise<AxiosResponse<OrderResponse>> => {
  return getRequest('orders', {page: page, per_page: per_page});
};