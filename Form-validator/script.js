//variaveis 
let validador = {
    lidarComSubmit: (event) => {
        event.preventDefault();
        let enviarForm = true;
        let inputs = formulario.querySelectorAll('input');
        validador.limparErro();
        for(let i=0 ; i<inputs.length; i++){
            let input = inputs[i];
            let check = validador.checarInput(input);
            input.style.borderColor = 'transparent';
            if (check !== true){
                enviarForm = false;
                //exibir erro
                validador.mostrarErro(input, check); //check retornará erro
            } 
        }
        
        if(enviarForm){
            formulario.submit();
        }
    },
    checarInput: function(input){
        let regrasInput = input.getAttribute('data-rules')
        if(regrasInput !== null){
            regrasInput = regrasInput.split("|")    
            for(let k in regrasInput){
                let regrasDetalhes = regrasInput[k].split("=")
                switch(regrasDetalhes[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'O campo não pode ser vazio!'
                        }
                    break;
                    case 'min':
                        if (regrasDetalhes[1] > input.value.length){
                            return `O campo precisa ter mais que ${regrasDetalhes[1] - 1} caracteres`
                        }
                    break;
                    case 'email':
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!regex.test(input.value)){
                            return `O endereço de E-mail é inválido!`
                        }
                    break;
                }
            } 
        }
        return true;
    },
    mostrarErro: function(input, error /*error = ao return da variavel check*/){ //exibe erro para usuário
        input.style.borderColor = '#ff0000';
        let erro = document.createElement('div');
        erro.classList.add('erroAviso')
        erro.innerHTML = error;
        input.parentElement.insertBefore(erro, input.elementSibiling);
    },
    limparErro: function(input){
        let todosErros = document.querySelectorAll('.erroAviso')
        for(let i=0; i<todosErros.length;i++){
            todosErros[i].remove();
        }
        
    }
}

let formulario = document.querySelector('.valida-form');

//eventos
formulario.addEventListener('submit', validador.lidarComSubmit);