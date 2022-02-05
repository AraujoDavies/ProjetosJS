//vars
const q = (elemento) => document.querySelector(elemento);
const qA = function(elemento){ return document.querySelectorAll(elemento)};
let powerOnOff = true;
let ligado = estaLigado();
let data = new Date();

//events
q('.power').addEventListener('click', ()=>{
    ligado = estaLigado(); // verifica se a calculadora está ligada
    exibirDataNoVisor();
    exibirNoVisor();
})

qA('.tecla').forEach( (item) => { 
    item.addEventListener('click', (e) => {
        let valor = e.target.innerHTML; //retorna o valor do item clicado
        exibirNoVisor(valor)
    })
})

//functions
let valores = [];
//exibe o cálculo no visor
function exibirNoVisor(valor){

   
    if (ligado){
        //código para executar se calculadora ligada
        
            if (valor){
                valores.push(valor)
                console.log(valores)
                q('.input--area').append(valor)
                
            }else{
                console.log ('nao adicionado ao array')
            }
    } else{
        //código para executar se desligado
        valores = [];
        q('.input--area').innerHTML = '';
    }
    
    // saber onde o usuário clicou OK
    // armazenar valores dentro do array OK
    // sempre q ele clicar em um operador, unir os numeros do array
    // se clicar em igual, verifica o tamanho do array
    // armazenar o valor dentro do array novamente
    // pegar o valor numerico => transformar em Float
    
}


// a calculadora está ligada ???? 
function estaLigado(){ 
    if(powerOnOff === false){
        powerOnOff = true;
        return true;
    }else{
        powerOnOff = false;
        return false;
    }
}

//relógio + data da ccalculadora
function exibirDataNoVisor(){
    dia = data.getDay();
    mes = data.getMonth();
    ano = data.getFullYear();
    hora = data.getHours();
    minutos = data.getMinutes();

    if(dia < 10) { dia =`0${dia}`};
    if(mes < 10) { mes =`0${mes}`};
    if(hora < 10) { hora =`0${hora}`};
    if(minutos < 10) { minutos =`0${minutos}`};

    if (ligado){
        q('.visor .date').innerHTML = `${dia}/${mes}/${ano} - ${hora}:${minutos}`;
    } else{
        q('.visor .date').innerHTML = '';
    }
}