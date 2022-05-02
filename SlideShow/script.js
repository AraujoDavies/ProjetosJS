// Variáveis
let slideAtual = 0;
let totalSlides = destaques.length //3
montaSlides();

//eventos
document.querySelectorAll('.indicador').forEach((item, itemNum) => {
    item.addEventListener('click', ()=>{
        slideAtual = itemNum;
        attSlider();
    })
})

//funções
function montaSlides(){
    //verifica se existe slide no array foto.js
    if (totalSlides < 1){
        document.querySelector('.carousel-img').classList.add('carousel--vazio')
        document.querySelector('.carousel-img').innerHTML = "Não há slides disponíveis, por favor adicione"
        document.querySelector('.controles').style.display = "none";
    } else { //cria as imagens e o indicador que mostra em qual slide está

    for(let i=0; i<totalSlides; i++){
        document.querySelector('.indicador--area').innerHTML += '<div class="indicador"></div>'
        document.querySelector('.carousel-img').innerHTML += `<div class="img" style="background-image: url(${destaques[i].foto});"></div>`
        if (i == slideAtual){
            document.querySelector('.details--area').innerHTML += 
            `<div class="rodape--title">${destaques[slideAtual].titulo}</div> 
            <div class="rodape--desc"> ${destaques[slideAtual].descricao}</div>`;
        }
    }

    if(slideAtual === 0){
        document.querySelector('.indicador').classList.add('on')
    }
    
    attSlider();
}
}
/*control functions */
function nextSlide(){
    slideAtual++
    if (slideAtual > totalSlides - 1){
        slideAtual = 0;
    }

    attSlider();
}
function prevSlide(){
    slideAtual--
    if (slideAtual < 0){
        slideAtual = totalSlides - 1;
    }
    attSlider();
}
function attSlider(){
    document.querySelector('.carousel-img').classList.remove('carousel--vazio')

    let sliderWidth = document.querySelector('.carousel-wid').clientWidth //vai pegar o espaço da div carousel-wid 600px
    let indicador = document.querySelectorAll('.indicador');

    document.querySelector('.carousel-img').style.width = `${sliderWidth * totalSlides}px;`
    document.querySelector('.carousel-img').style.marginLeft = `-${sliderWidth * slideAtual}px`

    document.querySelector('.indicador.on').classList.remove('on')
    indicador[slideAtual].classList.add('on')


    document.querySelector('.details--area').innerHTML = 
    `<div class="rodape--title">${destaques[slideAtual].titulo}</div> 
    <div class="rodape--desc"> ${destaques[slideAtual].descricao}</div>`;

}