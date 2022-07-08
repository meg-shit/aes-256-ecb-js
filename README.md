# aes-256-ecb-js

> `encrypt` and `dencrypt` by aes-256-ecb for Javascript

## install
```bash
npm install @meg-shit/aes-256-ecb-js -g
```

## usage
```bash
aes-ecb -h

# aes-ecb <cmd> [args] <data>

# 位置：
#   cmd   Encrypt or Decrypt                        [可选值: "encrypt", "decrypt"]
#   data  data to encrypt or decrypt                                      [字符串]

# 选项：
#   -k, --key             ECB Key (8 bytes or 16 bytes)            [字符串] [必需]
#   -i, --inputEncoding   Input encoding
#   -o, --outputEncoding  Output encoding
#   -a, --auto-padding    Enable Auto padding (only works for encrypt)
#                                                            [布尔] [默认值: true]
#   -p, --padding         Auto padding Char (only works for encrypt)
#                                                          [字符串] [默认值: "08"]
#   -h, --help            显示帮助信息                                      [布尔]
#   -v, --version         显示版本号                                        [布尔]

# 示例：
#   aes-ecb encrypt -k <ECB KEY> meg-shit                          Encrypt by ECB
#   aes-ecb decrypt -k <ECB KEY> KL4zliqPIQRZJngPAchBJA==          Decrypt by ECB   

```

## programatic api
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
