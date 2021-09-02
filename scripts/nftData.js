const showNFT = (NFTs) => {
  // console.log("NFTs", NFTs);
  NFTs.forEach((data, i) => {
    if (data.nft_data) {
      data.nft_data.forEach((nft, j) => {
        // console.log("nft", nft.external_data);

        let myComponent = document.createElement("my-component");
        let el = nft.external_data;
        let desc =
          el.description !== null
            ? el.description.length > 100
              ? `${el.description.substring(0, 100)}...`
              : el.description
            : "no description";

        myComponent.setAttribute("name", el.name);
        myComponent.setAttribute("desc", desc);
        myComponent.setAttribute("img", el.image_256);
        document.querySelector("#nft-container").appendChild(myComponent);
      });
    }
  });
};

const fetchNFTData = async () => {
  let nftHeaders = new Headers();
  nftHeaders.append("Authorization", `Basic ${API_KEY}`);
  let requestOptions = {
    method: "GET",
    headers: nftHeaders,
    redirect: "follow",
  };

  fetch(
    `${url}/${chain_id}/address/${address}/balances_v2/?nft=true&match={\"type\":\"nft\"}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      showNFT(result.data.items);
    })
    .catch((error) => console.log("error", error));
};

fetchNFTData();
