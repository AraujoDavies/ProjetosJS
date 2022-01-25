//variaveis de controle
let digital = document.querySelector('.digital');
let pontSegundo = document.querySelector('.p_s');
let pontMinuto = document.querySelector('.p_m');
let pontHora = document.querySelector('.p_h');

//variaveis de ambiente


function attRelogio(){
    let agora = new Date;
    let hora = agora.getHours();
    let minutos = agora.getMinutes();
    let segundos = agora.getSeconds();

    if (segundos < 10){segundos = `0${segundos}`};
    if (minutos < 10){minutos = `0${minutos}`};
    if (hora < 10){hora = `0${hora}`};

    digital.innerHTML = `${hora}:${minutos}:${segundos}`;
    // relogio digital finished 

    let sDeg = (360 / 60) * (segundos - 15);
    let mDeg = (360 / 60) * (minutos - 15); //-15 para igualar o deg a 0
    let hDeg = ((360 / 12) * (hora - 15)) + ((30 / 60) * (minutos));

    pontSegundo.style.transform = `rotate(${sDeg}deg)`;
    pontMinuto.style.transform = `rotate(${mDeg}deg)`;
    pontHora.style.transform = `rotate(${hDeg}deg)`;
    //relogio analogico finalizado



}

setInterval(attRelogio, 1000);
attRelogio()