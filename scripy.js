const inputTarefa = document.querySelector('.input-add-nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    //o const li é de funções diferentes,entao pode ser usado o NOME em funções diferentes
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limparInput();
    criabotaoLimpar(li);
    salvarTarefas();
}

function limparInput(textoInput) {
    inputTarefa.value = '';
    inputTarefa.focus();
}

//cria função para criar um botao para limpar uma tarefa
//chama o li com paramentro pq vai usar ele para limpar
function criabotaoLimpar(li) {
    li.innerHTML += ' ';
    const botaoLimpar = document.createElement('button');
    botaoLimpar.innerHTML = 'Apagar';
    botaoLimpar.setAttribute('class', 'apagar');
    // add o botao no li
    li.appendChild(botaoLimpar);
}

inputTarefa.addEventListener('keypress', function(e){
    //codigo para a tecla ENTER
    if (e.keyCode === 13) {
        if (!inputTarefa.value) {
            return; 
        }
        criaTarefa(inputTarefa.value);
}});

btnTarefa.addEventListener('click', function(e){
    //qnd clica no botao, pega o texto do inputTarefa e joga na função criaTarefa
    //se o input n tiver vazio ai ele cria a tarefa
    if (!inputTarefa.value) {
        return; 
    }
    //se n tiver vazio, retorna o valor desse input
    criaTarefa(inputTarefa.value);
});

//criar o evento apagar
//pega o evento click do documento e vai identificar qual foi a clasee target clicada
document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')) {
        //para remover apaga o elemento pai
        el.parentElement.remove();
        //salvar qnd apagar as tarefas tb
        salvarTarefas();
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        //tirar o nome do botao apagar na hora de salvar
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); //remover espaço
        listaTarefas.push(tarefaTexto);

        const tarefasJSON = JSON.stringify(listaTarefas);
        localStorage.setItem('tarefas', tarefasJSON);
    }
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    //transforma o JSON em array
    const listaTarefas = JSON.parse(tarefas);

    for (let tarefa of listaTarefas){
        criaTarefa(tarefa);
    }
}

addTarefasSalvas();