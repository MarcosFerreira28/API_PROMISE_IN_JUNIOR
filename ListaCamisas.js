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
    }catch{
        console.log(err => console.log(err))
    }
}

function AtualizarInfos(produtos){
    const camisas = document.querySelectorAll(".camisas");
    // camisas.forEach(linha => console.log(linha.innerHTML))

    camisas.forEach(linha => {
        linha.innerHTML = ""
        produtos.forEach(produto => {
            linha.innerHTML += `
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
        })
    })

    camisas.forEach(linha => console.log(linha.innerHTML))


    document.querySelectorAll('.deletar').forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('id');
            DeletarCamisa(id);
        });
    });
}

function AtualizaPaginacao(total, pageAtual) {
    const botoes = document.querySelector('.botoespaginacao');
    let limit = 8;
    const totalPaginas = Math.ceil(total / limit);
    botoes.innerHTML = '<img src="./assets/setaEsquerda.png" class="seta">';

    for (let i = 1; i <= totalPaginas; i++) {
        botoes.innerHTML += `<button class="numeropag" id="${i}">${i}</button>`;
    }

    botoes.innerHTML += '<img src="./assets/setaDireita.png" class="seta">';

    document.querySelectorAll('.numeropag').forEach(botao => {
        botao.addEventListener('click', function() {
            let page = Number(this.getAttribute('id'));
            GetCamisas(limit, page);
        });
    });
}


// DeletarCamisa(1);
GetCamisas(8, 1);

document.querySelectorAll('.deletar').forEach(botao => {
    botao.addEventListener('click', function() {
        const id = this.getAttribute('id');
        DeletarCamisa(id);
    });
});

//na hora de colcoar as informações nos cards colocar um id em cada botão



