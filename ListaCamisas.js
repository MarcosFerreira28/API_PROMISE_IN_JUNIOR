async function GetCamisas(limit, page){
    let url = `http://localhost:3000/products?_limit=${limit}&_page=${page}`;

    try{
        let resposta = await fetch(url);
        let produtos = await resposta.json();
        let quantidade = resposta.headers.get("x-total-count");
        
        AtualizarInfos(produtos);
        AtualizaPaginacao(quantidade, page);
    }catch{
        console.log(err => console.log(err))
    }
}


async function DeletarCamisa(id) {
    let url = `http://localhost:3000/products/${id}`;

    try{
        let deleta = await fetch( url, {
            method: "DELETE",
        })
        alert("Produto deletado com sucesso!")
    }catch{
        console.log(err => console.log(err))
    }
}

function AtualizarInfos(produtos){
    const section = document.querySelector("section");
    section.innerHTML = "";
    // camisas.forEach(linha => console.log(linha.innerHTML))

    for (let i = 0; i < produtos.length; i+=3){
        let camisaslinha = document.createElement("div");
        camisaslinha.className = "camisas";

        for (let j = i; j < i + 3 && j < produtos.length; j++){
            const produto = produtos[j];
            camisaslinha.innerHTML += `
                <div class="carta">
                    <div class="fundo">
                        <div class="nota">
                            <p id="nota">${produto.rating}</p>
                            <img src="./assets/Star 1.png" alt="estrela">
                        </div>
                        <div class="imagenscarta">
                            <button type="button" class="deletar" id="${produto.id}"><img src="./assets/deletar.png" alt="imagem do lixo"></button>
                            <button type="button" class="editar" id="${produto.id}"><img src="./assets/editar.png" alt="imagem do lápis"></button>
                        </div>
                    </div>
                    <div class="infocarta">
                        <div>
                            <h1 class="titulo" id="titulo">${produto.name}</h1>
                            <h2 class="tipo" id="categoria">${produto.category}</h2>
                        </div>
                        <p class="descricao" id="descricao">${produto.description}</p>
                        <p class="preco" id="preco">R$ ${produto.price}</p>
                    </div>
                </div>
            `
        }
        section.appendChild(camisaslinha);

        camisaslinha.querySelectorAll(".fundo").forEach((fundo,j) => {
            fundo.style.backgroundImage = `url(${produtos[i + j].image})` //isso coloca um fundo se tiver no json
        })

    }
    
    section.innerHTML += `<div class="botoespaginacao">
                <img src="./assets/setaEsquerda.png" alt="seta para direita" class="seta">
                <button class="numeropag">1</button>
                <img src="./assets/setaDireita.png" alt="seta para esquerda" class="seta">
            </div>`

    document.querySelectorAll('.deletar').forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('id');
            DeletarCamisa(id);
        });
    });

    document.querySelectorAll('.editar').forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute("id");
            window.location.href="EditarPeca.html?id=" + id;
        });
    });
}

function AtualizaPaginacao(total, pageAtual) {
    const botoes = document.querySelector('.botoespaginacao');
    let limit = 9;
    const totalPaginas = Math.ceil(total / limit);
    botoes.innerHTML = ""

    if(pageAtual > 1){
        botoes.innerHTML = '<button class="seta" id="setaesquerda"><img src="./assets/setaEsquerda.png" class="seta"></button>';
    }
    for (let i = 1; i <= totalPaginas; i++) {
        if (i == pageAtual){
            botoes.innerHTML += `<button class="numeropag_ativa" id="${i}">${i}</button>`;

        }else{
            botoes.innerHTML += `<button class="numeropag" id="${i}">${i}</button>`;
        }
    }
    if (pageAtual < totalPaginas){
        botoes.innerHTML += '<button class="seta" id="setadireita"><img src="./assets/setaDireita.png" class="seta"></button>';
    }

    if (pageAtual > 1){
        let setaesquerda = document.querySelector("#setaesquerda");
        setaesquerda.addEventListener("click", function() {
            GetCamisas(limit, pageAtual - 1);
        })
    }

    if (pageAtual < totalPaginas){
        let setaesquerda = document.querySelector("#setadireita");
        setaesquerda.addEventListener("click", function() {
            GetCamisas(limit, pageAtual + 1);
        })
    }

    document.querySelectorAll('.numeropag').forEach(botao => {
        botao.addEventListener('click', function() {
            let page = Number(this.getAttribute('id'));
            GetCamisas(limit, page);
        });
    });
}

GetCamisas(9, 1);