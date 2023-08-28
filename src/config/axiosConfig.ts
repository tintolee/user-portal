import { getEnvData } from '@src/utils/env';
import axios from 'axios';
export type { AxiosRequestConfig as RequestConfig } from 'axios';

const ENV_DATA = getEnvData();

const baseURL = ENV_DATA.API_BASE_URL;

export const AxiosConfig = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  timeout: 60000,
  showToastOnError: true
});
