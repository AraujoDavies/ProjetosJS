//var
let playerName = '';
let bolasEstouradas = 0;
let gamePausado = false; // pergunta: o jogo está pausado ?
let nivelHTML = document.querySelector('#niveis').cloneNode(true);
let gameOver = false;
let bolasEmTela = 0;
let interval; //variavel do set Interval
let inGame = false; //var control click in bad area
let iNivel;

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

    if (inGame) {    
        bola.classList.add(cor[iCor]);
        bola.setAttribute('style', 'left: ' + p1 +'px; top: ' + p2 + 'px;');
        bola.setAttribute('onclick' , 'estourar(this)');
        
        if (!gamePausado){
            document.querySelector('#pause').innerHTML = 'SPACE para PAUSAR';
            gameArea.append(bola);
        } else {
            //mostrar mesngagem de PAUSADO
            document.querySelector('#pause').innerHTML = 'GAME PAUSADO';
        }
        bolasEmTela++
    }
}

const estourar = (obj) => {
    if (inGame) {        
        if (!gamePausado){
            document.querySelector('.tela--game').removeChild(obj);   
            bolasEstouradas++;
            document.querySelector('#contador span').innerHTML = bolasEstouradas;
        }
    }
}

const start = (velocidade) => {
    if (inGame) {
        interval = setInterval(addBalao, velocidade);
    } 
}

const getPlayer = () => {
    inGame = false;
    playerName = ''
    playerName = prompt(" Como é o seu nome ?"); 
    validarNome();
}

const validarNome = () => {
    if (playerName.length > 10 || playerName.length < 3 || playerName == '' ){
        getPlayer();
    } else{  alert('Seu nome foi registrado na lista de recordes :D'); registrarDados();}
}

const registrarDados = () => {
    switch (iNivel) {
        case "0": 
            iNivel = "Fácil";
        break;
        case "1": 
            iNivel = "Normal";
        break;
        case "2": 
            iNivel = "Difícil";
        break;
        case "3": 
            iNivel = "Impossível";
        break;
    }

    recordes.push({
        nome: playerName,
        nivel: iNivel,
        baloesEstourados: bolasEstouradas,
    })

    console.log(recordes)

    listarRecordes();
    resetGame();
}

const pauseGame = () => {
    if (!gamePausado) {
        gamePausado = true;
        inGame = false;
    }else { 
        gamePausado = false;
        inGame = true;
    } 
}

const selecionaNivel = () => {
    document.querySelector('.tela--game').appendChild(nivelHTML);
    
    document.querySelectorAll('.choose--nivel').forEach(item => {
        item.addEventListener('click', (item) =>{ 
            iNivel = item.target.getAttribute('data-nivel');
            switch (iNivel){
                case "0":
                    removeNiveis();
                    isGameInPlay();
                    setTimeout( () => {start(1250)}, 1000);
                break;
                case "1":
                    removeNiveis();
                    isGameInPlay();
                    setTimeout( () => {start(1000)}, 1000);
                break;
                case "2":
                    removeNiveis();
                    isGameInPlay();
                    setTimeout( () => {start(600)}, 1000);
                break;
                case "3":
                    removeNiveis();
                    isGameInPlay();
                    setTimeout( () => {start(300)}, 1000);
                break;
            }
        })
    })
}

const removeNiveis = () => {
    document.querySelector('.tela--game').removeChild(nivelHTML);
}

const casesGameOver = () => {
    document.querySelector('.tela--game').addEventListener('click', (e)=>{
        let clickValidation = e.target.getAttribute('okClick');
        //console.log(clickValidation) SHOW IF THE CLICK IS BAD
        if (clickValidation == "bad"){
            if (inGame){
                gameOver = true;
            }
        }
        clickValidation = '';

        if (bolasEmTela > 50){
            gameOver = true;
        }

        if(gameOver){
            clearInterval(interval);
            alert('GAME OVER!');
            isGameInPlay();
            getPlayer();
        }
    })
}
casesGameOver();

const isGameInPlay = () => {
    if (inGame) {
        inGame = false
    } else inGame = true;
}

const resetGame = () => {
    gameOver = false;
    document.querySelector('#start--game').style.display = "flex";
    document.querySelector('.tela--game').innerHTML = '';
    document.querySelector('#pause').innerHTML = '';
    document.querySelector('#contador span').innerHTML = '--';
    bolasEmTela = 0;
    bolasEstouradas = 0;
}

const listarRecordes = () =>{
    //criando novo array para modificar
    let newRecords = [];
    for (let i=0; i<recordes.length; i++){
        newRecords.push(recordes[i]);
    }
    
    //Ordenando o array na ordem correta
    newRecords.sort(compare)

    document.querySelector('#tbody').innerHTML = '';
    newRecords.map((item, index) => {            

            let modelTr = document.querySelector('#tr').cloneNode(true) //clonando estrutura html para inserir após colocar dados
            modelTr.setAttribute('colocacao', index);
            let verify = modelTr.getAttribute('colocacao');

            modelTr.querySelector('.p').innerHTML = `${index+1}°`;
            modelTr.querySelector('.name').innerHTML = item.nome;
            modelTr.querySelector('.score').innerHTML = item.baloesEstourados;

            document.querySelector('#tbody').append(modelTr);

            if (verify > 9){
                modelTr.classList.add('models')
            }
    })
}
listarRecordes();

//função que auxilia a ordenar o novo array
function compare(a, b){
    if (a.baloesEstourados < b.baloesEstourados) return 1;
    if (a.baloesEstourados > b.baloesEstourados) return -1;
    return 0;
}