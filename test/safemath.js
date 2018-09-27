var SafeMath = artifacts.require("./SafeMathContract.sol")

contract("SafeMath", async () => { 
    let safemathInstance

    const a = 10
    const b = 4

    beforeEach('setup contract for each test', async () => {
        safemathInstance = await SafeMath.deployed()
    })

    it("should get the sum of two numbers", async () => {
        const ans = await safemathInstance.getSum(a, b)
        assert.equal(14, ans.toNumber(), "the answer is not correct")
    })

    it("should get the difference of two numbers", async () => {
        const ans = await safemathInstance.getDifference(a, b)
        assert.equal(6, ans.toNumber(), "the answer is not correct")
    })

    it("should get the product of two numbers", async () => {
        const ans = await safemathInstance.getProduct(a, b)
        assert.equal(40, ans.toNumber(), "the answer is not correct")
    })

    it("should get the quotient of two numbers", async () => {
        const ans = await safemathInstance.getQuotient(a, b)
        assert.equal(2, ans.toNumber(), "the answer is not correct")
    })

    it("should get the modulo of two numbers", async () => {
        const ans = await safemathInstance.getModulo(a, b)
        assert.equal(2, ans.toNumber(), "the answer is not correct")
    })
})
