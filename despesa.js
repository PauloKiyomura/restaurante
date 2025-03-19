// Variáveis para armazenar despesas e fiados
const despesas = [];
const fiado = [];

// Função para registrar uma despesa
function registrarDespesa() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = new Date();
    const horario = data.toLocaleTimeString();
    const despesa = { descricao, valor, data: data.toLocaleDateString(), horario };

    despesas.push(despesa);
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    atualizarLista(despesas, 'despesasLista');
}

// Função para mostrar o relatório de despesas
function mostrarRelatorio() {
    let totalDespesas = despesas.reduce((acc, curr) => acc + curr.valor, 0);
    alert(`Total de Despesas: R$ ${totalDespesas.toFixed(2)}`);
}

// Função para atualizar a lista de despesas
function atualizarLista(lista, id) {
    const listaElement = document.getElementById(id);
    listaElement.innerHTML = '';
    lista.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.descricao} - R$ ${item.valor.toFixed(2)} - ${item.data} - ${item.horario}`;
        listaElement.appendChild(li);
    });
}

// Função para registrar fiado
function registrarFiado() {
    const descricao = document.getElementById('descricaoFiado').value;
    const valor = parseFloat(document.getElementById('valorFiado').value);
    const data = new Date();
    const horario = data.toLocaleTimeString();
    const fiadoItem = { descricao, valor, data: data.toLocaleDateString(), horario };

    fiado.push(fiadoItem);
    document.getElementById('descricaoFiado').value = '';
    document.getElementById('valorFiado').value = '';
    atualizarListaFiado();
}

// Função para atualizar a lista de fiados
function atualizarListaFiado() {
    const listaElement = document.getElementById('fiadoLista');
    listaElement.innerHTML = '';
    fiado.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.descricao} - R$ ${item.valor.toFixed(2)} - ${item.data} - ${item.horario}`;
        listaElement.appendChild(li);
    });
}
