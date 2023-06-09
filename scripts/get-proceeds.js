const { ethers, network } = require("hardhat");

async function getProceeds() {
    const accounts = await ethers.getSigners();
    const [deployer, owner] = accounts;

    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    const nftMarketplaceContract = await ethers.getContract("Marketplace");
    const basicNftContract = await ethers.getContract("BasicNft");

    const proceeds = await nftMarketplaceContract.viewProceeds(owner.address);
    
    const proceedsWei = ethers.utils.formatEther(proceeds.toString());
    console.log(`Seller ${owner.address} has ${proceedsWei} eth to pull!`);
    
    const withdraw = await nftMarketplaceContract.connect(owner).withdrawProceeds();


    provider.getBalance(owner.address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);
        console.log(`Seller ${owner.address} has pulled ${proceedsWei}!`);
        console.log(`Seller's balance : ${balanceInEth}`);
    });

    console.log("SUCCESS!!")
}

async function main() {
    console.log("\x1b[31m", "\nVIEW PROCEEDS TEST");
    console.log("\x1b[37m");

    const wait1 = await getProceeds();
}


main();