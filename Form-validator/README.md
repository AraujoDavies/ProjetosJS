Formulário Simples e Prático para o programador criar suas validações.

Como usar: 

- abra o arquivo 'script.js' ;
- vá até a linha 29 (inicio do Switch);
- crie uma validação ou edite as existentes;
- Por fim vá para o arquivo 'index.html' na tag INPUT insira o parametro data-rules e 
e coloque a validação :D

faça da seguinte forma:

input type="text" name="name" ***data-rules="required|min=5"***

OBS: caso o data-rules tenham mais de uma validação, basta separa-las por "|"