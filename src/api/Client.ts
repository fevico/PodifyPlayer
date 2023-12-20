import { getFromAsyncStorage, keys } from '@utils/asyncStorage';
import anxios, { CreateAxiosDefaults } from 'axios';

const client = anxios.create({
    baseURL: 'http://192.168.43.108:8989',
})

const baseURL = 'http://192.168.43.108:8989';

type headers = CreateAxiosDefaults<any>['headers'];

export const getClient = async (headers?: headers) => {
  const token = await getFromAsyncStorage(keys.AUTH_TOKEN);

  if (!token) return anxios.create({baseURL});

  const defaultHeaders = {
    Authorization: 'Bearer ' + token,
    ...headers,
  };

  return anxios.create({baseURL, headers: defaultHeaders});
};



export default client;