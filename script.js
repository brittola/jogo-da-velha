//declaração de variáveis
let table = document.getElementById('table');
let outResult = document.getElementById('outResult');
let btRestart = document.getElementById('btRestart');

let positions;
let player;
let count;
let winner;
let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//função para atribuir valores iniciais das variáveis e construir o tabuleiro
function startGame(){

    resetValues();
    
    buildTable();
}

function resetValues(){
    positions = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    player = 'X';
    count = 0;
    winner = false;

    
    outResult.textContent = '';
    btRestart.style.display = 'none';
}

//se já estiver construído, apaga o tabuleiro e então constrói
function buildTable(){
    if(table.getElementsByTagName('div').length != 0){
        for(i = 8; i >= 0; i--){
            table.removeChild(table.getElementsByTagName('div')[i]);
        }
    }

    for(i = 0; i < 9; i++){
        let newSquare = document.createElement('div');
        newSquare.setAttribute('id', i);
        newSquare.className = 'square';
        newSquare.addEventListener('click', markSquare);
        table.appendChild(newSquare);
    }
}

//função para marcar o quadrado clicado e registrar no array positions
function markSquare(event) {
    let squareClicked = event.target.id;

    if(positions[squareClicked] == ''){
        positions[squareClicked] = player;
        event.target.innerHTML = `<h1>${player}</h1>`;
        count++;
    }else{
        alert('Este quadrado já foi clicado.');
        return;
    }

    checkWin(player);
    
    if(winner){
        congratsWinner(player);
    }else{
        checkDraw();
    }

    player == 'X' ? player = 'O' : player = 'X';
}

//checa todas as possibilidades de vitória com o player atual
//se alguma for verdadeira, altera o valor da variável winner
function checkWin(currentPlayer) {
    for(i = 0; i < winCombinations.length; i++){
        if(positions[winCombinations[i][0]] == currentPlayer &&
            positions[winCombinations[i][1]] == currentPlayer &&
            positions[winCombinations[i][2]] == currentPlayer){
                winner = true;
        }
    }
}

//checa empate baseado no número de jogada e no status da variável winner
function checkDraw() {
    if(count == 9){
        outResult.style.color = 'red';
        outResult.textContent = 'Vish... Vocês empataram.';
        btRestart.style.display = 'block';

        disableSquares();
    }
}

//parabeniza o vencedor da partida
function congratsWinner(winnerPlayer){
    outResult.style.color = 'greenyellow';
    outResult.textContent = `O jogo acabou! Vencedor: ${winnerPlayer}`;
    btRestart.style.display = 'block';

    disableSquares();
}

//remove a função markSquare de todos os quadrados do tabuleiro
function disableSquares() {
    let squares = table.getElementsByTagName('div');

    for(i = 0; i < 9; i++){
        squares[i].removeEventListener('click', markSquare);
    }
}

startGame();

//adiciona a função de recarregar a página para o botão de jogar novamente
btRestart.addEventListener('click', startGame);
