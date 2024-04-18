import axios, {AxiosResponse} from 'axios';
import {fetchAuthSession} from 'aws-amplify/auth';

export const getRequest = async (url: string, params = {}): Promise<AxiosResponse<any>> => {
  try {
    const session = await fetchAuthSession();
    const jwtToken = session.tokens?.accessToken;
    return axios.get(
      'http://localhost:8000/' + url,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}` // include JWT token in Authorization header
        },
        params: params
      }
    );
  } catch (error) {
    console.error('There was an error with GET ' + url + '!', error);
    throw error;
  }
};