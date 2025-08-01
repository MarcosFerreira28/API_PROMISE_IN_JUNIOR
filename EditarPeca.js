async function ColocaDados(id){
    let url = `http://localhost:3000/products/${id}`;
    let resposta = await fetch(url);
    let produto = await resposta.json();

    let nome = document.querySelector("#nome");
    let imagem = document.querySelector("#imagem");
    let descricao = document.querySelector("#descricao");
    let preco = document.querySelector("#preco");
    let categoria = document.querySelector("#categoria");
    let avaliacao = document.querySelector("#avaliacao");

    nome.placeholder = produto.name;
    imagem.placeholder = produto.image;
    descricao.placeholder = produto.description;
    preco.placeholder = produto.price;
    categoria.placeholder = produto.category;
    avaliacao.placeholder = produto.rating;

    console.log(produto);
}

async function EditaDados(id) {

    let nome = document.querySelector("#nome");
    let imagem = document.querySelector("#imagem");
    let descricao = document.querySelector("#descricao");

    let preco = document.querySelector("#preco");
    preco.value = preco.value.replace(",", ".");

    let categoria = document.querySelector("#categoria");

    let avaliacao = document.querySelector("#avaliacao");
    avaliacao.value = avaliacao.value.replace(",", ".");

    let obj = {};

    if (nome.value.trim() == "" && imagem.value.trim() == "" && descricao.value.trim() == "" && preco.value.trim() == "" && categoria.value.trim() == "" && avaliacao.value.trim() == ""){
        alert("Pelo menos um campo deve ser preenchido!")
        return
    }

    if (nome.value.trim() != ""){
        obj.name = nome.value;
    }
    if (imagem.value.trim() != ""){
        obj.image = imagem.value;
    }
    if (descricao.value.trim() != ""){
        obj.description = descricao.value;
    }
    if (preco.value.trim() != ""){
        if (isNaN(Number(preco.value)) || preco.value < 0){
            alert("O preço deve ser um número positivo!");
            return;
        }
        obj.price = Number(preco.value);
    }
    if (categoria.value.trim() != ""){
        obj.category = categoria.value;
    }
    if (avaliacao.value.trim() != ""){
        if(isNaN(Number(avaliacao.value)) || avaliacao.value < 0 || avaliacao.value > 5){
            alert("O número de avaliação deve ser positivo entre 0 e 5");
            return;
        }
        obj.rating = Number(avaliacao.value)
    }

    let url = `http://localhost:3000/products/${id}`;
    let resposta = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        }
    )
    let json = await resposta.json();
    console.log(resposta);
    console.log(json);

}

// const params = new URLSearchParams(window.location.search);
// const idcamisa = parseInt(params.get("id"));

ColocaDados(4);

let botao = document.querySelector("#botao");
botao.addEventListener("click", function(event) {

    // event.preventDefault();
    EditaDados(4)
})

