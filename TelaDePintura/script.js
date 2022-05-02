//variaveis
let cor = document.querySelector('.color.active').getAttribute('data-color');
let tela = document.querySelector('#tela');
let pressionado = false;
let mouseX = 0;
let mouseY = 0;
let contexto = tela.getContext('2d');
//eventos
document.querySelectorAll('.color').forEach((item)=>{
    item.addEventListener('click', trocarCor);
})
tela.addEventListener('mouseup', mouseDespressionado)
tela.addEventListener('mousedown', mousePressionado)
tela.addEventListener('mousemove', mouseMovendo)
document.querySelector('.clear').addEventListener('click', limparTela)

//funções
function trocarCor(click){
        document.querySelector('.color.active').classList.remove('active');
        click.target.classList.add('active');
        cor = click.target.getAttribute('data-color')
}
function mouseDespressionado(){
    pressionado = false;
}
function mousePressionado(evento){
    pressionado = true;
    mouseX = evento.pageX - tela.offsetLeft;
    mouseY = evento.pageY - tela.offsetTop;
}
function mouseMovendo(evento){
    if (pressionado) {
        desenhar(evento.pageX, evento.pageY)
    }
}
function desenhar(x, y){
    let pontoX = x - tela.offsetLeft;
    let pontoY = y - tela.offsetTop;

    contexto.beginPath(); // inicio do traço
    contexto.lineWidth = 5;
    contexto.lineJoin = "round";
    contexto.moveTo(mouseX, mouseY);
    contexto.lineTo(pontoX, pontoY);
    contexto.closePath(); // fim do traço
    contexto.strokeStyle = cor;
    contexto.stroke();

    mouseX = pontoX;
    mouseY = pontoY;
}
function limparTela(){
    contexto.setTransform(1,0,0,1,0,0,);
    contexto.clearRect(0,0,contexto.canvas.width, contexto.canvas.height);
}