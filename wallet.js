const mediaQuery = window.matchMedia('(max-width: 640px)')

let nftCLick = document.getElementById("nft-details");
let balanceClick = document.getElementById("balance-details");


if (mediaQuery.matches) {
    balanceClick.style.display = "block";
    nftCLick.style.display = "none"
    
    function nft() {
        nftCLick.style.display = "block";
        balanceClick.style.display = "none";
    } 
    
    function balance() {
        balanceClick.style.display  = "block";
        nftCLick.style.display = "none";
    }
}   





