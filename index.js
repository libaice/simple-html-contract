// In front end project cannot use require

import {ethers} from "./ethers-5.6.esm.min.js";
import {abi, contractAddress} from "./constant.js";


const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fund")

connectButton.onclick = connect
fundButton.onclick = fund

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


async function fund() {
    const ethAmount = "50"
    console.log(`Funding with ${ethAmount} ...  `)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, abi, signer);
        const txResponse = await contract.fund({
            value: ethers.utils.parseEther(ethAmount)
        })
    }


}

// fund function


//withdraw function