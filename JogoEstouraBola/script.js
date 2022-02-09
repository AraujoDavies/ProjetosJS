//var
let playerName = '';
let bolasEstouradas = 0;
let gamePausado = false; // pergunta: o jogo está pausado ?

//events
document.querySelector('#start--game').addEventListener('click', (e)=>{
    e.target.style.display = 'none';
    getPlayer();
    alert('Para PAUSAR o game tecle SPACE');
    start();
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

const start = () => {
    setInterval(addBalao, 100);
}

const getPlayer = () => {
    playerName = prompt(" Como é o seu nome ?");
}

const pauseGame = () => {
    if (!gamePausado) {
        gamePausado = true;
    }else { gamePausado = false;} 
    

}