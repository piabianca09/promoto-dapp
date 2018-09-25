import { ethers, provider } from './../helpers/ethers-config'
import Wallet from './Wallet'
export default class EtheriumClient {
    constructor() {
        this.wallet = null
    }

    async encryptWallet(wallet, password) {
        return await wallet.encrypt(password)
    }

    async decryptWallet(jsonWallet, password) {
        return await new ethers.Wallet.fromEncryptedWallet(jsonWallet, password)
    }

    async generateWallet() {
        this.wallet = new Wallet()
    }
}