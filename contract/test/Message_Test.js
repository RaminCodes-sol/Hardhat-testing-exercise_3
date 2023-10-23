const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, assert } = require("chai");



describe("Message", () => {

    const deployMessageFixture = async () => {
        const _initialMessage = "i will move to America next year";

        const _messageContract = await hre.ethers.deployContract("Message", [_initialMessage]);
        await _messageContract.waitForDeployment();

        const [_deployer, _otherAccount] = await hre.ethers.getSigners()

        return { _messageContract, _deployer, _otherAccount, _initialMessage }
    }

    
    let messageContract, deployer, otherAccount, initialMessage

    beforeEach(async () => {
        const { _messageContract, _deployer, _otherAccount, _initialMessage } = await loadFixture(deployMessageFixture)

        messageContract = _messageContract
        deployer = _deployer
        otherAccount = _otherAccount
        initialMessage = _initialMessage
    })

    
    /*-------Development-------*/
    describe("Development", () => {
        it("Should set the right owner", async () => {
            const owner = await messageContract.owner()
            assert(owner === deployer.address, "Owner was not set properly")
        })

        it("Should return the message", async () => {
            const message = await messageContract.message()
            assert(message === initialMessage, "Messages are not the same")
        })
    })

    /*-------Setting Message-------*/
    describe("Setting Message", () => {
        const newMessage = "Hello America"

        it("Should fails if the caller is not the owner", async () => {
            await expect(messageContract.connect(otherAccount).setMessage(newMessage)).to.be.revertedWith("Only the owner can call this function")
        })
        
        it("Should fail if message is empty", async () => {
            await expect(messageContract.connect(deployer).setMessage("")).to.be.revertedWith("Empty message not allowed")
        })

        it("Should set new message", async () => {
            await messageContract.connect(deployer).setMessage(newMessage)
            
            const message = await messageContract.message()
            assert(message === newMessage, "Messages are not the same")
        })

        it("Should emit NewMessageSet event", async () => {
            await expect(messageContract.connect(deployer).setMessage(newMessage)).to.emit(messageContract, "NewMessageSet").withArgs(newMessage)
        })
    })

    /*-------Getting Message-------*/
    describe("Getting Message", () => {
        it("Should return message", async () => {
            await messageContract.connect(deployer).setMessage("Hello NewYork")
            const message = await messageContract.getMessage()
            assert(message === "Hello NewYork", "Messages are not the same")
        })
    })
})