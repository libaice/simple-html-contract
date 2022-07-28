console.log("hello baice ~"); 
async function connect(){
    if(typeof window.ethereum !== "undefined" ){
    console.log(" I see a metamask !");

    window.ethereum.request({method:"eth_requestAccounts"})
    
    document.getElementById("connectButton").innerHTML = "Connected !"

}else{
    console.log(" i cannot find metamask in your browser");
} 
}



// fund function


//withdraw function