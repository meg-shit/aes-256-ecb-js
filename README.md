# aes-256-ecb-js

> `encrypt` and `dencrypt` by aes-256-ecb for Javascript

## install
```bash
npm install aes-256-ecb-js
```

## usage
```ts
import { decrypt, encrypt } from 'aes-256-ecb-js'

const KEY = '16 or 24 or 32 length key' // auto detect ecb algorithm;
const SOURCE = 'source string'
const TARGET = 'target string'

const s1 = encrypt(SOURCE, KEY)
const s2 = decrypt(TARGET, KEY)

assert(s1 === TARGET)
assert(s2 === SOURCE)
```
