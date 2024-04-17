import axios from 'axios';
import {fetchAuthSession} from 'aws-amplify/auth';

export const getAssets = async () => {
  try {
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.accessToken
    return axios.get(
      'http://localhost:8000/assets/',
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