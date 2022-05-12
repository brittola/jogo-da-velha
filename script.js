//declaração de variáveis
let table = document.getElementById('table');
let outResult = document.getElementById('outResult');
let btRestart = document.getElementById('btRestart');

let positions = [
    '', '', '',
    '', '', '',
    '', '', ''
]

let player = 'X';
let count = 0;
let winner = false;

//criação dos quadrados do tabuleiro ao iniciar a página
for(i = 0; i < 9; i++){
    let newSquare = document.createElement('div');
    newSquare.setAttribute('id', i);
    newSquare.className = 'square';
    newSquare.addEventListener('click', markSquare);
    table.appendChild(newSquare);
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
    }

    checkWinX();
    checkWinO();
    
    if(winner){
        congratsWinner(player);
    }else{
        checkDraw();
    }

    player == 'X' ? player = 'O' : player = 'X';
}

//checa todas as possibilidades de vitória com 'X'
//se alguma for verdadeira, altera o valor da variável winner
function checkWinX() {
    if(positions[0] == 'X' && positions[1] == 'X' && positions[2] == 'X'){
        winner = true;
    }else if(positions[3] == 'X' && positions[4] == 'X' && positions[5] == 'X'){
        winner = true;
    }else if(positions[6] == 'X' && positions[7] == 'X' && positions[8] == 'X'){
        winner = true;
    }else if(positions[0] == 'X' && positions[3] == 'X' && positions[6] == 'X'){
        winner = true;
    }else if(positions[1] == 'X' && positions[4] == 'X' && positions[7] == 'X'){
        winner = true;
    }else if(positions[2] == 'X' && positions[5] == 'X' && positions[8] == 'X'){
        winner = true;
    }else if(positions[0] == 'X' && positions[4] == 'X' && positions[8] == 'X'){
        winner = true;
    }else if(positions[2] == 'X' && positions[4] == 'X' && positions[6] == 'X'){
        winner = true;
    }
}

//checa todas as possibilidades de vitória com 'O'
//se alguma for verdadeira, altera o valor da variável winner
function checkWinO() {
    if(positions[0] == 'O' && positions[1] == 'O' && positions[2] == 'O'){
        winner = true;
    }else if(positions[3] == 'O' && positions[4] == 'O' && positions[5] == 'O'){
        winner = true;
    }else if(positions[6] == 'O' && positions[7] == 'O' && positions[8] == 'O'){
        winner = true;
    }else if(positions[0] == 'O' && positions[3] == 'O' && positions[6] == 'O'){
        winner = true;
    }else if(positions[1] == 'O' && positions[4] == 'O' && positions[7] == 'O'){
        winner = true;
    }else if(positions[2] == 'O' && positions[5] == 'O' && positions[8] == 'O'){
        winner = true;
    }else if(positions[0] == 'O' && positions[4] == 'O' && positions[8] == 'O'){
        winner = true;
    }else if(positions[2] == 'O' && positions[4] == 'O' && positions[6] == 'O'){
        winner = true;
    }
}

//checa empate baseado no número de jogada e no status da variável winner
function checkDraw() {
    if(count == 9 && !winner){
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

//adiciona a função de recarregar a página para o botão de jogar novamente
btRestart.addEventListener('click', function(){
    location.reload();
});