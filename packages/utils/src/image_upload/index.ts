/*
 * @Description: rn上传图片
 */
import { ImageFile, Options, qiniuUpload } from '../qiniu_upload';

export async function uploadImage(blob: ImageFile, opts: Options) {
  if (!blob.type?.startsWith('image/')) {
    throw new Error('this file is not image!');
  }

  return qiniuUpload(blob, opts);
}
