import {CellulaState} from "./CellulaState.js";
import {Point} from "./Point.js";
import {getChords, getScale} from "./utilsChord.js";
import {contaVicini, generaConfigurazioneCasuale, creaGioco, nmod, sleep, resetTable} from "./utilsForCca.js";

let row =  11;
let col = 30;
let p = 12;
let t =  1;

const color = ['gray', '#E8AEB7', '#B8E1FF', '#A9FFF7', '#94FBAB', '#F4EBD9',
    '#6BF178', '#F5B700', '#008BF8', '#4F759B', '#4ECDC4', '#F038FF'];
const durate = ['2n', '4n']
const timeOfDurate = [1000, 500]

let note = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']

let chords = [
    ["C3", "E3", "G3"],
    ["F3", "A3", "C4"],
    ["G3","Bb3", "D3"]
]

let array = new Array(row);

for(let i = 0; i < row; i++){
    array[i] = new Array(col);
}

for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        array[i][j] = new CellulaState(p);
    }
}

let pLabel = document.getElementById("p-label");
pLabel.innerText = "p = " + p;

let tLabel = document.getElementById("t-label");
tLabel.innerText = "t = " + t;

let button = document.getElementById('generate-button');
button.addEventListener('click', function (){
    generaConfigurazioneCasuale(array, row, col, p, color);});

let timeout;
let playMusic = true;

let checkbox = document.getElementById('music-play');

checkbox.addEventListener('click',function (){playMusic = checkbox.checked;});

creaGioco(row, col, cambiaStato, starter, stoppaGioco)


function starter(){
    let btn  = document.getElementById('avvia-button');
    btn.setAttribute('disabled', 'true');
    checkbox.setAttribute('disabled', 'true')
    stop  = false;

    let tonalita =  document.getElementById('tonalita');
    note =  getScale(tonalita.value);
    chords =  getChords(tonalita.value);

    tonalita.setAttribute("disabled", "disabled");
    let instrument1 =  document.getElementById('instrument1');
    let instrument2 =  document.getElementById('instrument2');

    instrument1.setAttribute("disabled", "disabled");
    instrument2.setAttribute("disabled", "disabled");
    avviaGioco();
}

function avviaGioco(){
    let celleDaEvolvere = [];

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            console.log((array[i][j].getState() + 1)%p)
            let vicini = contaVicini(array, i, j, (array[i][j].getState() + 1)%p, row, col);
            if(vicini >= t){
                celleDaEvolvere.push(new Point(i,j));
            }
        }
    }

    aggiornaArray(celleDaEvolvere);

    if(playMusic)
        suonaAll();
    else
        timeout =  setTimeout(avviaGioco, 200);
}

function stoppaGioco(){
    let btn  = document.getElementById('avvia-button');
    let checkbox =  document.getElementById('music-play');
    stop = true;
    btn.removeAttribute('disabled');
    checkbox.removeAttribute('disabled');

    let tonalita =  document.getElementById('tonalita');
    tonalita.removeAttribute("disabled");

    let instrument1 =  document.getElementById('instrument1');
    let instrument2 =  document.getElementById('instrument2');

    instrument1.removeAttribute("disabled");
    instrument2.removeAttribute("disabled");


    clearTimeout(timeout);
}


