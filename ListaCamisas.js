async function GetCamisas(limit, page){
    let url = `http://localhost:3000/products?_limit=${limit}&_page=${page}`;

    try{
        let resposta = await fetch(url);
        let produtos = await resposta.json();
        let quantidade = resposta.headers.get("x-total-count");

        console.log(produtos);
        console.log(quantidade);
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
        console.log("deletado")

    }catch{
        console.log(err => console.log(err))
    }
}


// DeletarCamisa(1);
GetCamisas(100, 1);
//FAZER PAGINAÇÃO COLOCANDO AS INFORMAÇÕES

document.querySelectorAll('.deletar').forEach(botao => {
    botao.addEventListener('click', function() {
        const id = this.getAttribute('id');
        DeletarCamisa(id);
    });
});

//na hora de colcoar as informações nos cards colocar um id em cada botão



