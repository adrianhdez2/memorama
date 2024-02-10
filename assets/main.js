const container_cards = document.querySelector('.container_cards');
const items = [
    '🎀', '🌹', '🎁', '🎉', '🎃', '🎨'
];
let tablero = [...items, ...items];
let selected_cards = [];
const audio = new Audio();
audio.src = 'assets/sounds/victory.mp3';
audio.volume = 0.3;

window.addEventListener("DOMContentLoaded", loadGame);

function loadGame() {
    tablero = tablero.sort(randomNumber);
    let inner = '';
    tablero.forEach((item, index) => {
        inner += `
            <button class="card" data-flipped="false">
                <h1>?</h1>
            </button>
            `;
    });

    container_cards.innerHTML = inner;
    buttons();
}

function randomNumber() {
    return Math.random() - 0.5;
}

function buttons() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            const button = card.querySelector('h1');
            const isFlipped = card.getAttribute('data-flipped') === 'true';

            if (!isFlipped && selected_cards.indexOf(index) === -1) {
                card.classList.toggle('rotate');
                button.classList.toggle('rotate');
                selected_cards.push(index);

                if (selected_cards.length > 2) {
                    return;
                }

                setTimeout(() => {
                    button.textContent = tablero[index];
                }, 250);

                if (selected_cards.length === 2) {
                    validar(cards);
                }
            }
        });
    });
}

function validar(cards) {
    const [i1, i2] = selected_cards;
    let all = 0;

    if (tablero[i1] === tablero[i2]) {
        audio.pause();
        cards[i1].setAttribute("data-flipped", "true");
        cards[i2].setAttribute("data-flipped", "true");
    } else {
        setTimeout(() => {
            cards[i1].classList.toggle('rotate');
            cards[i2].classList.toggle('rotate');
            cards[i1].querySelector('h1').classList.toggle('rotate');
            cards[i2].querySelector('h1').classList.toggle('rotate');
            cards[i1].querySelector('h1').textContent = "?";
            cards[i2].querySelector('h1').textContent = "?";
        }, 750);
    }
    selected_cards = [];

    for (let i = 0; i < cards.length; i++) {
        if (cards[i].getAttribute('data-flipped') === 'true') {
            all += 1;
        }
    }
    if (all === cards.length) {
        audio.play();
        setTimeout(reload(cards), 5000);
    }
}

function reload(cards) {
    let time = 500;
    cards.forEach(card => {
        setTimeout(() => {
            card.classList.toggle('rotate');
            card.querySelector('h1').textContent = "?";
            card.querySelector('h1').classList.toggle('rotate');
            card.setAttribute("data-flipped", "false");
        }, time)
        time += 100;
    })
    setTimeout(loadGame, time);
}