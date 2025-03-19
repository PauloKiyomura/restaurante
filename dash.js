// script.js
document.addEventListener("DOMContentLoaded", function() {
    let valorTotal = 0;
    let ultimaSelecao = null;  // Variável para armazenar o último item adicionado
    const valorTotalElement = document.getElementById("valorTotal");
    const resumoVenda = document.getElementById("resumoVenda");
    
    // Adiciona o evento de clique nos botões de escolha
    const botoes = document.querySelectorAll(".opcao");
    botoes.forEach(function(botao) {
        botao.addEventListener("click", function() {
            const preco = parseFloat(botao.getAttribute("data-preco"));
            const quantidade = parseInt(document.getElementById("quantidade").value);
            const nome = botao.getAttribute("data-nome");
            
            // Armazena a última seleção para correção
            ultimaSelecao = { preco, quantidade, nome };

            // Adiciona o valor ao total
            valorTotal += preco * quantidade;
            valorTotalElement.textContent = valorTotal.toFixed(2);

            // Adiciona o item ao resumo de vendas
            const itemVenda = document.createElement("li");
            itemVenda.textContent = `${quantidade}x ${nome} - R$ ${(preco * quantidade).toFixed(2)}`;
            resumoVenda.appendChild(itemVenda);
        });
    });

    // Botão para corrigir a última seleção
    document.getElementById("corrigir").addEventListener("click", function() {
        if (ultimaSelecao) {
            // Subtrai o valor da última seleção
            valorTotal -= ultimaSelecao.preco * ultimaSelecao.quantidade;
            valorTotalElement.textContent = valorTotal.toFixed(2);

            // Remove a última venda do resumo
            const itens = resumoVenda.getElementsByTagName("li");
            if (itens.length > 0) {
                resumoVenda.removeChild(itens[itens.length - 1]);
            }
        }
    });

    // Botão de finalizar
    document.getElementById("finalizar").addEventListener("click", function() {
        alert(`Pedido finalizado! Valor Total: R$ ${valorTotal.toFixed(2)}`);
        valorTotal = 0; // Resetar o valor total após finalizar
        valorTotalElement.textContent = valorTotal.toFixed(2);
        resumoVenda.innerHTML = ''; // Limpa o resumo
    });
});
