import {AxiosResponse} from 'axios';
import {getRequest} from "./apiService";

interface Exchange {
  id: number
  name: string
  taker_fee: number
  maker_fee: number
  active: boolean
  trading: boolean
}

export interface ExchangeAssetBalance {
  exchange: string;
  asset: string;
  full_balance: number;
  available_balance: number;
  locked_balance: number;
  available_balance_in_memory: number | null;
}

export const getExchanges = async (): Promise<AxiosResponse<Exchange[]>> => {
  return getRequest('exchanges');
};

export const getExchangesAssetBalance = async (asset: string): Promise<AxiosResponse<ExchangeAssetBalance[]>> => {
  return getRequest(`exchanges/asset/${asset}/balance`);
};

export const getExchangeAssetBalance = async (exchange: string, asset: string): Promise<AxiosResponse<ExchangeAssetBalance>> => {
  return getRequest(`exchange/${exchange}/asset/${asset}/balance`);
};