import {HttpProvider} from "web3-core";
import Web3 from "web3";

export interface ItcCurrencyConfig {
  contractAddress: string;
  provider?: HttpProvider;
  rpcUrl?: string;
  privateKey?: string
}

export class ItcCurrencyBase {
  protected web3: Web3
  public accountAddress: string

  constructor(config: ItcCurrencyConfig) {
    const { privateKey } = config

    this.accountAddress = ''

    const rpcUrl = config.rpcUrl || 'https://api.intelchain.org'
    const provider = config.provider || new Web3.providers.HttpProvider(rpcUrl)
    this.web3 = new Web3(provider)
    if(privateKey) {
      const account = this.web3.eth.accounts.privateKeyToAccount(privateKey);
      this.web3.eth.accounts.wallet.add(account);
      this.setAccountAddress(account.address)
    }
  }

  public setAccountAddress (address: string) {
    this.accountAddress = address
  }
}

export const NullAddress = '0x0000000000000000000000000000000000000000'

export const getRandomNumber = (min = 0, max = 10000) => Math.round(Math.random() * (max - min) + min);
