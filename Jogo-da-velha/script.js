//Variáveis
let mostrador = document.querySelector('.vez--id')
let sorteio = 0;
let gameOver = false;
let jogadas = { 
    a1:'', a2:'', a3:'',
    b1:'', b2:'', b3:'',
    c1:'', c2:'', c3:''
 };
 let result = document.querySelector('.resultado');
 
vez();
//eventos
document.querySelectorAll('.area-jogada').forEach((item, i) => {
    item.addEventListener('click', preencherCampo);
})

document.querySelectorAll('.btns').forEach( item => {
    item.addEventListener('click', resetGame)
})

//funções
function vez(){ //define quem é o primeiro a jogar
    sorteio = parseFloat(Math.floor((Math.random())*2));
    (sorteio == 1) ? mostrador.textContent = "O" : mostrador.textContent = "X";
    attMostrador();
}
function attMostrador(){ //atualizar a vez do jogador sempre que houver um clique
    if(mostrador.textContent === "O"){
        mostrador.classList.remove('o');
        mostrador.innerHTML = 'X';
        mostrador.classList.add('x');
    } else{
        mostrador.classList.remove('x');
        mostrador.innerHTML = 'O';
        mostrador.classList.add('o');
    }
}
function preencherCampo(e){//coloca o X ou a bolinha no campo clicado
    if (e.target.textContent == '' && gameOver == false){

        if(mostrador.textContent === "O"){
            e.target.classList.remove('x');
            e.target.classList.add('o');
        } else{
            e.target.classList.remove('o');
            e.target.classList.add('x');
        }
        
        e.target.innerHTML = mostrador.textContent;
        id = e.target.getAttribute('identify')
        jogadas[id] = mostrador.textContent;

        attMostrador();
        verificarGameOver();
    }
}
function verificarGameOver(){
    if (verificar('X')){
        result.innerHTML = `X Venceu!`
        result.style.backgroundColor = '#0000ff';
        resultFinal();
        gameOver = true;
    } else if(verificar('O')){
        result.innerHTML = `Bola Venceu!`
        result.style.backgroundColor = '#ff0000';
        resultFinal();
        gameOver = true;
    } else if (deuVelha()){
        result.innerHTML = `Deu Velha!`
        result.style.backgroundColor = '#0f0';
        resultFinal();
        gameOver = true;
    }

}
function verificar(p){   
    if (
        (jogadas['a1'] == p && jogadas['a2'] == p && jogadas['a3'] == p) ||
        (jogadas['b1'] == p && jogadas['b2'] == p && jogadas['b3'] == p) ||
        (jogadas['c1'] == p && jogadas['c2'] == p && jogadas['c3'] == p) ||

        (jogadas['a1'] == p && jogadas['b1'] == p && jogadas['c1'] == p) ||
        (jogadas['a2'] == p && jogadas['b2'] == p && jogadas['c2'] == p) ||
        (jogadas['a3'] == p && jogadas['b3'] == p && jogadas['c3'] == p) ||

        (jogadas['a1'] == p && jogadas['b2'] == p && jogadas['c3'] == p) ||
        (jogadas['a3'] == p && jogadas['b2'] == p && jogadas['c1'] == p) 
     ){
        gameOver = true;
        return true;
    } else{
        return false;
    }
}
function deuVelha(){
    for (let i=0; i<Object.keys(jogadas).length; i++){
        let jog = Object.values(jogadas)
        if(jog[i] === ''){
            return false;
        }
    }
    return true;
}
function resetGame(){
    vez();
    gameOver = false;
    jogadas = { 
        a1:'', a2:'', a3:'',
        b1:'', b2:'', b3:'',
        c1:'', c2:'', c3:''
    };
    document.querySelectorAll('.area-jogada').forEach(item => {
        item.textContent = '';
    })
    document.querySelector('.resultado').innerHTML = '';
    document.querySelector('.resultado-area').style.display = "none";
}
function resultFinal(){
    let resultFinal = document.querySelector('.resultado-area')
    resultFinal.style.opacity = 0;
    resultFinal.style.display = "flex";
    setTimeout(() => {
        resultFinal.style.opacity = 1
    }, 100)
}

// adicionar botão de voltar uma jogada
