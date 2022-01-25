// Variaveis de controle
let seuVotoPara = document.querySelector('.d1-1 span')
let cargo = document.querySelector('.d1-2 span')
let descricao = document.querySelector('.d1-4')
let aviso = document.querySelector('.d2')
let lateral = document.querySelector('.d1-right')
let numeros = document.querySelector('.d1-3')

//variaveis de ambiente 
let etapaAtual = 0;
let numVoto = '';
let votoBranco = false;
let votos = [];

//etapas do processo
function comecarEtapa() { // primeira etapa

    let etapa = etapas[etapaAtual]; //vamos votar para quem primeiro?
    let numeroHtml = ''; //qt de retangulos (caracteres para votar)
    numVoto = '';
    votoBranco = false;

    for (let i=0;i<etapa.numeros;i++){
        if(i == 0){
            numeroHtml += '<div class="numretangulo pisca"></div>'; //cria retangulos
        } else{
            numeroHtml += '<div class="numretangulo"></div>'; //cria retangulos
        }
        
    }
    //display inicial padrao
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizarInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero == numVoto){
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        descricao.innerHTML = `Nome: ${candidato.nome} <br> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';
        
        let fotoElegenda = '';
        for (let i=0;i<candidato.fotos.length;i++){ /*(let i in candidato.fotos) */   
            if (candidato.fotos[i].small === true){
                fotoElegenda += `<div class="candidato2"><img src="img/${candidato.fotos[i].url}"> ${candidato.fotos[i].legenda}</div>`
            }else{
                fotoElegenda += `<div class="candidato"><img src="img/${candidato.fotos[i].url}">${candidato.fotos[i].legenda} </div>`
            }
        }
        lateral.innerHTML = fotoElegenda;
    } else{
        seuVotoPara.style.display = "block";
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="ALERTA pisca"> voto nulo!! </div>';
    }

}

// funções do teclado
function clicou(n){
    document.getElementById('tu').play();
        let elNumero = document.querySelector('.numretangulo.pisca');
    if (n !== undefined){
        elNumero.innerHTML = n
        numVoto = `${numVoto}${n}`
        elNumero.classList.remove('pisca')
            if(elNumero.nextElementSibling == null) {
                atualizarInterface()
            } else {
                elNumero.nextElementSibling.classList.add('pisca')
            }
    }
}
function branco(){
    document.getElementById('tu').play();
    numVoto = '';
    descricao.innerHTML = '<div class="branco pisca"> Voto em Branco </div>'
    numeros.innerHTML = '';
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    lateral.innerHTML = '';    
    votoBranco = true;
}

function corrige(){
    document.getElementById('tu').play();
    numVoto = '';
    comecarEtapa()
    
}

function confirmar(){
    let etapa = etapas[etapaAtual]; //vamos votar para quem primeiro?
    let votoConfirmado = false;

    if (votoBranco === true){
        document.getElementById('fim').play()
        console.log('confirmando como Branco...')
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            Voto: 'Branco'
        })
    }else if (numVoto.length === etapa.numeros){
        document.getElementById('fim').play()
        console.log('confirmando como ' + numVoto)
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo ,
            voto: numVoto
        })
    }else{
        alert('preencha todos os campos ou vote em branco')
    }

    if (votoConfirmado){
        cargo.innerHTML = '';
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector('.tela').classList.add('FIM')
            document.querySelector('.tela').innerHTML = 'FIM'
            descricao.innerHTML = ''
            aviso.style.display = 'none';
            seuVotoPara.style.display = 'none';
            numeros.style.display = 'none';
            setTimeout(()=>{
                etapaAtual = 0;
                numVoto = '';
                votoBranco = false;
                votos = [];
                comecarEtapa()
            },5000)
            
        }
    }
    
}

// chamando funções
comecarEtapa();
clicou();