var Promoto = artifacts.require("./PromotoFactory.sol")

contract("Promoto", async (accounts) => {
    let promotoInstance

    describe("PromotoFactory initial tests", () => {
        beforeEach('setup contract for each test', async () => {
            promotoInstance = await Promoto.deployed()
        })

        it("The contract should start with zero artists", async () => {
            let numberOfArtists = await promotoInstance.getNumberOfArtists() || 0
            assert.equal(numberOfArtists, 0, 'expected length not match')
        })

        it("Should not be able to subscribe if there are no artists available", async () => {
            let error = null;
            try {
                let artists = await promotoInstance.subscribeToArtist(account[0], {from: accounts[1]})
            } catch (err) {
                error = err;
            }
            assert.notEqual(error, null, "We are able to subscribe")
        })

    })

    describe("Main functionalities", () => {
        beforeEach('setup contract for each test', async () => {
            promotoInstance = await Promoto.deployed()
        })

        it("Should be able to register as an artist and increase the artist count", async () => {
            await promotoInstance.registerArtist('test', 'description', 'samplehash',{from : accounts[0]})
            let numberOfArtists = await promotoInstance.getNumberOfArtists()
            assert.equal(numberOfArtists, 1, 'The artists count should now be equal to one')
        })
        
        it("Initial balance of the artist should be equal to zero", async () => {
            let artistBalance = await promotoInstance.checkBalance({from: accounts[0]})
            assert.equal(artistBalance, 0, 'The artists initial balance should be equal to zero')
        })

        it("Initial number of subscribers should be equal to zero", async () => {
            let artistSubscribers = await promotoInstance.getSubscribersCount({from: accounts[0]})
            assert.equal(artistSubscribers, 0, 'The artists number of initial subscribers should be equal to zero')
        })

        it("Should be able to subscribe to any registered artists", async () => {
            await promotoInstance.subscribeToArtist(accounts[0], {from: accounts[1]})
            let numberOfSubscribers = await promotoInstance.getSubscribersCount({from: accounts[0]})
            assert.equal(numberOfSubscribers, 1, 'The artists subscribers should be equal to one')
        })

        it("Should be able to see the number of subscribers", async () => {
            let numberOfSubscribers = await promotoInstance.getSubscribersCount({from: accounts[0]})
            assert.equal(numberOfSubscribers, 1, "You should be an artist")
        })

        it("Should not be able to get subscribers count if you are not an artist", async () => {
            let error = null;
            try {
                let artists = await promotoInstance.getSubscribersCount({from: accounts[1]})
            } catch (err) {
                error = err;
            }
            assert.notEqual(error, null, "We are able to get the subscribers count")
        })

        it("should not be able to subscribe if you have an on going subscription to the same artist", async () => {

        })

        it("Should not be able to subscribe to users that are not registered as an artist", async () => {
            let error = null
            try {
                let artists = await promotoInstance.subscribeToArtist(accounts[1], {from: accounts[2]})
            } catch (err) {
                error = err
            }
            assert.notEqual(null, error, 'The artists should not be a registered artist')
        })

        it("Subscription should end", async () => {

        })

        it("artists should be able to check balance", async () => {
            
        })

        it("artists should be able to cash out their balance", async () => {

        })
    })
})