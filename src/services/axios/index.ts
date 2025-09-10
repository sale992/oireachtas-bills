import axios from 'axios'

const VITE_OIREACHTAS_BASE_URL = import.meta.env.VITE_OIREACHTAS_BASE_URL

const createAxiosInstance = (baseURL: string) => {
  return axios.create({ baseURL })
}

export const apiOireachtas = createAxiosInstance(VITE_OIREACHTAS_BASE_URL)
