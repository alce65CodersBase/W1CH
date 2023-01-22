import { arrayLetters } from './data.letters.js';
import { questionsCollections } from './data.questions.js';
import { STATE_OK, STATE_ERROR, STATE_PENDING } from './data.states.js';

export class Game {
    /**
     * Crea el objeto game, incluyendo letters, con todas las Q/A
     * @param {string} user
     * @returns object
     */
    constructor(user) {
        this.user = user;
        this.points = 0;
        this.errors = 0;
        this.letters = [...arrayLetters];
        this.lettersInfo = this.#createLettersList();
        this.pending = Object.entries(this.lettersInfo).length;
        this.feedbackMessage = '';
        this.lastLetter = '';
        this.actualLetter = 'A';
    }

    /**
     * Crea la lista de todos los objetos de datos de las letras
     * @returns Array<objects>
     */
    #createLettersList() {
        const letters = {};
        arrayLetters.forEach((letter) => {
            letters[letter] = this.#createLetterInfo(letter);
        });
        return letters;
    }

    /**
     * Crea el objeto de datos de una letra (q/A)
     * a partir de las colecciones Q/A disponibles
     * @param {string} letter
     * @returns object
     */
    #createLetterInfo(letter) {
        const min = 1;
        const max = 2;
        const collectionNumber = Math.round(Math.random() * (max - min) + min);
        const data = questionsCollections[collectionNumber][letter];
        return { ...data, state: STATE_PENDING };
    }

    /**
     * Elimina diacríticos: acentos y ü
     * @param {string} text
     * @returns {string}
     */
    #lowerNoTiles(text) {
        return text
            .toLocaleLowerCase()
            .normalize('NFD')
            .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
            .normalize();
    }

    /**
     * Comprueba si una respuesta es correcta y
     * actualiza los datos del objeto game
     * @param { string } answer
     * @param { string } lastLetter
     * @param { object } game
     *
     */
    #checkAnswer = (answer) => {
        // if (
        //     this.#lowerNoTiles(answer) === '' ||
        //     this.#lowerNoTiles(answer) === 'paso' ||
        //     this.#lowerNoTiles(answer) === 'pasapalabra'
        // ) {
        //     return false;
        // }
        if (
            this.#lowerNoTiles(answer) ===
            this.#lowerNoTiles(this.lettersInfo[this.lastLetter].answer)
        ) {
            this.points++;
            this.feedbackMessage = `Muy bien ${this.user}, sigue así`;
            this.lettersInfo[this.lastLetter].state = STATE_OK;
        } else {
            this.errors++;
            this.feedbackMessage = `Oh,  la respuesta erá ${
                this.lettersInfo[this.lastLetter].answer
            }`;
            this.lettersInfo[this.lastLetter].state = STATE_ERROR;
        }
        this.pending--;
    };

    provideQuestion() {
        const letter = this.actualLetter.toLocaleLowerCase();
        return [
            this.lettersInfo[letter].hint,
            this.lettersInfo[letter].question,
        ];
    }

    /**
     * Presenta en el UI las sucesivas cuestiones
     * y recoge la respuestas del usuario
     * @param { object } game
     * @param { Array<strings> } letters
     * @returns boolean
     */
    playRound(answer) {
        this.lastLetter = this.actualLetter.toLocaleLowerCase();
        const indexLetter = this.letters.findIndex(
            (item) =>
                item.toLocaleLowerCase() === this.lastLetter.toLocaleLowerCase()
        );

        const nextLetter = this.letters[indexLetter + 1];
        this.feedbackMessage = 'Pasaste palabra';
        if (answer) {
            this.#checkAnswer(answer);
            this.letters = this.letters.filter(
                (item) =>
                    item.toLocaleLowerCase() !==
                    this.actualLetter.toLocaleLowerCase()
            );
        }
        this.actualLetter = nextLetter;
        console.log(this.feedbackMessage);
        console.log(this);
    }

    /**
     * Muestra en el UI la información final del juego
     * @param {object} game
     */
    finalInfo() {
        const uiMessages = [
            '------------------------------------',
            `Muy bien ${this.user}`,
            `Preguntas pendientes ${this.pending}`,
            `Respuestas acertadas ${this.points}`,
            `Respuestas incorrectas ${this.errors}`,
        ];
        uiMessages.forEach((msg) => console.log(msg));
    }
}
