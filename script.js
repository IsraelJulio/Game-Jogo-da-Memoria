const cards = document.querySelectorAll('.card');
let acertos = 0;
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let tentativas = 0;
let atualRecord = localStorage.record ?? 0;
let tentativasHTML = document.getElementById("pontos")
let recordHTML = document.getElementById("record")
//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    tentativas++;
    tentativasHTML.innerHTML = tentativas;
    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        acertos = acertos+2;
        if(acertos == cards.length){
            debugger;
            if(atualRecord > tentativas ||(atualRecord == 0)){
                atualRecord = tentativas;
                recordHTML.innerHTML = tentativas;
                localStorage.record = tentativas
                finalizePartida(true)
                return;
            }
            finalizePartida(false);
        }
        return;
    }

    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

(function inicialisaPlacares(){
    tentativasHTML.innerHTML = tentativas;
    recordHTML.innerHTML = atualRecord;
    // iniciaModal('modal-fim',true)
})();

function finalizePartida(newrecord){
    iniciaModal('modal-fim',newrecord)
    return
}

function iniciaModal(modalID,newrecord) {
    
        const modal = document.getElementById(modalID);
        if(modal) {

            document.getElementById("tentativasFinais").innerHTML = tentativas;
            document.getElementById("novorecord").style.display = "flex";
            modal.classList.add('mostrar');            
            modal.addEventListener('click', (e) => {
                if(e.target.className == 'button'){
                    reiniciarPartida();
                }
                if(e.target.id == modalID || e.target.className == 'fechar') {
                    modal.classList.remove('mostrar');                    
                    document.getElementById(novorecord).style.display = "none";                   
                }
            });
        }
    
}
document.addEventListener('scroll', () => {
    if(window.pageYOffset > 800) {
        iniciaModal('modal-promocao')
    }
})

function reiniciarPartida(){
     document.location.reload(false);
}
