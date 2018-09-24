var Promoto = artifacts.require("./PromotoFactory.sol")
const assert = require(`assert`);
const ganache = require(`ganache-cli`);
const Web3 = require(`web3`);
const web3 = new Web3(ganache.provider());
const json = require(`./../build/contracts/PromotoFactory.json`);

let promotoInstance
let accounts
const interface = json[`abi`];
const bytecode = json[`bytecode`];

contract("Promoto", async (accounts) => {

    beforeEach('setup contract for each test', async () =>  {
        promotoInstance = await Promoto.deployed()
        accounts = await web3.eth.getAccounts()
    });
    
    it("should allow the user to be an artist", async () => {
        user = accounts[1]
        await promotoInstance.medthods.registerArtist("testName", "testType","testDesc").send({ from: user })
        artist = await promotoInstance.methods.user().call(); 
        assert.equal(artist, user, "The user is the one who called the register as an artist.")
    });

    // it("should not allow an existing artist to be an artist", async () => {

    // });

    // it("should allow users to subscribe to the artist", async () => {

    // });
})