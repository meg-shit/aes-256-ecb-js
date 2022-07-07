import { describe, expect, it } from 'vitest'
import { createCipher, createDecipher, decrypt, encrypt } from '@'

const KEY = '1fEWUoGzMXITwpRe1fEWUoGzMXITwpRe'
const SOURCE = 'meg-shit'
const TARGET = 'KL4zliqPIQRZJngPAchBJA=='

describe('cipher', () => {
  it('create cipher', () => {
    const cipher = createCipher(KEY)
    expect(cipher).not.toBeNull()
  })
  it('encrypt', () => {
    const ans = encrypt(SOURCE, KEY)
    expect(ans).toBe(TARGET)
  })
})

describe('decipher', () => {
  it('create decipher', () => {
    const decipher = createDecipher(KEY)
    expect(decipher).not.toBeNull()
  })
  it('decrypt', () => {
    const ans = decrypt(TARGET, KEY)
    expect(ans).toBe(SOURCE)
  })
})
