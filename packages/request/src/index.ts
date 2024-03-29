import { instance, Request } from './request'

import configHeaders from './config_headers'
import configTrace from './config_trace'
import configError from './config_error'
import {
  configPrivateDomain,
  clearPrivateDomain,
} from './config_private_domain'
import { initAuth, clearAuth } from './init'
export {
  instance,
  Request,
  configHeaders,
  configTrace,
  configError,
  initAuth,
  clearAuth,
  configPrivateDomain,
  clearPrivateDomain,
}

export type { Response } from './types'
