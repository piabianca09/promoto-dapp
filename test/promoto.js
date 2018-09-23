var Promoto = artifacts.require("./Promoto.sol")

contract("Promoto", async (accounts) => {
    let promotoInstance

    beforeEach('setup contract for each test', async () =>  {
        promotoInstance = await Promoto.deployed()
    });
    
    it("should allow the user to be an artist", async () => {
        
    });

    it("should not allow an existing artist to be an artist", async () => {

    });

    it("should allow users to subscribe to the artist", async () => {

    });
})