function aggiornaArray(celleDaAttivare){
    for(let elem of celleDaAttivare){
        let statoAttuale = array[elem.i][elem.j].getState();
        let nuovoStato =  (statoAttuale + 1) % p;

        array[elem.i][elem.j].setState(nuovoStato);

        let td = document.getElementById(elem.i + '-' + elem.j);

        td.style.background = color[nuovoStato];

    }
}
async function suonaAll() {
    let tonalita = document.getElementById('tonalita').value;
    let instrument1 =  document.getElementById('instrument1').value;
    let instrument2 =  document.getElementById('instrument2').value;

    let instruments = [instrument1, instrument2];
    note =  getScale(tonalita);
    chords =  getChords(tonalita);

    complete[0] = false;
    complete[1] = false;

    for(let i = 0; i < instruments.length; i++){
        let init =  i==0 ? 0 :  Math.floor(row/2);
        let rowEnd =  i == 0 ? Math.floor(row/2) : row;

        switch (instruments[i]){
            case "clarinet":
                const clarinet = new Tone.Sampler({
                    urls: {
                        'A#3': 'As3.mp3',
                        'A#4': 'As4.mp3',
                        'A#5': 'As5.mp3',
                        'D3': 'D3.mp3',
                        'D4': 'D4.mp3',
                        'D5': 'D5.mp3',
                        'D6': 'D6.mp3',
                        'F3': 'F3.mp3',
                        'F4': 'F4.mp3',
                        'F5': 'F5.mp3',
                        'F#6': 'Fs6.mp3'
                    },
                    onload: () => suona(init, 0, clarinet, rowEnd, init),
                    baseUrl: "./instruments/clarinet/"
                }).toDestination();
                break;
            case  'flute':
                const flute = new Tone.Sampler({
                    urls: {
                        'A4': 'A4.mp3',
                        'A5': 'A5.mp3',
                        'A6': 'A6.mp3',
                        'C4': 'C4.mp3',
                        'C5': 'C5.mp3',
                        'C6': 'C6.mp3',
                        'C7': 'C7.mp3',
                        'E4': 'E4.mp3',
                        'E5': 'E5.mp3',
                        'E6': 'E6.mp3'
                    },
                    onload: () => suona(init, 0, flute, rowEnd, init),
                    baseUrl: "./instruments/flute/"
                }).toDestination();
                break;
            case 'saxophone':
                const sax = new Tone.Sampler({
                    urls: {
                        'A4': 'A4.mp3',
                        'A5': 'A5.mp3',
                        'A#3': 'As3.mp3',
                        'A#4': 'As4.mp3',
                        'B3': 'B3.mp3',
                        'B4': 'B4.mp3',
                        'C4': 'C4.mp3',
                        'C5': 'C5.mp3',
                        'C#3': 'Cs3.mp3',
                        'C#4': 'Cs4.mp3',
                        'C#5': 'Cs5.mp3',
                        'D3': 'D3.mp3',
                        'D4': 'D4.mp3',
                        'D5': 'D5.mp3',
                        'D#3': 'Ds3.mp3',
                        'D#4': 'Ds4.mp3',
                        'D#5': 'Ds5.mp3',
                        'E3': 'E3.mp3',
                        'E4': 'E4.mp3',
                        'E5': 'E5.mp3',
                        'F3': 'F3.mp3',
                        'F4': 'F4.mp3',
                        'F5': 'F5.mp3',
                        'F#3': 'Fs3.mp3',
                        'F#4': 'Fs4.mp3',
                        'F#5': 'Fs5.mp3',
                        'G3': 'G3.mp3',
                        'G4': 'G4.mp3',
                        'G5': 'G5.mp3',
                        'G#3': 'Gs3.mp3',
                        'G#4': 'Gs4.mp3',
                        'G#5': 'Gs5.mp3'
                    },
                    onload: () => suona(init, 0, sax, rowEnd, init),
                    baseUrl: "./instruments/saxophone/"
                }).toDestination();
                break;
            case 'bassoon':
                const fagotto = new Tone.Sampler({
                    urls: {
                        'A2': 'A2.mp3',
                        'A3': 'A3.mp3',
                        'A4': 'A4.mp3',
                        'C3': 'C3.mp3',
                        'C4': 'C4.mp3',
                        'C5': 'C5.mp3',
                        'E4': 'E4.mp3',
                        'G2': 'G2.mp3',
                        'G3': 'G3.mp3',
                        'G4': 'G4.mp3'
                    },
                    onload: () => suona(init, 0, fagotto, rowEnd, init),
                    baseUrl: "./instruments/bassoon/"
                }).toDestination();
                break;
            case 'french-horn':
                const corno = new Tone.Sampler({
                    urls: {
                        'A1': 'A1.mp3',
                        'A3': 'A3.mp3',
                        'C2': 'C2.mp3',
                        'C4': 'C4.mp3',
                        'D3': 'D3.mp3',
                        'D5': 'D5.mp3',
                        'D#2': 'Ds2.mp3',
                        'F3': 'F3.mp3',
                        'F5': 'F5.mp3',
                        'G2': 'G2.mp3',
                    },
                    onload: () => suona(init, 0, corno, rowEnd, init),
                    baseUrl: "./instruments/french-horn/"
                }).toDestination();
                break;
            case 'trombone':
                const trombone = new Tone.Sampler({
                    urls: {
                        'A#1': 'As1.mp3',
                        'A#2': 'As2.mp3',
                        'A#3': 'As3.mp3',
                        'C3': 'C3.mp3',
                        'C4' :'C4.mp3',
                        'C#2': 'Cs2.mp3',
                        'C#4': 'Cs4.mp3',
                        'D#2': 'Ds2.mp3',
                        'D3': 'D3.mp3',
                        'D4': 'D4.mp3',
                        'D#4': 'Ds4.mp3',
                        'F2': 'F2.mp3',
                        'F3': 'F3.mp3',
                        'F4': 'F4.mp3',
                        'G#2': 'Gs2.mp3',
                        'G#3': 'Gs3.mp3',
                    },
                    onload: () => suona(init, 0, trombone, rowEnd, init),
                    baseUrl: "./instruments/trombone/"
                }).toDestination();
                break;
            case 'trumpet':
                const trumpet = new Tone.Sampler({
                    urls: {
                        'A3': 'A3.mp3',
                        'A#4': 'As4.mp3',
                        'A5': 'A5.mp3',
                        'C4': 'C4.mp3',
                        'C6': 'C6.mp3',
                        'D#4': 'Ds4.mp3',
                        'D5': 'D5.mp3',
                        'F3': 'F3.mp3',
                        'F4': 'F4.mp3',
                        'F5': 'F5.mp3',
                        'G4': 'G4.mp3',
                    },
                    onload: () => suona(init, 0, trumpet, rowEnd, init),
                    baseUrl: "./instruments/trumpet/"
                }).toDestination();
                break;
            case 'tuba':
                const tuba = new Tone.Sampler({
                    urls: {
                        'A#1': 'As1.mp3',
                        'A#2': 'As2.mp3',
                        'A#3': 'As3.mp3',
                        'D#2': 'Ds2.mp3',
                        'D3': 'D3.mp3',
                        'D4': 'D4.mp3',
                        'F1': 'F1.mp3',
                        'F2': 'F2.mp3',
                        'F3': 'F3.mp3',
                    },
                    onload: () => suona(init, 0, tuba, rowEnd, init),
                    baseUrl: "script/instruments/tuba/"
                }).toDestination();
                break;
            case 'violin':
                const violino = new Tone.Sampler({
                    urls: {
                        'A3': 'A3.mp3',
                        'A4': 'A4.mp3',
                        'A5': 'A5.mp3',
                        'A6': 'A6.mp3',
                        'C4': 'C4.mp3',
                        'C5': 'C5.mp3',
                        'C6': 'C6.mp3',
                        'C7': 'C7.mp3',
                        'E4': 'E4.mp3',
                        'E5': 'E5.mp3',
                        'E6': 'E6.mp3',
                        'G3': 'G3.mp3',
                        'G4': 'G4.mp3',
                        'G6': 'G6.mp3',
                    },
                    onload: () => suona(init, 0, violino, rowEnd, init),
                    baseUrl: "script/instruments/violin/"
                }).toDestination();
                break;
            case 'piano':
                const piano = new Tone.Sampler({
                    urls: {
                        'A1': 'A1.mp3',
                        'A2': 'A2.mp3',
                        'A3': 'A3.mp3',
                        'A4': 'A4.mp3',
                        'A5': 'A5.mp3',
                        'A6': 'A6.mp3',
                        'A7': 'A7.mp3',
                        'A#1': 'As1.mp3',
                        'A#2': 'As2.mp3',
                        'A#3': 'As3.mp3',
                        'A#4': 'As4.mp3',
                        'A#5': 'As5.mp3',
                        'A#6': 'As6.mp3',
                        'A#7': 'As7.mp3',
                        'B1': 'B1.mp3',
                        'B2': 'B2.mp3',
                        'B3': 'B3.mp3',
                        'B4': 'B4.mp3',
                        'B5': 'B5.mp3',
                        'B6': 'B6.mp3',
                        'B7': 'B7.mp3',
                        'C1': 'C1.mp3',
                        'C2': 'C2.mp3',
                        'C3': 'C3.mp3',
                        'C4': 'C4.mp3',
                        'C5': 'C5.mp3',
                        'C6': 'C6.mp3',
                        'C7': 'C7.mp3',
                        'C8': 'C8.mp3',
                        'C#1': 'Cs1.mp3',
                        'C#2': 'Cs2.mp3',
                        'C#3': 'Cs3.mp3',
                        'C#4': 'Cs4.mp3',
                        'C#5': 'Cs5.mp3',
                        'C#6': 'Cs6.mp3',
                        'C#7': 'Cs7.mp3',
                        'D1': 'D1.mp3',
                        'D2': 'D2.mp3',
                        'D3': 'D3.mp3',
                        'D4': 'D4.mp3',
                        'D5': 'D5.mp3',
                        'D6': 'D6.mp3',
                        'D7': 'D7.mp3',
                        'D#1': 'Ds1.mp3',
                        'D#2': 'Ds2.mp3',
                        'D#3': 'Ds3.mp3',
                        'D#4': 'Ds4.mp3',
                        'D#5': 'Ds5.mp3',
                        'D#6': 'Ds6.mp3',
                        'D#7': 'Ds7.mp3',
                        'E1': 'E1.mp3',
                        'E2': 'E2.mp3',
                        'E3': 'E3.mp3',
                        'E4': 'E4.mp3',
                        'E5': 'E5.mp3',
                        'E6': 'E6.mp3',
                        'E7': 'E7.mp3',
                        'F1' : 'F1.mp3',
                        'F2': 'F2.mp3',
                        'F3': 'F3.mp3',
                        'F4': 'F4.mp3',
                        'F5': 'F5.mp3',
                        'F6': 'F6.mp3',
                        'F7': 'F7.mp3',
                        'F#1' : 'Fs1.mp3',
                        'F#2': 'Fs2.mp3',
                        'F#3': 'Fs3.mp3',
                        'F#4': 'Fs4.mp3',
                        'F#5': 'Fs5.mp3',
                        'F#6': 'Fs6.mp3',
                        'F#7': 'Fs7.mp3',
                        'G1': 'G1.mp3',
                        'G2': 'G2.mp3',
                        'G3': 'G3.mp3',
                        'G4': 'G4.mp3',
                        'G5': 'G5.mp3',
                        'G6': 'G6.mp3',
                        'G7': 'G7.mp3',
                        'G#1': 'Gs1.mp3',
                        'G#2': 'Gs2.mp3',
                        'G#3': 'Gs3.mp3',
                        'G#4': 'Gs4.mp3',
                        'G#5': 'Gs5.mp3',
                        'G#6': 'Gs6.mp3',
                        'G#7': 'Gs7.mp3',
                    },
                    onload: () => suona(init, 0, piano, rowEnd, init),
                    baseUrl: "script/instruments/piano/"
                }).toDestination();
                break;

            case 'organ':
                const organo = new Tone.Sampler({
                    urls: {
                        'A1': 'A1.mp3',
                        'A2': 'A2.mp3',
                        'A3': 'A3.mp3',
                        'A4': 'A4.mp3',
                        'A5': 'A5.mp3',
                        'C1': 'C1.mp3',
                        'C2': 'C2.mp3',
                        'C3': 'C3.mp3',
                        'C4': 'C4.mp3',
                        'C5': 'C5.mp3',
                        'C6': 'C6.mp3',
                        'D#1': 'Ds1.mp3',
                        'D#2': 'Ds2.mp3',
                        'D#3': 'Ds3.mp3',
                        'D#4': 'Ds4.mp3',
                        'F#1' : 'Fs1.mp3',
                        'F#2': 'Fs2.mp3',
                        'F#3': 'Fs3.mp3',
                        'F#4': 'Fs4.mp3',
                        'F#5': 'Fs5.mp3',
                    },
                    onload: () => suona(init, 0, organo, rowEnd, init),
                    baseUrl: "script/instruments/organ/"
                }).toDestination();
                break;
        }
    }
}

