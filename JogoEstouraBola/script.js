//var
let playerName = '';
let bolasEstouradas = 0;
let gamePausado = false; // pergunta: o jogo está pausado ?
let nivelHTML = document.querySelector('#niveis').cloneNode(true);

//events
document.querySelector('#start--game').addEventListener('click', (e)=>{
    e.target.style.display = 'none';
    //alert('Para PAUSAR o game tecle SPACE');
    selecionaNivel();
    
})

document.body.addEventListener('keyup', (t) => {
    let teclou = t.code;
    if (teclou == 'Space'){
        pauseGame();
    }
})



//functions 
const addBalao = () => {
    let bola = document.createElement('div');
    bola.setAttribute('class', 'bola');
    let gameArea = document.querySelector('.tela--game');

    let widthGame = gameArea.clientWidth - 50; //menos largura da bola
    let heightGame = gameArea.clientHeight - 60; //menos altura da bola 

    let p1 = Math.floor(Math.random() * widthGame + gameArea.offsetLeft);
    let p2 = Math.floor(Math.random() * heightGame);

    let cor = ['red', 'green', 'yellow', 'blue' ,'orange', 'pink'];
    let iCor = Math.floor(Math.random() * 6)

    bola.classList.add(cor[iCor]);
    bola.setAttribute('style', 'left: ' + p1 +'px; top: ' + p2 + 'px;');
    bola.setAttribute('onclick' , 'estourar(this)');
    
    if (!gamePausado){
        document.querySelector('#pause').innerHTML = 'SPACE para PAUSAR'
        gameArea.append(bola);
    } else {
        //mostrar mesngagem de PAUSADO
        document.querySelector('#pause').innerHTML = 'GAME PAUSADO'
    }

}

const estourar = (obj) => {
    if (!gamePausado){
        document.querySelector('.tela--game').removeChild(obj);   
        bolasEstouradas++;
        document.querySelector('#contador span').innerHTML = bolasEstouradas;
    }
}

const start = (velocidade) => {
    setInterval(addBalao, velocidade);
}

const getPlayer = () => {
    //playerName = prompt(" Como é o seu nome ?"); 
    //VALIDAR ESTE CAMPO
    
}

const pauseGame = () => {
    if (!gamePausado) {
        gamePausado = true;
    }else { gamePausado = false;} 
}

const selecionaNivel = () => {
    document.querySelector('.tela--game').append(nivelHTML);
    
    document.querySelectorAll('.choose--nivel').forEach(item => {
        item.addEventListener('click', (item) =>{ 
            let iNivel = item.target.getAttribute('data-nivel');
            switch (iNivel){
                case "0":
                    document.querySelector('aside').style.width = "20vw";
                    document.querySelector('.tela--game').removeChild(nivelHTML);
                    setTimeout( () => {  start(10)}, 1000)
                break;
                case "1":
                    start(1000);
                break;
                case "2":
                    start(800);
                break;
                case "3":
                    start(500);
                break;
            }
        })
    })
}