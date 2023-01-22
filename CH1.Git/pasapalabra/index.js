import { arrayLetters } from './data.letters.js';
import { Game } from './game.js';
import { STATE_OK, STATE_ERROR } from './data.states.js';

const main = () => {
    // Not DOM variables
    let game = {};

    // document HTML Nodes
    const infoSlot = document.querySelector('.info-slot');
    const infoTemplate = document.querySelector('.template-info');
    const initialForm = document.querySelector('.initial-form');
    const mainButtonsDiv = document.querySelector('.main-buttons');
    const infoButton = document.querySelector(
        '.main-buttons button:nth-of-type(1)'
    );
    const infoDlg = document.querySelector('.info-dlg');
    const closeButton = document.querySelector('.info-dlg button');
    const dlgSlot = document.querySelector('.info-dlg slot');
    const circleSlot = document.querySelector('.circle-slot');
    const controlsSlot = document.querySelector('.controls-slot');
    const circleTemplate = document.querySelector('.template-circle');
    const controlsTemplate = document.querySelector('.template-controls');

    // Nodes inside templates for posterior redefinition
    let controlForm = controlsTemplate.content.querySelector('.control-form');
    let pasaButton = controlsTemplate.content.querySelector(
        '.control-buttons button:nth-of-type(2)'
    );
    let inputAnswer = controlsTemplate.content.querySelector(
        '.control-form input'
    );

    const renderQuestion = () => {
        const [hint, question] = game.provideQuestion();
        const outputHint = document.querySelector('.output-hint');
        const outputDefinition = document.querySelector('.output-definition');
        outputHint.value = hint;
        outputDefinition.value = question;
    };

    const renderControls = () => {
        controlsSlot.appendChild(controlsTemplate.content.cloneNode(true));

        // Redefinition of HTML Nodes after template renderization
        controlForm = document.querySelector('.control-form');
        pasaButton = document.querySelector(
            '.control-buttons button:nth-of-type(2)'
        );
        inputAnswer = document.querySelector('.control-form input');

        // event listeners
        controlForm.addEventListener('submit', (ev) => {
            gameNext(ev, false);
        });
        pasaButton.addEventListener('click', (ev) => {
            gameNext(ev, true);
        });
        inputAnswer.addEventListener('keyup', (ev) => {
            if (ev.code === 'Space') {
                gameNext(ev, true);
            }
        });
    };

    const renderCircle = () => {
        let letterList = '';
        arrayLetters.forEach(
            (item) =>
                (letterList += `
        <li class='item ${item}'>${item.toLocaleUpperCase()}</li>`)
        );
        document.querySelector('ul.circle').innerHTML = letterList;
        document
            .querySelector(`li.${game.actualLetter.toLocaleLowerCase()}`)
            .classList.toggle('select-letter');
    };

    // event handlers
    /**
     * Handler del evento submit del formulario inicial
     * @param {Event} ev
     */
    const startGame = (ev) => {
        ev.preventDefault();

        infoSlot.innerHTML = '';
        const userName = ev.target.querySelector('input').value;
        game = new Game(userName);
        initialForm.reset();
        initialForm.hidden = true;
        mainButtonsDiv.hidden = false;
        circleSlot.appendChild(circleTemplate.content.cloneNode(true));
        renderCircle();
        renderControls();
        renderQuestion();
    };

    const showInfo = () => {
        infoDlg.showModal();
        dlgSlot.appendChild(infoTemplate.content.cloneNode(true));
    };

    const closeInfo = () => {
        infoDlg.close();
        dlgSlot.innerHTML = '';
    };

    const updateScreenLetters = (pasaPalabra) => {
        const previousItem = document.querySelector('li.' + game.lastLetter);
        const nextItem = document.querySelector('li.' + game.actualLetter);
        // change previous letter

        previousItem.classList.toggle('select-letter');
        // select actual letter

        nextItem.classList.toggle('select-letter');
        if (pasaPalabra) {
            return;
        }
        console.dir(previousItem);

        if (game.lettersInfo[game.lastLetter].state === STATE_OK) {
            previousItem.classList.add('hit-letter');
        }
        if (game.lettersInfo[game.lastLetter].state === STATE_ERROR) {
            previousItem.classList.add('miss-letter');
        }
    };

    const gameNext = (ev, pasaPalabra) => {
        ev.preventDefault();
        if (pasaPalabra) {
            console.log('PasaPalabra');
            game.playRound(null);
            updateScreenLetters(true);
        } else {
            const answer = inputAnswer.value;
            if (!answer) {
                return;
            }
            console.log(answer);
            game.playRound(answer);
            updateScreenLetters(false);
        }
        controlForm.reset();
        renderQuestion();
    };

    // event listeners

    initialForm.addEventListener('submit', startGame);
    infoButton.addEventListener('click', showInfo);
    closeButton.addEventListener('click', closeInfo);

    // Initial rendering
    infoSlot.appendChild(infoTemplate.content.cloneNode(true));
};

document.addEventListener('DOMContentLoaded', main);

// const main = () => {
//     game.finalInfo();
// };
