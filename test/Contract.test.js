const { assert } = require("ethers");

var Contract =artifacts.require("./Contract.sol");

Contract("Contract",(accounts) => {
    let contract;
    before(async() => {
        contract = await Contract.deployed();
    });

    describe("deployment",async() => {
        it("deploys",async() => {
            const address = contract.address;
            assert.notEqual(address,null);
        })
    })
})