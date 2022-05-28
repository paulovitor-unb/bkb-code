const listaProdutos = document.querySelector(".listaProdutos");
const listaCarrinho = document.querySelector(".listaCarrinho");
const precoTotal = document.querySelector(".precoTotal");
const produtosCarrinho = [];
let idProdutoCarrinho = 0;
let precoCarrinho = 0;

produtos.forEach(function (produto) {
    const card = document.createElement("li");
    card.classList.add("cardProduto");

    card.innerHTML = `
        <img src="${produto.image}" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>
        <button id="${produto.id}" type="button">Adicionar</button>
    `;

    listaProdutos.appendChild(card);
});

listaProdutos.addEventListener("click", function (event) {
    if (event.target.tagName == "BUTTON") {
        adicionaProdutoNoCarrinho(event.target.id);
    }
});

function adicionaProdutoNoCarrinho(produtoId) {
    novoProduto = produtos.find(produto => produto.id == produtoId);

    if (!novoProduto) {
        return;
    }

    produtosCarrinho.push({ id: idProdutoCarrinho, produto: novoProduto });
    console.log(produtosCarrinho);

    const card = document.createElement("li");
    card.classList.add("produtoCarrinho");

    card.innerHTML = `
        <div class="produtoNome">
            <img src=${novoProduto.image} alt=${novoProduto.nome} />
            <p>${novoProduto.nome}</p>
        </div>
        <div class="produtoPreco">
            <p>R$ ${novoProduto.preco.toFixed(2).replace(".", ",")}</p>
            <button id="${idProdutoCarrinho}">
                <img src="./src/assets/lixo.png" alt="Lixeira para remover produto" />
            </button>
        </div>
    `;

    idProdutoCarrinho++;

    card.querySelector("button").addEventListener("click", function (event) {
        const produtoRemovido = produtosCarrinho.find(
            produto => produto.id == event.currentTarget.id
        );
        produtosCarrinho.splice(produtosCarrinho.indexOf(produtoRemovido), 1);
        precoCarrinho -= produtoRemovido.produto.preco;
        precoTotal.innerHTML = `
            Total: R$ ${precoCarrinho.toFixed(2).replace(".", ",")}
        `;
        event.currentTarget.closest("li").remove();
    });

    listaCarrinho.appendChild(card);

    precoCarrinho += novoProduto.preco;
    precoTotal.innerHTML = `
        Total: R$ ${precoCarrinho.toFixed(2).replace(".", ",")}
    `;
}
