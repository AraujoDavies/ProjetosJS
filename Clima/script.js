let req;
let api;
let input;
let staticCity = ['São Paulo', 'Rio de Janeiro', 'Distrito Federal']; 
let InfoStaticArray = [];
let dark = true;
let loadingColor;


//events
document.getElementById('search').addEventListener('click', requisicaoInput)

document.querySelector('input').addEventListener('keyup', (e) => {
    let teclou = (e.code.toLowerCase());

    if (teclou == 'enter' || teclou == 'numpadenter'){
        requisicaoInput();
    }
})

document.querySelector('.btn-desliza').addEventListener('click', trocarTema)

verificarLoading();
mostrarInfoStatic();

//functions

function mostrarInfoStatic(){
    
    document.querySelectorAll('.br-city').forEach(async (item) => {
        let itemId = item.getAttribute('id')
        for (let i=0;i<staticCity.length;i++){
            if (itemId == staticCity[i]){
                req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(staticCity[i])}&appid=f686620300bc927d12e93019f8d91084&units=metric&lang=pt_br`);
                api = await req.json();
                let dados = {
                    cidade: api.name,
                    description: api.weather[0].description,
                    graus: api.main.temp, 
                    máxima: api.main.temp_max,
                    mínima: api.main.temp_min,
                    icon: api.weather[0].icon
                }

                item.querySelector('h2').innerHTML = `${dados.cidade}`;
                item.querySelector('.right').innerHTML = `${dados.description}`;
                item.querySelector('.rightC').innerHTML = `${dados.graus.toFixed()} <sup>°C</sup>`;
                item.querySelector('.min--max .max').innerHTML = `Máx. ${dados.máxima.toFixed()} <sup>°C</sup>`;
                item.querySelector('.min--max .min').innerHTML = `Mín. ${dados.mínima.toFixed()} <sup>°C</sup>`;
                item.querySelector('.left-img').innerHTML = `<img src="http://openweathermap.org/img/wn/${dados.icon}.png">`;
            }
        }
    })
}

//functions Input User
async function requisicaoInput (){
        input = document.querySelector('input').value
        
        if (input === ''){
            limparReq();
            alert('Digite alguma cidade!');
        }else {
            limparReq();
            carregando();
            req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=f686620300bc927d12e93019f8d91084&units=metric&lang=pt_br`);
            api = await req.json();
            
                if (api.cod == 200){
                    mostrarInfo({
                        cidade: api.name,
                        description: api.weather[0].description,
                        graus: api.main.temp, 
                        máxima: api.main.temp_max,
                        mínima: api.main.temp_min,
                        icon: api.weather[0].icon
                    });
                }else{
                    document.querySelector(".load-flex").innerHTML = 'Cidade Inválida!';
                    input = document.querySelector('input').value = '';
                    setTimeout(limparReq, 2500)
                }
        }
}
function carregando(){
    document.querySelector('.load-flex').innerHTML = `<div class="${loadingColor}"></div>`;
    document.querySelector(".load-flex").classList.remove('dp-none');
}

function mostrarInfo(obj){
    limparReq();

    document.querySelector(".load-flex").classList.add('dp-none');
    document.querySelector('#input--user').classList.remove('dp-none');
    
    document.querySelector('#input--user h2').innerHTML = `${obj.cidade}`;
    document.querySelector('#input--user .description').innerHTML = `${obj.description}`;
    document.querySelector('#input--user .rightC').innerHTML = `${obj.graus.toFixed()} <sup>°C</sup>`;
    document.querySelector('#input--user .min--max .max').innerHTML = `Máx. ${obj.máxima.toFixed()} <sup>°C</sup>`;
    document.querySelector('#input--user .min--max .min').innerHTML = `Mín. ${obj.mínima.toFixed()} <sup>°C</sup>`;
    document.querySelector('#input--user .left-img').innerHTML = `<img src="http://openweathermap.org/img/wn/${obj.icon}.png">`;
}
function limparReq(){
    document.querySelector(".load-flex").classList.add('dp-none');
    document.querySelector('#input--user').classList.add('dp-none');
    document.querySelector('#input--user h2').innerHTML = '';
    document.querySelector('#input--user .description').innerHTML = '';
    document.querySelector('#input--user .rightC').innerHTML = '';
    document.querySelector('#input--user .min--max .max').innerHTML = '';
    document.querySelector('#input--user .min--max .min').innerHTML = '';
    document.querySelector('#input--user .left-img').innerHTML = '';
}

function trocarTema(){
    if (dark == true){
        document.querySelector('.btn-bola').style.marginLeft = '15px';
        document.querySelector('body').classList.add('white');
        dark = false;
    } else{
        document.querySelector('.btn-bola').style.marginLeft = '0';
        document.querySelector('body').classList.remove('white');
        document.getElementById('min').style.color = 'royalblue;'
        dark = true;
    }
    verificarLoading();
}

function verificarLoading(){
    let el = document.querySelector(".load-flex").childNodes[0];
    el.classList.remove(`${loadingColor}`);
    if(dark === false){
        loadingColor = 'loading2';
        
    }else{
        loadingColor = 'loading';
    }
    
    el.classList.add(`${loadingColor}`)

}

//adicionar transição no botao