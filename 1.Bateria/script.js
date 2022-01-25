document.body.addEventListener('keyup', (e) => {
    let teclou = (e.code.toLowerCase()) 
    playSound(teclou)
    destacar(teclou)
}) /*body = corpo do site | pega a tecla q foi pressionada 
e armazena na variavel sendo tudo minuscula*/

function playSound(e) { // parametro e é o parametro teclou
    let tocandoSom = document.getElementById(`s_${e}`)
    let mouseTocandoSom = document.getElementById(`s_key${e}`)
    if(tocandoSom){ //sem o if funciona mas aparece erro no console
        tocandoSom.currentTime = 0 //corta o som e faz ele tocar do inicio
        tocandoSom.play()       
    }
    if(mouseTocandoSom){ //sem o if funciona mas aparece erro no console
        mouseTocandoSom.currentTime = 0 //corta o som e faz ele tocar do inicio
        mouseTocandoSom.play()       
    }
}

function destacar(e){
    let contornarItem = document.querySelector(`div[data-key=${e}]`)
    let mouseContornarItem = document.querySelector(`div[data-key="key${e}"]`)
    if (contornarItem){ //sem o if funciona mas aparece erro no console
        contornarItem.classList.add('active')
        setTimeout(()=>{
            contornarItem.classList.remove('active')
        },100)
    }
    if (mouseContornarItem){ //sem o if funciona mas aparece erro no console
        mouseContornarItem.classList.add('active')
        setTimeout(()=>{
            mouseContornarItem.classList.remove('active')
        },100)
    }
}

    let btnPlay = document.querySelector('.composer button');
    //clicou no botão tocar:
    btnPlay.addEventListener('click', ()=>{
        let comporInput = document.getElementById('input').value;
        comporInput = comporInput.toLowerCase()   
            if (comporInput !== ''){
                inputArray = comporInput.split('')
                comporMusica(inputArray)
            }
    })

    function comporMusica(array){
        let cadencia = document.getElementById('cadencia').value;
        if(cadencia == ''){
            cadencia = 250;
        } else{
            cadencia = parseFloat(cadencia)
            cadencia = cadencia
        }
        let wait = 0;
        if (array){
            for (let i of array){ //se colocar IN = numero do array | se colocar OF é igual valor
                setTimeout(()=>{
                    playSound(`key${i}`)
                    destacar(`key${i}`)
                },wait)
                wait += cadencia
            } 
        }
        }

    let mouseSom = document.querySelectorAll('.key');
    
    for (let i=0; i<mouseSom.length; i++){
        mouseSom[i].addEventListener('click', () => {
            let itemClicado = mouseSom[i].textContent.toLowerCase();
            playSound(itemClicado);
            destacar(itemClicado)
        })
    }