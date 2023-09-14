let tarefas = [];

let lista = document.querySelector('.lista');
let texto = document.getElementById('texto');
let tarefa;

let i = 0;

texto.addEventListener('keypress', function (e) {
    console.log(e);
    if (e.code == "NumpadEnter" || e.code == "Enter") {
        salvar();
    }
});

function iniciar() {

    if (localStorage.hasOwnProperty('tarefas')) {

        tarefas = JSON.parse(localStorage.getItem('tarefas'));

        for (let f = 0; tarefas.length > f; f++) {
            tarefa = document.createElement('li');
            tarefa.innerHTML = `${tarefas[f].texto} ${tarefas[f].botao}`;
            lista.appendChild(tarefa);
        }

        // pega a última tarefa da lista salva no navegador
        i = tarefas[tarefas.length - 1].id + 1;
    }

}

function salvar() {
    if (!texto.value) return;

    tarefa = {
        texto: texto.value,
        botao: `<button class="botaoLixeira" type="button"
        onclick="excluir(${i})"><img class="lixeira" src="assets/img/lixeira-de-reciclagem.png"></button>`,
        id: i
    };

    tarefas.push(tarefa);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    texto.value = "";

    i++;

    lista.innerHTML = "";

    for (let j = 0; tarefas.length > j; j++) {
        tarefa = document.createElement('li');
        tarefa.innerHTML = `${tarefas[j].texto} ${tarefas[j].botao}`;
        lista.appendChild(tarefa);
    }

    texto.focus();
}

function excluir(id) {
    localStorage.clear();

    let index;
    for (const tarefa of tarefas) {
        if (tarefa.id == id) {
            index = tarefas.indexOf(tarefa);
        }
    }

    tarefas.splice(index, 1);

    lista.innerHTML = "";

    for (let j = 0; tarefas.length > j; j++) {
        tarefa = document.createElement('li');
        tarefa.innerHTML = `${tarefas[j].texto} ${tarefas[j].botao}`;
        lista.appendChild(tarefa);
    };

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    texto.focus();
}

function apagarTudo() {
    if (tarefas.length == 0) {
        alert("Tá tentando apagar o quê colega? Tem nada aí não.");
        return
    }
    let confirmar = confirm("Deseja apagar hein? TUDO? HEIN?");
    if (confirmar) {
        lista.innerHTML = "";
        localStorage.clear();
        location.reload();
    }
    texto.focus();
    return
}

iniciar();