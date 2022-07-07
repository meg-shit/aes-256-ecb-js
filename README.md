# aes-256-ecb-js

> `encrypt` and `dencrypt` by aes-256-ecb for Javascript

## install
```bash
npm install @meg-shit/aes-256-ecb-js
```

## usage
```ts
import { decrypt, encrypt } from '@meg-shit/aes-256-ecb-js'

const KEY = '1fEWUoGzMXITwpRe1fEWUoGzMXITwpRe'
const SOURCE = 'meg-shit'
const TARGET = 'KL4zliqPIQRZJngPAchBJA=='

const s1 = encrypt(SOURCE, KEY)
const s2 = decrypt(TARGET, KEY)

assert(s1 === TARGET)
assert(s2 === SOURCE)
```
