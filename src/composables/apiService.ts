import axios from '@/plugins/axios'
import type { AxiosRequestConfig } from 'axios'

export const useApiService = () => {
  const loading = ref<boolean>(false)

  const query = <T>(url: string, query: Record<string, unknown>): Promise<T> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      axios.get(url, { params: { ...query }})
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error))  
        .finally(() => loading.value = false)
    })
  }
    
  const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      axios.get(url, config)
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error))
        .finally(() => loading.value = false)
    })
  }
    
  const post = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      axios.post(url, data, config)
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error))
        .finally(() => loading.value = false)
    })
  }
    
  const put = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      axios.put(url, data, config)
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error))
        .finally(() => loading.value = false)
    })
  }
    
  const patch = <T>(url: string, data: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      axios.patch(url, data, config)
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error))
        .finally(() => loading.value = false)
    })
  }
    
  const del = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return new Promise((resolve, reject) => {
      loading.value = true
      axios.delete(url, config)
        .then(({ data }) => resolve(data))
        .catch((error) => reject(error))
        .finally(() => loading.value = false)
    })
  }

  return {
    loading,
    query,
    get,
    post,
    put,
    patch,
    del
  }
}