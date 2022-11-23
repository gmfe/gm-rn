import { instance } from './request'
import { UUID } from '@gm-rn/utils'

function configHeaders(clientName = 'driver', version = '1.0.0'): void {
  // 指纹暂时使用 UUID，RN 可以使用设备识别号代替
  const clientId = UUID.generate()

  instance.defaults.headers.common[
    'X-Client'
  ] = `${clientName}/${version} ${clientId}`

  instance.interceptors.request.use((config) => {
    config.headers['X-Request-Id'] = UUID.generate()
    return config
  })
}

export default configHeaders
