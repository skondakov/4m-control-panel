import {AxiosResponse} from 'axios';
import {getRequest} from "./apiService";

export interface Asset {
  id: number;
  code: string | null;
  active: boolean;
  trading: boolean;
}

export const getAssets = async (): Promise<AxiosResponse<Asset[]>> => {
  return getRequest('assets');
};