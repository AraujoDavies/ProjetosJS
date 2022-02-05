//vars
const q = (elemento) => document.querySelector(elemento);
const qA = function(elemento){ return document.querySelectorAll(elemento)};



//relógio + data da ccalculadora
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
        q('.visor .date').innerHTML = ` ${diaSemana} - ${dia}/${mes}/${ano} - ${hora}:${minutos}:${segundos}`;
    } else{
        q('.visor .date').innerHTML = '';
    }
}