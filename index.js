// In front end project cannot use require

import {ethers} from "./ethers-5.6.esm.min.js";
import {abi, contractAddress} from "./constant.js";


const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fund")
const contractButton = document.getElementById("getContractETHBalance")
const withdrawButton = document.getElementById("withdraw")

connectButton.onclick = connect
fundButton.onclick = fund
contractButton.onclick = getBalance
withdrawButton.onclick = withdraw


async function connect() {
    console.log("HELLO , conncet wallet")
    if (typeof window.ethereum !== "undefined") {
        console.log(" I see a metamask !");
        await window.ethereum.request({method: "eth_requestAccounts"})
        // document.getElementById("connectButton").innerHTML = "Connected !"
        connectButton.innerHTML = "Connected  !"
    } else {
        console.log(" i cannot find metamask in your browser");
    }
}


async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(` contract balance is ${ethers.utils.formatEther(balance)} `)
    }
}

// fund function
async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount} ...  `)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const txResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount)
            })
            await listenForTransactionMine(txResponse, provider)
            console.log("Done ! ! ")
        } catch (error) {
            console.log(error)
        }
    }
}

function listenForTransactionMine(txResponse, provider) {
    console.log(`Mining ${txResponse.hash} ...`)
    // return new Promise()
    // listen to tx to be mined

    return new Promise((reslove, reject) => {
        provider.once(txResponse.hash, (transactionReceipt) => {
            console.log(`Completed with ${transactionReceipt.confirmations}  confirmations`)
        })
        reslove()
    })
}


async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const txResponse = await contract.withdraw()
            await listenForTransactionMine(txResponse, provider)
            console.log("Withdraw All eth Done ! ! ")
        } catch (error) {
            console.log(error)
        }
    }
}


//withdraw function