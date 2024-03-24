# itc-currency-sdk

Web3 library for ITC smart contracts.

## Installing
```shell
npm i itc-currency-sdk --save
```

## Getting Started
### 1) Using Metamask provider
```shell
import detectEthereumProvider from '@metamask/detect-provider'
import { ItcCurrency } from 'itc-currency-sdk'

const provider = await detectEthereumProvider()
const itcCurrency = new ItcCurrency({
  provider,
  contractAddress: '0x3cC3C5F98AC3FF544279919DfceBfb7aFe03A2cA'
})
const [ address ] = await window.ethereum.request({ method: 'eth_requestAccounts' })
itcCurrency.setAccountAddress(address)

const price = await itcCurrency.getPriceByName('all')
```

### 2) Using private key (for backend apps)
```shell
const itcCurrency = new ItcCurrency({
  contractAddress: '0x3cC3C5F98AC3FF544279919DfceBfb7aFe03A2cA',
  privateKey: '12345'
})
const price = await itcCurrency.getPriceByName('all')
```

### 3) No providers, read only
```shell
const itcCurrency = new ItcCurrency({ contractAddress: '0x3cC3C5F98AC3FF544279919DfceBfb7aFe03A2cA' })
const price = await itcCurrency.getPriceByName('all')
```

## Configuration
#### Example
```shell
import { ItcCurrency, VanityUrl, ShortReelsVideos, DC, DCEns } from 'itc-currency-sdk'

const provider = await detectEthereumProvider()
const itcCurrency = new ItcCurrency({ provider, contractAddress: '0x3cC3C5F98AC3FF544279919DfceBfb7aFe03A2cA' })
const vanityUrl = new VanityUrl({ provider, contractAddress: '0x88a1afC4134f385337Dd5F530D452079fC9E14CC' })
const shortVideos = new ShortReelsVideos({ provider, contractAddress: '0x3a6843f2AbC3CA960845108908Eae8D9d9CE058D' })
const dc = new DC({ provider, contractAddress: '0x3C84F4690De96a0428Bc6777f5aA5f5a92150Ef2' })
const dcEns = new DCEns({ provider, contractAddress: '0xeFC73fB07660464aA03A5790D011DA0512c5854f' })
```

#### Options
| Param           | Default value             | Description                                      |
|-----------------|---------------------------|--------------------------------------------------|
| contractAddress | `undefined`               | Contract address                                 |
| provider?       | `undefined`               | Web3 provider, optional                          |
| rpcUrl?         | `https://api.intelchain.org` | RPC url, optional                                |
| privateKey?     | `undefined`               | Private key, optional. Use only on backend side. |

## API
### ItcCurrency
```javascript
const price = itcCurrency.getPriceByName('artem')
```
```javascript
const record = itcCurrency.getRecordByName('artem')
```
```javascript
const price = getPriceByName('artem')
const tx = await itcCurrency.rent('artem', 'https://twitter.com/', price)
```
```javascript
const tx = await itcCurrency.updateURL('artem', 'https://twitter.com')
```
```javascript
const tx = await itcCurrency.setNameForRenter('artem')
```
```javascript
const name = await itcCurrency.getNameForRenter('0x726A7a5403c9C1F49f72789794358A2FfdacCA85')
```

### Vanity URL
```javascript
const price = await vanityUrl.getUrlUpdatePrice()
```
```javascript
const tx = await vanityUrl.setNewURL('artem', 'someAlias', 'https://twitter.com', '1000000000000000000')
```
```javascript
const price = await vanityUrl.getVanityUrlPrice('artem', 'someAlias')
```

### Short Reels Videos
```javascript
const tx = await shortReelsVideos.payForVanityURLAccessFor('0x95D02e967Dd2D2B1839347e0B84E59136b11A073', 'artem', 'someAlias', '1000000000000000000', 12345)
```
```javascript
const tx = await shortReelsVideos.sendDonationFor('0x95D02e967Dd2D2B1839347e0B84E59136b11A073', 'artem', 'someAlias', '1000000000000000000')
```

### DC
```javascript
const isAvailable = await dc.isAvailable('artem')
```
```javascript
const record = await dc.getRecord('artem')
```
```javascript
const price = await dc.getPrice('artem')
```
```javascript
const params = await dc.getParameters()
```
```javascript
const num = await dc.getNumUrls('artem')
```

### Testing
1) Create new `.env` file in root directory, add private key
```
PRIVATE_KEY=12345
```
2) Run test script `npm run test`

### Intelchain mainnet contracts
```
  itcCurrency: '0x3cC3C5F98AC3FF544279919DfceBfb7aFe03A2cA',
  vanityUrlContractAddress: '0x88a1afC4134f385337Dd5F530D452079fC9E14CC',
  shortReelsVideosContractAddress: '0x3a6843f2AbC3CA960845108908Eae8D9d9CE058D',
  DC: '0x3C84F4690De96a0428Bc6777f5aA5f5a92150Ef2',
```
