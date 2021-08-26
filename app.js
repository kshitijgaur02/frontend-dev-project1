const chain_id = "80001"; // for Polygon testnet
const address = "0xF0Fc5aE54d1CBDc87545AA7831a8225CB6dE35a0"; // address of the user
const API_KEY = ""; // your covalent API key

let tokenList;

const fetchData = () => {
  fetch(
    `https://api.covalenthq.com/v1/${chain_id}/address/${address}/balances_v2/?key=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);

      //   Crypto in the wallet
      tokenList = data.data.items;

      createImg = (src) => {
        let img = document.createElement("img");
        img.src = src;
        img.className = "token-logo";
        return img;
      };

      truncate = (str) => {
        if (str.length > 8) {
          return str.slice(0, 4) + "..." + str.slice(-2);
        }
        return str;
      };

      //    getting images from the cryptoicons.io and create & return an img tag. It will return an img with default image if the crypto is not found.
      getImage = async (symbol) => {
        let src;
        await fetch(
          `./node_modules/cryptocurrency-icons/svg/color/${symbol}.svg`
        )
          .then((response) => {
            if (response.status === 404) {
              src = "./node_modules/cryptocurrency-icons/svg/color/generic.svg";
            } else
              src = `./node_modules/cryptocurrency-icons/svg/color/${symbol}.svg`;
          })
          .catch((err) => {
            console.log("err", err);
          });

        const tokenImg = await createImg(src);
        return tokenImg;
      };

      //   not really a fan of the code below. I would like to take some other approach
      tokenList.forEach(async (token) => {
        const tokenList = document.createElement("div");
        tokenList.classList.add("tokens");

        let tokenImg = await getImage(token.contract_ticker_symbol);

        // creating token name element
        const tokenName = document.createElement("h4");
        tokenName.classList.add("token-call");
        tokenName.innerHTML = token.contract_name;

        // create tokenOuter element and put the token img and token name inside tokenOuter
        let tokenOuter = document.createElement("div");
        tokenOuter.classList.add("token-name");
        tokenOuter.appendChild(tokenImg);
        tokenOuter.appendChild(tokenName);

        // put the tokenOuter inside tokenList
        tokenList.appendChild(tokenOuter);

        // create token balance element
        const tokenBalance = document.createElement("div");
        tokenBalance.classList.add("token-balance");
        tokenBalance.innerHTML = `<div>${truncate(token.balance)} ${
          token.contract_ticker_symbol
        }</div> <div>$ ${token.quote}</div>`;

        tokenList.appendChild(tokenBalance);

        // put the tokenList inside the main container
        document.getElementById("token-container").appendChild(tokenList);
      });
    });
};

fetchData();