let stop =  false;
let complete = [false, false];
async function suona(i, j, instrument, end, init) {
    if(j != col){
        if (array[i][j].getState() !== 0) {
            let notes = getNoteChordScale(array[i][j], i, j);
            let td = document.getElementById(i + '-' + j);
            let indexDurate = Math.floor(Math.random() * durate.length)
            td.style.borderColor = 'Yellow';

            if(notes.length > 0){
                let note =  init == 0 ? notes[0] : notes[1];
                console.log(note)
                instrument.triggerAttackRelease(note, durate[indexDurate], Tone.now(),  init == 0 ? 0.6:0.3)
                await sleep(timeOfDurate[indexDurate]);
            }else{
                console.log("Pausa");
            }

            td.style.removeProperty('border')
        }
    }


    if(j <= col - 1) {
        if (i == end - 1) {
            i = init;
            j += 1;
        } else {
            i += 1;
        }

        console.log(i + ', ' + j)
        if (!stop) {
          setTimeout(function () { suona(i, j, instrument, end, init);}, 20);
        }
    }else{
        complete[init == 0? 0: 1] = true;

        if(complete[init == 0? 1: 0]){
            avviaGioco();
        }
    }
}


function getNoteChordScale(cellula, i, j){
    let valoreVicini = computeValoreVicini(i, j);
    let chordIndex = (i % 2 === 0)? i % 3 :  (i - 1) % 3;
    let coin =  Math.round(Math.random())

    // scelgo casualmente se suonare la nota proveniente da i+j o dal valore dei vicini
    let n =  note[(coin == 0 ? (i+j) : valoreVicini) % note.length];
    switch (valoreVicini % 4){
        case 0:
            return [n, chords[chordIndex]];
        case 1:
            return [n, chords[chordIndex]];
        case 2:
            return [n, chords[chordIndex]];
        case 3:
            return [n, chords[chordIndex]]
    }
}

