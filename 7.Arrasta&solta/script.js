let areas = {
    a: null, b: null, c: null
}
//events
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('dragend', dragEnd)
})

document.querySelectorAll('.area').forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', drop);
})

document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);

function dragStart(e){
    //currentTarget pega a classe q eu selecionei mesmo q tenham itens dentro
    //Target pega o item clicado
    e.currentTarget.classList.add('dragging')
}
function dragEnd(e){
    e.currentTarget.classList.remove('dragging')
}

function dragOver(e){
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        e.target.classList.add('hover');
    }
}
function dragLeave(e){
    e.target.classList.remove('hover');
    //document.querySelector('.areas').classList.remove('correct');
}
function drop(e){
    e.target.classList.remove('hover')
    
    if(e.currentTarget.querySelector('.item') === null){
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        attAreas();
    } 

    /* COMO EU FIZ a Logic Functions:
    if ((document.querySelector('.area[data-name="a"]').textContent == "1") &&
    (document.querySelector('.area[data-name="b"]').textContent == "2") &&
    (document.querySelector('.area[data-name="c"]').textContent == "3")){
        document.querySelector('.areas').classList.add('correct')
    }
    */ 
}

//Neutral Functions
function dragOverNeutral(e){
    e.preventDefault();
    e.currentTarget.classList.add('hover');
    
}
function dragLeaveNeutral(e){
    e.currentTarget.classList.remove('hover')
}
function dropNeutral(e){
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
  
    attAreas();
    neutralOrdem();
}

//logic functions
function attAreas(){
    document.querySelectorAll('.area').forEach(area => {
        let dataName = area.getAttribute('data-name');

        if (area.querySelector('.item') !== null){
            areas[dataName] = area.querySelector('.item').innerHTML;
        } else{
            areas[dataName] = null;
        }
    })
    
    if (areas.a === "1" && areas.b === "2" && areas.c === "3"){
        document.querySelector('.areas').classList.add('correct');
    } else{
        document.querySelector('.areas').classList.remove('correct');
    }
}

//manter ordem 1, 2, 3 no primeiro drag
function neutralOrdem(){
    
}