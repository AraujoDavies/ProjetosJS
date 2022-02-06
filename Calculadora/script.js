//vars
const q = (elemento) => document.querySelector(elemento);
const qA = function(elemento){ return document.querySelectorAll(elemento)};

//Clicks 
onload = () => {
    q('#btn-1').onclick = () => digito(1);
    q('#btn-2').onclick = () => digito(2);
    q('#btn-3').onclick = () => digito(3);
    q('#btn-4').onclick = () => digito(4);
    q('#btn-5').onclick = () => digito(5);
    q('#btn-6').onclick = () => digito(6);
    q('#btn-7').onclick = () => digito(7);
    q('#btn-8').onclick = () => digito(8);
    q('#btn-9').onclick = () => digito(9);
    q('#btn-0').onclick = () => digito(0);
    q('#btn-virgula').onclick = virgula;
    q('#btn-AC').onclick = limpa
    /*
    q('#btn-').onclick = () => 
    */
}

//variaveis que armazenam os valores/operadores e o estado da calculadora
let valorDoVisor = '0';
let ehNovoNumero = true; // é um novo valor ? 

//atualiza os numeros do visor
const attVisor = () => {
    let [inteiro, decimal] = valorDoVisor.split(',');
    let v = '';
    let c = 0;
    
    //laço for me retornando a quantidade de numeros inteiros inputados
    for (let i = inteiro.length - 1; i >= 0; i--){
        //if para acrescenter o ponto a cada 3 caracteres 
        if(++c > 3){
            v = "." + v;
            c = 1;
        }
        v = inteiro[i] + v;
    }
    //para nao retornar undefined
    v = v + (decimal ? ',' + decimal : '');
    q('.input--area').innerText = v;
}

//pega os clicks
const digito = (n) => {
    if (ehNovoNumero){
        valorDoVisor = '' + n;
        ehNovoNumero = false;
    } else valorDoVisor += n;
    attVisor();
    efeitoClick(n);
}

//só pode uma virgula
const virgula = () => {
    if (ehNovoNumero){
        valorDoVisor = '0,';
        ehNovoNumero = false;
    } else if(valorDoVisor.indexOf(',') == -1) valorDoVisor += ',';
    attVisor();
}

// botão AC All Clear 
const limpa = () => {
    ehNovoNumero = true;
    valorDoVisor = '0';
    attVisor();
}

//relógio + data da calculadora
function exibirDataNoVisor(){
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1; //jan = 0
    let ano = data.getFullYear();
    let hora = data.getHours();
    let minutos = data.getMinutes();
    let segundos = data.getSeconds();
    let dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    let diaSemana = dias[data.getDay()];

    if(dia < 10) { dia =`0${dia}`};
    if(mes < 10) { mes =`0${mes}`};
    if(hora < 10) { hora =`0${hora}`};
    if(minutos < 10) { minutos =`0${minutos}`};
    if(segundos < 10) { segundos =`0${segundos}`};

    let ligado = true; //*****************
    if (ligado){
        q('.visor .date').innerHTML = `<u> ${diaSemana} - ${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos} </u>`;
    } else{
        q('.visor .date').innerHTML = '';
    }
}

//efeito de click
const efeitoClick = (n) => {
 
}