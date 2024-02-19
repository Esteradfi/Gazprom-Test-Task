import axios, { AxiosInstance } from 'axios';

export const API_URL: string = 'https://65d2cf4b987977636bfca91e.mockapi.io/api';

const $api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export default $api;