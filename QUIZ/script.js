let perguntaAtual = 0;
let acertos = 0;
exibirPergunta();



//evento
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

function exibirPergunta(){
    if(questions[perguntaAtual]){
        let q = questions[perguntaAtual]

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = '';
        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<div class="option" data-op="${i}"> <span>${parseInt(i)+1}</span> ${q.options[i]} </div>`
            // é melhor colocar tudo em uma variável doq chamar o DOM, pois assim exige menos da maquina do usuário
            /*Usando o DOM:
                document.querySelector('.options').innerHTML += `<div class="option"> ${q.options[i]} </div>`;
            */
        }

        document.querySelector('.options').innerHTML = '';
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.option').forEach(item => {
            item.addEventListener('click', alternativaEscolhida)
        })

    }else{
        finalizarQuiz();
    }
}
function alternativaEscolhida(eventClick){
        let alternativaClick = parseInt(eventClick.target.getAttribute('data-op'));
        if(alternativaClick === questions[perguntaAtual].answer){
            acertos++;
        } 
        perguntaAtual++;
        barraDeProgresso();
        exibirPergunta();
}
function barraDeProgresso(){
    let barra = ((perguntaAtual) / questions.length) * 100;
    document.querySelector('.progress--bar').style.width = `${barra}%`;
}
function finalizarQuiz(){
    document.querySelector('.questionArea').style.display = 'none';
    let janelaFim = document.querySelector('.scoreArea')
    janelaFim.style.display = 'block';

    let acertosPct = (acertos / questions.length) * 100; //% de acertos

    if(acertosPct > (questions.length * 7)){
        janelaFim.querySelector('.scoreText1').innerHTML = 'é isso ai!! continue assim e será um excelente programador'
        janelaFim.querySelector('.scorePct').style.color = '#0d630d';
    } else if( acertosPct >= (questions.length * 5) && acertosPct <= (questions.length * 7) ){
        janelaFim.querySelector('.scoreText1').innerHTML = 'Vamos focar mais na matéria ;)'
        janelaFim.querySelector('.scorePct').style.color = '#ffff00';
    } else if(acertosPct < (questions.length * 5)){
        janelaFim.querySelector('.scoreText1').innerHTML = 'ELAIAAAA, mal demais em!'  
        janelaFim.querySelector('.scorePct').style.color = '#ff0000';
    }

    janelaFim.querySelector('.scorePct').innerHTML = `Você acertou ${acertosPct}% do Quiz`
    janelaFim.querySelector('.scoreText2').innerHTML = `você respondeu ${questions.length} questões e acertou ${acertos}`
}
function resetEvent(){
    perguntaAtual = 0;
    acertos = 0;

    exibirPergunta();
}