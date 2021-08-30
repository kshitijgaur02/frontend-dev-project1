//  nft web component
const template = document.createElement("template");

template.innerHTML = `
   <style>
        .nftCard{
            background-color: white; 
            border-radius: 10px;
            padding: 20px;
            margin: 10px;
        }

        .img{
            width: 100%; 
            height: 230px;
            border-radius: 10px;
            border: 1px solid gray;
            object-fit: cover;
        }

        .name{
            font-size: 20px;
            font-weight: bold;
            margin-top: 20px;
        }

        .description{
            font-size: 15px;
            margin-top: 10px;
        }
    </style>
    <div class="col-sm-6">
      <div class="nftCard">
          <img class="img" />
          <p class="name"></p>
          <p class="desc"></p>
      </div>
    </div>
`;

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.getAttribute("img")) {
      this.shadowRoot
        .querySelector(".img")
        .setAttribute("src", this.getAttribute("img"));
    }

    if (this.getAttribute("name")) {
      this.shadowRoot.querySelector(".name").innerHTML =
        this.getAttribute("name");
    }

    if (this.getAttribute("desc")) {
      this.shadowRoot.querySelector(".desc").innerHTML =
        this.getAttribute("desc");
    }
  }
}

customElements.define("my-component", MyComponent);
