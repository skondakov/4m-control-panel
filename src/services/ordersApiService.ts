import axios from 'axios';
import {fetchAuthSession} from 'aws-amplify/auth';

export const getOrders = async (page: number, per_page: number) => {
  try {
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.accessToken
    return axios.get(
      'http://localhost:8000/orders/',
      {
        headers: {
          Authorization: `Bearer ${jwtToken}` // include JWT token in Authorization header
        },
        params: {
          page: page,
          per_page: per_page
        }
      });
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};