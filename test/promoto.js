var Promoto = artifacts.require("./Promoto.sol")

contract("Promoto", async (accounts) => {
    let promotoInstance

    beforeEach('setup contract for each test', async () =>  {
        promotoInstance = await Promoto.deployed()
    });
    
    it("should register a user and increase user count to one", async () => {
        const user = await promotoInstance.registerUser("foo")
        const usersCount = await promotoInstance.getNumberOfUsers()
        assert.equal(usersCount, 1 , 'expected length does not match')
    });

    it("should not accept a blank name for a user", async () => {

    });

    it("should not allow a user that doesn't exist to be an artist ", async () => {

    });

    it("should allow an existing user to be an artist", async () => {

    });

    it("should not allow an existing artist to be an artist", async () => {

    });

    it("should not allow a non-user to be an artist", async () => {

    });

    it("should not accept a blank type for an artist", async () => {

    });

    it("should not accept an artist without a type", async () => {

    });
})