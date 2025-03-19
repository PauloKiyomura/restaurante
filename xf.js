// Variáveis para armazenar despesas e fiados
const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
const fiado = JSON.parse(localStorage.getItem('fiado')) || []; // Adicionando o array de fiado

// Função para registrar uma despesa
function registrarDespesa() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = new Date();
    const horario = data.toLocaleTimeString();
    const despesa = { descricao, valor, data: data.toLocaleDateString(), horario, ano: data.getFullYear(), mes: (data.getMonth() + 1).toString().padStart(2, '0') };

    despesas.push(despesa);
    localStorage.setItem('despesas', JSON.stringify(despesas));

    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
    atualizarLista(despesas, 'despesasLista');
}

// Função para registrar um fiado
function registrarFiado() {
    const descricao = document.getElementById('descricaoFiado').value;
    const valor = parseFloat(document.getElementById('valorFiado').value);
    const data = new Date();
    const horario = data.toLocaleTimeString();
    const fiadoItem = { descricao, valor, data: data.toLocaleDateString(), horario, ano: data.getFullYear(), mes: (data.getMonth() + 1).toString().padStart(2, '0') };

    fiado.push(fiadoItem);
    localStorage.setItem('fiado', JSON.stringify(fiado));

    document.getElementById('descricaoFiado').value = '';
    document.getElementById('valorFiado').value = '';
    atualizarLista(fiado, 'fiadoLista');
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

// Função para filtrar o relatório
function filtrarRelatorio() {
    const filtroAno = document.getElementById('filtroAno').value;
    const filtroMes = document.getElementById('filtroMes').value;

    const despesasFiltradas = despesas.filter(despesa => despesa.ano == filtroAno && despesa.mes == filtroMes);
    mostrarRelatorio(despesasFiltradas);
}

// Função para mostrar o relatório na página de Relatório
function mostrarRelatorio(despesasParaMostrar = despesas) {
    const relatorioLista = document.getElementById('relatorioLista');
    relatorioLista.innerHTML = '';

    despesasParaMostrar.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.descricao} - R$ ${item.valor.toFixed(2)} - ${item.data} - ${item.horario}`;
        relatorioLista.appendChild(li);
    });
}

// Exibindo o relatório ao carregar a página de Relatório
if (document.getElementById('relatorioLista')) {
    mostrarRelatorio();
}

// Função para filtrar despesas por ano e mês
function filtrarDespesasPorAnoEMes(ano, mes) {
    let despesas = JSON.parse(localStorage.getItem("despesas")) || [];
    const despesasFiltradas = despesas.filter(despesa => despesa.ano == ano && despesa.mes == mes);

    // Exibe as despesas filtradas
    const listaDespesas = document.getElementById("relatorioLista");
    listaDespesas.innerHTML = ""; // Limpa a lista antes de adicionar novos itens

    if (despesasFiltradas.length === 0) {
        listaDespesas.innerHTML = "<li>Nenhuma despesa encontrada para esse mês e ano.</li>";
    } else {
        despesasFiltradas.forEach(despesa => {
            const item = document.createElement("li");
            item.innerHTML = `
                <strong>Nome:</strong> ${despesa.descricao} <br>
                <strong>Valor:</strong> R$ ${despesa.valor.toFixed(2)} <br>
                <strong>Data:</strong> ${despesa.data} <br>
                <strong>Hora:</strong> ${despesa.horario} <br>
            `;
            listaDespesas.appendChild(item);
        });
    }
}

// Chama a função ao selecionar um ano e mês
document.getElementById("filtroAno").addEventListener("change", function() {
    const anoSelecionado = this.value;
    const mesSelecionado = document.getElementById("filtroMes").value;
    filtrarDespesasPorAnoEMes(anoSelecionado, mesSelecionado);
});

document.getElementById("filtroMes").addEventListener("change", function() {
    const anoSelecionado = document.getElementById("filtroAno").value;
    const mesSelecionado = this.value;
    filtrarDespesasPorAnoEMes(anoSelecionado, mesSelecionado);
});
