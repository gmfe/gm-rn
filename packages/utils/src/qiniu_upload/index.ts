import { UUID } from '../uuid'
import * as AsyncStorage from '../async_storage'
import axios, { AxiosResponse } from 'axios'

const TOKEN_KEY_BASE = 'x_qiniu_token_'
const TOKEN_KEY_CACHE_TIME_BASE = 'x_qiniu_token_cache_time_'

export interface ImageFile {
  name: string
  uri: string
  type: string
}
export interface QiniuInfo {
  prefix: string
  token: string
  expire_time: string
}
export interface Options {
  domain?: string
  fileType: string // 缓存用
  getQiniuInfo: () => Promise<QiniuInfo>
}

interface UploadData {
  hash: string
  key: string
}

function getUploadFileName(blob: ImageFile) {
  const { type = '', name } = blob
  let suf = type.includes('image') ? type.split('/').pop() : ''
  if (!suf) {
    suf = name.split('.').pop()
  }

  if (!suf) {
    throw new Error('Can not find the suffix')
  }

  return `${UUID.generate()}.${suf}`
}

async function getCacheInfo(
  fetchInfo: () => Promise<QiniuInfo>,
  fileType: string,
) {
  const TOKEN_INFO_KEY = TOKEN_KEY_BASE + fileType
  const TOKEN_KEY_CACHE_TIME = TOKEN_KEY_CACHE_TIME_BASE + fileType
  let info = await AsyncStorage.load(TOKEN_INFO_KEY)
  const _cache = await AsyncStorage.loadString(TOKEN_KEY_CACHE_TIME)
  let _cacheTime = _cache && new Date(_cache)
  if (info && _cacheTime && +new Date() - +_cacheTime < 5 * 60 * 1000) {
    return info
  }
  info = await fetchInfo()
  _cacheTime = new Date()

  AsyncStorage.save(TOKEN_INFO_KEY, info)
  AsyncStorage.saveString(TOKEN_KEY_CACHE_TIME, `${_cacheTime}`)

  return info
}

async function uploadRequest(url: string, data: { [key: string]: any }) {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }

  const res = await axios({
    method: 'post',
    url,
    data: formData,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  }).then((response: AxiosResponse<UploadData>) => response.data)

  return res
}

export async function qiniuUpload(blob: ImageFile, opts: Options) {
  const options = {
    uploadUrl: 'https://upload-z2.qiniup.com/',
    domain: opts.domain || 'https://qncdn.guanmai.cn',
    getQiniuInfo: opts.getQiniuInfo,
    fileType: opts.fileType,
  }

  if (!options.getQiniuInfo) {
    throw new Error('need getQiniuInfo')
  }

  const { prefix, token } = await getCacheInfo(
    options.getQiniuInfo,
    options.fileType,
  )

  const name = getUploadFileName(blob)
  const path = prefix ? `${prefix}${name}` : name

  const json = await uploadRequest(options.uploadUrl, {
    file: blob,
    token,
    key: path,
  })

  const url = `${options.domain}/${json.key}`

  return { url, key: json.key }
}
