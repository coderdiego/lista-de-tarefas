// 1 Referenciar Input
let input = document.querySelector('input[name=tarefa]');

// 2 Referenciar Botão
let btn = document.querySelector('#botao');

// 3 Referenciar Lista 
let lista = document.querySelector('#lista');

// CARD Global para duas funções (ELSE/REMOVER SPANS)
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas() {
    // Limpar toda a lista antes de adicionar o texto do input e renderizar
    lista.innerHTML = '';

    for (tarefa of tarefas) {

        // criar o item da lista
        let itemLista = document.createElement('li');

        // adicionar classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // adicionar evento de clique no item da lista
        itemLista.onclick = function () {
            deletarTarefa(this);
        }

        //criar um texto
        let itemTexto = document.createTextNode(tarefa);

        // adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // adicionar o item da lista na lista 
        lista.appendChild(itemLista)
    }

}

// Executando a função para renderizar as tarefas
renderizarTarefas();

// Tecla Enter no submit ***
document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        const btn = document.querySelector("#botao");

        btn.click();

    }
});

// 1 Precisamos 'escutar' o evento de click no botão
btn.onclick = function (e) {

    // 2 Precisamos capturar o valor digitado pelo usuário no input
    let novaTarefa = input.value;

    if (novaTarefa !== "") {

        // 3 Precisamos atualizar a nova tarefa na lista de tarefas e renderizar a tela
        tarefas.push(novaTarefa);

        // Executando a função para renderizar as tarefas
        renderizarTarefas();

        // Limpar o Input
        input.value = '';

        //remover todos os Spans 
        removerSpans();

        // salva os novos dados no banco de dados
        salvarDadosNoStorage();

    } else {
        //remover todos os Spans 
        removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Escreva uma tarefa !!');

        span.appendChild(msg);

        card.appendChild(span);

    }
}

function removerSpans() {
    let spans = document.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar) {

    //remover tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    // renderiza novamente a tela
    renderizarTarefas();

    // salva os novos dados no banco de dados
    salvarDadosNoStorage();
}

function salvarDadosNoStorage() {
    // todo navegador tem essa função
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}