import ethers from 'ethers'
import IPFS from 'ipfs-api'

const providers = ethers.providers
const network = providers.networks.ropsten
const provider = new providers.InfuraProvider(network)

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export {provider, ethers, ipfs}

