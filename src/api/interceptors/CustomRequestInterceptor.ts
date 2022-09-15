import { useUserStoreContext } from '@/store/modules/user'
import { AxiosRequestConfig } from 'axios'

export default function (config: AxiosRequestConfig) {
  const useStore = useUserStoreContext()
  if (config) {
    if (!config.headers) {
      config.headers = {}
    }
    if (!config.headers['authorization']) {
      config.headers['authorization'] = useStore.sToken
    }
  }
  return config
}
