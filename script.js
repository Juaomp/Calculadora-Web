document.addEventListener('DOMContentLoaded', () => {

    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.buttons button');

    // Adiciona um evento de clique para cada botão da calculadora.
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.id;
            const value = button.dataset.value;

            if (id === 'clear') {
                display.value = '';
            
            } else if (id === 'equals') {
                try {
                    // Função para calcular o resultado.
                    const result = calculate(display.value);
                    display.value = result;
                } catch {
                    // Se a expressão for inválida, mostra 'Erro'.
                    display.value = 'Erro';
                }

            } else {
                display.value += value;
            }
        });
    });
});

// Função para calcular a expressão matemática.
function calculate(expression) {
    // Separa a string em números e operadores.
    const tokens = expression.split(/([+\-*/])/).filter(token => token.trim() !== '');

    const numbers = tokens.filter(token => !isNaN(parseFloat(token))).map(parseFloat);
    const operators = tokens.filter(token => isNaN(parseFloat(token)));

    // --- Multiplicação e Divisão ---
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            const left = numbers[i];
            const right = numbers[i + 1];
            const operator = operators[i];
            
            let result;
            if (operator === '*') {
                result = left * right;
            } else {
                // Prevenção de divisão por zero
                if (right === 0) throw new Error("Divisão por zero");
                result = left / right;
            }
            
            // Atualiza os arrays: remove os números e o operador usados e insere o resultado.
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            
            // Como modificamos o array, precisamos voltar o índice para re-avaliar.
            i--; 
        }
    }

    // --- Soma e Subtração ---
    let finalResult = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        const right = numbers[i + 1];
        const operator = operators[i];

        if (operator === '+') {
            finalResult += right;
        } else if (operator === '-') {
            finalResult -= right;
        }
    }

    return finalResult;
}