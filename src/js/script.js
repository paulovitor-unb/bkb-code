const listaProdutos = document.querySelector(".listaProdutos");

const listaCarrinho = document.querySelector(".listaCarrinho");

const precoTotal = document.querySelector(".precoTotal");
let precoCarrinho = 0;

let produtosCarrinho = {};
let idProdutoCarrinho = 0;

const botaoCancelar = document.querySelector(".botoesFinalizarPedido button");

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
    const novoProduto = produtos.find(produto => produto.id == produtoId);
    if (!novoProduto) {
        return;
    }

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
    card.querySelector("button").addEventListener("click", function (event) {
        const produtoRemovido = Object.values(produtosCarrinho).find(
            produto => produto == produtosCarrinho[event.currentTarget.id]
        );

        event.currentTarget.closest("li").remove();

        precoCarrinho -= produtoRemovido.preco;
        precoTotal.innerHTML = `
            Total: R$ ${Math.abs(precoCarrinho).toFixed(2).replace(".", ",")}
        `;

        delete produtosCarrinho[event.currentTarget.id];
    });
    listaCarrinho.appendChild(card);

    precoCarrinho += novoProduto.preco;
    precoTotal.innerHTML = `
        Total: R$ ${precoCarrinho.toFixed(2).replace(".", ",")}
    `;

    produtosCarrinho[idProdutoCarrinho] = novoProduto;
    idProdutoCarrinho++;
}

botaoCancelar.addEventListener("click", function () {
    listaCarrinho.innerHTML = "";
    precoTotal.innerHTML = "Total: R$ 0,00";
    precoCarrinho = 0;
    produtosCarrinho = {};
});
