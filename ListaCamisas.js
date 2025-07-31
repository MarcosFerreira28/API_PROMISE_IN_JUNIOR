async function GetCamisas(limit, page){
    let url = `http://localhost:3000/products?_limit=${limit}&_page=${page}`;

    try{
        let resposta = await fetch(url);
        let produtos = await resposta.json();
        let quantidade = resposta.headers.get("x-total-count");


    }catch{
        console.log(err => console.log(err))
    }
}




GetCamisas(8, 1);




