import crypto from 'crypto'

export default '@meg-shit/aes-256-ecb-js'

export interface Options {
  inputEncoding: BufferEncoding
  outputEncoding: BufferEncoding
  autoPadding: boolean
  padding: string
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

export function encrypt(data: string, key: string, options?: Partial<Options>) {
  const _options: Options = {
    inputEncoding: 'utf8',
    outputEncoding: 'base64',
    autoPadding: true,
    padding: '00',
    ...options,
  }

  let dataBuffer = Buffer.from(data, _options.inputEncoding)
  if (!_options.autoPadding) {
    const len = 16 - (data.length % 16)
    const paddingBuf = Buffer.from(new Array(len).fill(_options.padding))

    dataBuffer = Buffer.concat(
      [
        Buffer.from(data, _options.inputEncoding),
        paddingBuf,
      ],
    )
  }

  const cipher = createCipher(key)
  cipher.setAutoPadding(_options.autoPadding)
  const segment = cipher.update(dataBuffer)
  const finals = cipher.final()

  return Buffer.concat([segment, finals]).toString(_options.outputEncoding)
}

export function decrypt(data: string, key: string, options?: Partial<Options>) {
  const _options: Options = {
    inputEncoding: 'base64',
    outputEncoding: 'utf8',
    autoPadding: true,
    padding: '00',
    ...options,
  }
  const decipher = createDecipher(key)
  decipher.setAutoPadding(_options.autoPadding)
  const segment = decipher.update(Buffer.from(data, _options.inputEncoding))
  const finals = decipher.final()

  return Buffer.concat([segment, finals]).toString(_options.outputEncoding)
}
