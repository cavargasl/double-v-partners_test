/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Http } from "@domain/repositories/http"
import axios from "axios"

const API_BASE_URL = "https://api.github.com"

axios.defaults.baseURL = API_BASE_URL
axios.defaults.headers.common["Accept"] = "application/json"
axios.defaults.headers.post["Content-Type"] = "application/json"

export const httpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(path, {
      ...config,
      params: params,
    })
    return response.data as T
  },
  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.post(path, { ...params }, { ...config })
    return response.data as T
  },
  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.put(path, { ...params }, { ...config })
    return response.data as T
  },
  delete: async <T>(path: string, params?: any, config?: any) => {
    const response = await axios.delete(path, {
      ...config,
      params: params,
    })
    return response.data as T
  },
}
