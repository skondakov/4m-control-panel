import axios from 'axios';
import {fetchAuthSession} from 'aws-amplify/auth';

export const getExchanges = async () => {
  try {
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.accessToken
    return axios.get(
      'http://localhost:8000/exchanges/',
      {
        headers: {
          Authorization: `Bearer ${jwtToken}` // include JWT token in Authorization header
        }
      });
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

export const getExchangesAssetBalance = async (asset: string) => {
  try {
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.accessToken
    return axios.get(
      `http://localhost:8000/exchanges/asset/${asset}/balance`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}` // include JWT token in Authorization header
        }
      });
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

export const getExchangeAssetBalance = async (exchange: string, asset: string) => {
  try {
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.accessToken
    return axios.get(
      `http://localhost:8000/exchange/${exchange}/asset/${asset}/balance`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}` // include JWT token in Authorization header
        }
      });
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};