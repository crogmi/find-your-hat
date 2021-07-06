const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(array) {
        this._field = array;
        this._status = false;
        this._index = 0;
        this._arrPosition = 0;
    }

    get field() {
        return this._field;
    }

    print() {
        console.log(this._field.map(x => x.join('')).join('\n'));
    }

    movePlayer() {
        let input = prompt('Which way?');

        switch(input) {
            case 'd':
                this._arrPosition++;
                break;
            case 'D':
                this._arrPosition++;
                break;
            case 'u':
                this._arrPosition--;
                break;
            case 'U':
                this._arrPosition--;
                break;
            case 'r':
                this._index++;
                break;
            case 'R':
                this._index++;
                break;
            case 'l':
                this._index--;
                break;
            case 'L':
               this._index--;
                break;
            default:
                console.log('Enter U, D, L, or R (not case sensitive).');
                this.movePlayer();
                break;
        }
    }

    winLoss() {
        let i = this._index;
        let p = this._arrPosition;
        if (i < 0 || p < 0) {
            console.log('Out of bounds!');
            this._status = true;
        } else if (this._field[p][i] === hat) {
            console.log('Winner!');
            this._status = true;
        } else if (this._field[p][i] === hole) {
            console.log('Sorry, you fell down a hole.');
            this._status = true;
        } else if (this._field[p][i] === fieldCharacter) {
            this._field[p][i] = pathCharacter;
        }
    }

    playGame() {
        while (!this._status) {
            this.print();
            this.movePlayer();
            this.winLoss();
        }
    }

    static generateField(h, w, percent) {
        let entireField =  [];
        const generator = [fieldCharacter, hole]
        let hatCount = 0;
        let maxHoles = h * w * percent;
        let genIndex = 0;
        let tile;
        for (let x = 0; x < h; x++) {
            let row = [];
            let rowHoles = 0;
            for (let y = 0; y < w; y++) {
                if (entireField.length < 1 && y === 0) {
                    row.push(pathCharacter);
                } else {
                    if (maxHoles !== 0 && rowHoles < (w * percent) && row[y - 1] !== hole && row[y - 1] !== pathCharacter) {
                        genIndex = Math.floor(Math.random()*2);
                        tile = generator[genIndex];
                    } else {
                        tile = fieldCharacter;
                    }
                    row.push(tile);
                    if (row.includes(hat)) {
                        hatCount++;
                    } else if (tile === hole) {
                        maxHoles--;
                        rowHoles++;
                    }
                }
            }
            entireField.push(row);
        }
        entireField[Math.floor(Math.random()*h)][Math.floor(Math.random()*w)] = hat;
        return entireField;
    }
}

const myField = new Field(Field.generateField(10, 10, 0.3));

myField.playGame();


