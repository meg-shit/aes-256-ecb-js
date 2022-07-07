import crypto from 'crypto'

export default '@meg-shit/aes-256-ecb-js'

export interface Options {
  inputEncoding: BufferEncoding
  outputEncoding: BufferEncoding
}

const ModeMap = {
  16: 'aes-128-ecb',
  24: 'aes-192-ecb',
  32: 'aes-256-ecb',
}

function validateKey(key: string) {
  if (!(key.length in ModeMap))
    throw new Error(`Invalid key length: ${key.length}`)
  else
    return ModeMap[key.length as keyof typeof ModeMap]
}

export function createDecipher(key: string) {
  const mode = validateKey(key)
  return crypto.createDecipheriv(mode, key, null)
}

export function createCipher(key: string) {
  const mode = validateKey(key)
  return crypto.createCipheriv(mode, key, null)
}

export function encrypt(data: string, key: string, options: Options = { inputEncoding: 'utf8', outputEncoding: 'base64' }) {
  const cipher = createCipher(key)
  const segment = cipher.update(Buffer.from(data, options.inputEncoding))
  const finals = cipher.final()
  return Buffer.concat([segment, finals]).toString(options.outputEncoding)
}

export function decrypt(data: string, key: string, options: Options = { inputEncoding: 'base64', outputEncoding: 'utf8' }) {
  const { inputEncoding, outputEncoding } = options
  const decipher = createDecipher(key)
  const segment = decipher.update(Buffer.from(data, inputEncoding))
  const finals = decipher.final()

  return Buffer.concat([segment, finals]).toString(outputEncoding)
}
