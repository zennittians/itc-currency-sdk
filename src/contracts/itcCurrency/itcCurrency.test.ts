import * as dotenv from 'dotenv'
import {describe, expect, test} from '@jest/globals';
import {getRandomNumber} from '../../base';
import { ItcCurrency } from './index'

dotenv.config()

const privateKey = process.env.PRIVATE_KEY || ''

let itcCurrency: ItcCurrency;
const domainName = 'sdk_test' + getRandomNumber()
const aliasName = 'sdk_test_alias'
const linkUrl = 'https://twitter.com/'
const waitTimeout = 10000
const expectedRentPrice = '100000000000000000000'

beforeAll(() => {
  itcCurrency = new ItcCurrency({ contractAddress: '0x3cC3C5F98AC3FF544279919DfceBfb7aFe03A2cA', privateKey })
  console.log('Test account address: ', itcCurrency.accountAddress)
})

describe('Itc Currency', () => {
  test('Check rental price', async () => {
    const price = await itcCurrency.getPriceByName(domainName)
    expect(price).toBe(expectedRentPrice)
  });

  test('Get record by name', async () => {
    const record = await itcCurrency.getRecordByName('artem')
    expect(record.renter).toContain('0x')
  });

  test('Rent domain', async () => {
    const tx = await itcCurrency.rent(domainName, linkUrl, expectedRentPrice, 'test_telegram', 'testemail@test.com', '123123123')
    expect(typeof tx.transactionHash).toBe('string');

    // await new Promise(resolve => setTimeout(resolve, 5000))
    //
    // const transferTx = await itcCurrency.safeTransferFrom(itcCurrency.accountAddress, '0x199177Bcc7cdB22eC10E3A2DA888c7811275fc38', domainName)
    // expect(typeof transferTx.transactionHash).toBe('string');
  }, waitTimeout);
});
