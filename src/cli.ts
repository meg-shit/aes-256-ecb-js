import yargs from 'yargs'
import Logger from './logger'
import type { Options } from './index'
import { decrypt, encrypt } from './index'

interface Argv extends Options{
  key: string
  data: string
  cmd: 'encrypt' | 'decrypt'
}

// eslint-disable-next-line no-unused-expressions
yargs
  .scriptName('aes-ecb')
  .usage('$0 <cmd> [args] <data>')
  .command<Argv>(
  '$0 <cmd> [args] <data>',
  'Encrypt or Decrypt by ECB',
  (yargs) => {
    yargs
      .positional('cmd', {
        describe: 'Encrypt or Decrypt',
        choices: [
          'encrypt',
          'decrypt',
        ],
        demandOption: true,
      })
      .positional('data', {
        describe: 'data to encrypt or decrypt',
        demandOption: true,
        type: 'string',
      })
      .option('key', {
        alias: 'k',
        describe: 'ECB Key (8 bytes or 16 bytes)',
        type: 'string',
      })
      .option('inputEncoding', {
        alias: 'i',
        describe: 'Input encoding',
      })
      .option('outputEncoding', {
        alias: 'o',
        describe: 'Output encoding',
      })
      .option('auto-padding', {
        alias: 'a',
        describe: 'Enable Auto padding (only works for encrypt)',
        default: true,
        type: 'boolean',
      })
      .option('padding', {
        alias: 'p',
        describe: 'Auto padding String (only works for encrypt)',
        default: '08',
        type: 'string',
      })
      .demandOption(['key'], 'ECB Key is required')
  },
  (argv) => {
    console.log(argv)
    const { cmd, key, data, inputEncoding, outputEncoding, autoPadding, padding } = argv

    const options: Partial<Options> = {
      autoPadding,
      padding,
    }
    if (inputEncoding) options.inputEncoding = inputEncoding
    if (outputEncoding) options.outputEncoding = outputEncoding

    try {
      if (cmd === 'encrypt') {
        const ans = encrypt(data, key, options)
        Logger.info(ans)
      }

      else if (cmd === 'decrypt') {
        const ans = decrypt(data, key, options)
        Logger.info(ans)
      }
    }
    catch (error) {
      Logger.error(error)
    }
  },
)
  .example('$0 encrypt -k <ECB KEY> meg-shit', 'Encrypt by ECB')
  .example('$0 decrypt -k <ECB KEY> KL4zliqPIQRZJngPAchBJA==', 'Decrypt by ECB')
  .showHelpOnFail(true)
  .alias('h', 'help')
  .alias('v', 'version')
  .help()
  .argv
