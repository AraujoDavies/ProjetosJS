let qtPizza = 1;
let carrinhoCompras = [];
let iModal;
const q = function (elemento){ return document.querySelector(elemento)};
const qA = (elemento) => document.querySelectorAll(elemento)

//Listagem das pizzas
pizzaJson.map((item, i)=>{
    let pizzaItem = q('.pizza-item').cloneNode(true); //cloneNode é igual ao Kage Bushin no Jutsu :D
    let precoSize = parseInt(item.price.length) - 1;//2

    pizzaItem.setAttribute('data-key', i);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[precoSize].toFixed(2).replace('.', ',')}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        
        let clickPizza = e.target.closest('.pizza-item').getAttribute('data-key');
        //closest pega o elemento mais próximo com o nome passado como parametro
        iModal = clickPizza;
        qtPizza = 1;
        
        q('.pizzaInfo--sizes').addEventListener('click', ()=>{attTamanho(iModal)});
        q('.pizzaInfo h1').innerHTML = pizzaJson[clickPizza].name;
        q('.pizzaInfo .pizzaInfo--desc').innerHTML = pizzaJson[clickPizza].description;
        q('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[clickPizza].price[precoSize].toFixed(2).replace('.',',')}`;
        q('.pizzaInfo--size.selected').classList.remove('selected');
        qA('.pizzaInfo--size').forEach((item, i)=>{
            if (i == 2) {
                item.classList.add('selected');
            }
            item.querySelector('span').innerHTML = `-${pizzaJson[clickPizza].sizes[i]}-`;
        });
        q('.pizzaBig img').src = pizzaJson[clickPizza].img;
        q('.pizzaInfo--qt').innerHTML = qtPizza;
        
        //abertura do modal
        q('.pizzaWindowArea').style.opacity = 0;
        q('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            q('.pizzaWindowArea').style.opacity = 1;
        },200);
    });

    q('.pizza-area').append(pizzaItem); //clona a estrutura do pizza Item
})

//eventos do Modal
qA('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach(item => {
    item.addEventListener('click', closeModal);
})
function closeModal(){
    q('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        q('.pizzaWindowArea').style.display = 'none';
    },500)
}

q('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    qtPizza++;
    q('.pizzaInfo--qt').innerHTML = qtPizza;
});
q('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if (qtPizza > 1){    
        qtPizza--;
        q('.pizzaInfo--qt').innerHTML = qtPizza;
    };
});

qA('.pizzaInfo--size').forEach((item, i)=>{
    item.addEventListener('click',() => {
        q('.pizzaInfo--size.selected').classList.remove('selected');
        item.classList.add('selected');
    });
});

function armazenarPizzaArray(){
    let size = q('.pizzaInfo--size.selected').getAttribute('data-key');

    let identificador = pizzaJson[iModal].id+'@'+size;
    //key retorna -1 se false ou N se encontrar
    let key = carrinhoCompras.findIndex(item => item.identificador == identificador)

    switch (size){
        case "P":
            tam = 0;
            break;
        case "M":
            tam = 1;
            break;
        case "G":
            tam = 2;
            break;
    } 

    if(key == -1){
        carrinhoCompras.push({
            identificador,
            id: pizzaJson[iModal].id,
            preco: pizzaJson[iModal].price[tam],
            size,
            qt: qtPizza
        });
    }else{
        carrinhoCompras[key].qt += qtPizza;
    }
    if (carrinhoCompras.length == 1){
        alert('compras acima de R$30,00 da um convenção de brinde');
    }
    
    closeModal();
    updateCarrinhoCompras();
};
q('.pizzaInfo--addButton').addEventListener('click', armazenarPizzaArray);

function updateCarrinhoCompras(){
    q('.menu-openner span').innerHTML = `${carrinhoCompras.length}`;

    if (carrinhoCompras.length > 0){
        q('aside').classList.add('show');
        q('.cart').innerHTML = '';

        let total = 0;
        let desconto = 0;
        let subtotal = 0;

        for (let i in carrinhoCompras){
            let cartItem = q('.models .cart--item').cloneNode(true);
            let pizzaItem = pizzaJson.find((item) => item.id == carrinhoCompras[i].id);

            subtotal += carrinhoCompras[i].preco * carrinhoCompras[i].qt;
            desconto = subtotal * 0.1;
            total = subtotal - desconto;            

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} (${carrinhoCompras[i].size})`;
            cartItem.querySelector('.cart--item--qt').innerHTML = `${carrinhoCompras[i].qt}`;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if (carrinhoCompras[i].qt > 1){
                    carrinhoCompras[i].qt--;
                }else{
                    carrinhoCompras.splice(i, 1);
                }
                
                updateCarrinhoCompras();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                carrinhoCompras[i].qt++
                updateCarrinhoCompras();
            });
            q('.subtotal span:last-child').innerHTML = subtotal.toFixed(2).replace('.', ',');
            q('.desconto span:last-child').innerHTML = desconto.toFixed(2).replace('.', ',');
            q('.total span:last-child').innerHTML = total.toFixed(2).replace('.', ',');

            q('.cart').append(cartItem);
            if (total > 30){
                q('.promocao img').src = '';
                q('.promocao img').src = 'images/convencao.jpg';
            }else{
                q('.promocao img').src = '';
            }
        }
    }else{
        q('aside').classList.remove('show');
        q('aside').style.left = '100vw';
    }
}

q('.menu-openner').addEventListener('click', ()=>{
    if (carrinhoCompras.length > 0){
        q('aside').style.left = 0;
    };
});
q('.menu-closer').addEventListener('click', ()=>{
    q('aside').style.left = '100vw';
})

function attTamanho(clickPizza){
    let tamanhoPrice = q('.pizzaInfo--size.selected').getAttribute('data-key');
    
    switch (tamanhoPrice){
        case "P":
            tam = 0;
            break;
        case "M":
            tam = 1;
            break;
        case "G":
            tam = 2;
            break;
    } 
    precoFinal = pizzaJson[clickPizza].price[tam];

    q('.pizzaInfo--actualPrice').innerHTML = `R$ ${precoFinal.toFixed(2).replace('.', ',')}`;
}
//colocar um CEP
q('#cepInput').addEventListener('keyup', buscaCEP);

async function buscaCEP(){
    let cep = document.querySelector('#cepInput').value;
    
    if (cep.length == "8"){
        let req = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let api = await req.json();
        
        let cidade = api.localidade;

        if (cidade == "Caieiras"){
            q('.cepResult').innerHTML = '';
            q('.cepResult').innerHTML = 'Que maravilha!! Entregamos na sua região :D';
        }else{
            q('.cepResult').innerHTML = '';
            q('.cepResult').innerHTML = 'Que pena!! ainda não atendemos sua região, por hora atendemos apenas a cidade de <b>Caieiras-SP</b>';
        }
    } else{
        q('.cepResult').innerHTML = '';
    }
    
}