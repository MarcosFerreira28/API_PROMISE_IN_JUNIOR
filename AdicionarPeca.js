async function InsereCamisa() {

    let nome = document.querySelector("#nome");
    let imagem = document.querySelector("#imagem");
    let descricao = document.querySelector("#descricao");

    let preco = document.querySelector("#preco");
    preco.value = preco.value.replace(",", ".");

    let categoria = document.querySelector("#categoria");

    let avaliacao = document.querySelector("#avaliacao");
    avaliacao.value = avaliacao.value.replace(",", ".");

    let obj = {};

    if (nome.value.trim() == "" || imagem.value.trim() == "" || descricao.value.trim() == "" || preco.value.trim() == "" || categoria.value.trim() == "" || avaliacao.value.trim() == ""){
        alert("Todos os campos devem ser preenchidos!")
        return
    }

    try {
        new URL(imagem.value);
    } catch (e) {
        alert("O link da imagem não é uma URL válida.");
        return;
    }
    
    if (isNaN(Number(preco.value)) || preco.value < 0){
        alert("O preço deve ser um número positivo!");
        return;
    }
    if(isNaN(Number(avaliacao.value)) || avaliacao.value < 0 || avaliacao.value > 5){
        alert("O número de avaliação deve ser positivo entre 0 e 5");
        return;
    }

    obj.name = nome.value;
    obj.image = imagem.value;
    obj.description = descricao.value;
    obj.price = Number(preco.value).toFixed(2);
    obj.category = categoria.value;
    obj.inStock = false;
    obj.rating = Number(avaliacao.value).toFixed(1);

    let url = `http://localhost:3000/products`;

    try {
        let resposta = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }
        )
        let json = await resposta.json();
        console.log(resposta);
        console.log(json);
    }catch{
        console.log(err => console.log(err))
    }

    window.location.href="ListaCamisas.html";
    alert("Produto adicionado com sucesso!");
}


let botao = document.querySelector("#botao");
botao.addEventListener("click", InsereCamisa)