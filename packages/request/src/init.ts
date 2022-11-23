import { AsyncStorage } from '@gm-rn/utils'
import _ from 'lodash'
import { instance } from './request'
import { authInfoKey, accessTokenKey } from './util'

let accessToken: string | null
let authInfo: { url: string; field: string } | undefined

export function initAuth(url: string, field: string) {
  authInfo = { url, field }
  AsyncStorage.save(authInfoKey, authInfo)

  instance.interceptors.request.use(async (config) => {
    if (!accessToken) {
      accessToken = await AsyncStorage.loadString(accessTokenKey)
    }

    if (accessToken) {
      config.headers.authorization = accessToken
    }
    return config
  })

  instance.interceptors.response.use((response) => {
    const json = response.data
    const { url } = response.config
    if (authInfo?.url === url && authInfo?.field) {
      const token = _.get(json, authInfo.field)
      if (token && typeof token === 'string') {
        AsyncStorage.saveString(accessTokenKey, token)
      }
    }

    return response
  })
}

export function clearAuth() {
  AsyncStorage.remove(accessTokenKey)
  accessToken = null
}
