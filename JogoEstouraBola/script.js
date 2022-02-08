const addBalao = () => {
    let bola = document.createElement('div');
    bola.setAttribute('class', 'bola');

    let widthUser = window.screen.width - 100; //menos largura da bola * 2
    let heightUser = window.screen.height - 240; //menos altura da bola *4

    let p1 = Math.floor(Math.random() * widthUser);
    let p2 = Math.floor(Math.random() * heightUser);

    let cor = ['red', 'green', 'yellow', 'blue' ,'orange', 'pink'];
    let iCor = Math.floor(Math.random() * 6)

    bola.classList.add(cor[iCor]);
    bola.setAttribute('style', 'left: ' + p1 +'px; top: ' + p2 + 'px;');
    bola.setAttribute('onclick' , 'estourar(this)');
    
    document.body.append(bola);
    
}


const estourar = (obj) => {
    document.body.removeChild(obj);
}

const start = () => {
    setInterval(addBalao, 1000);
}