function computeValoreVicini(i, j){
    let count = 0;
    count += array[nmod((i-1),row)][nmod((j-1),col)].getState();

    count += array[i][nmod((j-1),col)].getState();

    count += array[nmod((i-1),row)][j].getState();

    count += array[(i+1)%row][(j+1)%col].getState();

    count += array[(i+1)%row][j].getState();

    count += array[i][(j+1)%col].getState();

    count += array[nmod((i-1),row)][(j+1)%col].getState();
    count += array[(i+1)%row][nmod((j-1),col)].getState();


    return count;
}

function cambiaStato(td){
    let id = td.id;
    let tmp = id.split('-');

    let statoAttuale = array[tmp[0]][tmp[1]].getState();
    console.log(statoAttuale)
    let nuovoStato =  (statoAttuale + 1) % p;
    console.log(nuovoStato);
    array[tmp[0]][tmp[1]].setState(nuovoStato);
    td.style.background = color[nuovoStato];
}

// Modifica parametri p e t

let addP =  document.getElementById('p-add');
addP.addEventListener('click', function (){aumenta("p")});
addP.setAttribute('disabled', 'true');

let addT =  document.getElementById('t-add');
addT.addEventListener('click', function (){aumenta("t")});

function aumenta(id){
    switch (id) {
        case 'p':
            p += 1;
            if(p === 12){
                addP.setAttribute('disabled', 'true');
            }
            delP.removeAttribute('disabled');
            pLabel.innerText = "p = " + p;
            resetTable(array, row, col, color);
        break;
        case 't':
            t += 1;
            if(t === (p-1)){
                addT.setAttribute('disabled', 'true');
            }
            delT.removeAttribute('disabled');
            tLabel.innerText = "t = " + t;
        break;
    }
}

let delP =  document.getElementById('p-delete');
delP.addEventListener('click', function (){diminuisci("p")});

let delT =  document.getElementById('t-delete');
delT.addEventListener('click', function (){diminuisci("t")});
delT.setAttribute('disabled', 'true');

function diminuisci(id){
    switch (id) {
        case 'p':
            p -= 1;
            if(p == 2){
                delP.setAttribute('disabled', 'true');
            }
            addP.removeAttribute('disabled');
            pLabel.innerText = "p = " + p;
            resetTable(array, row, col, color);
            break;
        case 't':
            t -= 1;
            if(t == 1){
                delT.setAttribute('disabled', 'true');
            }
            addT.removeAttribute('disabled');
            tLabel.innerText = "t = " + t;
            break;
    }
}

