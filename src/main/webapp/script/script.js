import {CellulaState} from "./CellulaState.js";
import {creaGioco, nmod, sleep} from "./utils.js";
import {Point} from "./Point.js";

let row =  10;
let col = 10;
let p = 12;
let t =  1;
let pLabel = document.getElementById("p-label");
pLabel.innerText = "p = " + p;

let tLabel = document.getElementById("t-label");
tLabel.innerText = "t = " + t;

const color = ['gray', 'cyan', 'red', 'yellow', 'blue', 'lime',
    'purple', 'black', 'white', 'lightblue', 'orange', 'magenta'];
const note = ['Bb3', 'C4', 'D4', 'Eb4', 'F4', 'G4', 'A4']
const durate = ['2n', '4n', '8n', '16n']
const timeOfDurate = ['1000', '500', '250', '125']
let elem = document.querySelector('div#container-game');

let array = new Array(row);

for(let i = 0; i < row; i++){
    array[i] = new Array(col);
}

for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        array[i][j] = new CellulaState(p);
    }
}

let button = document.getElementById('generate-button');
button.addEventListener('click', generaConfigurazioneCasuale);

creaGioco(row, col, cambiaStato, starter, stoppaGioco)


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

let timeout;
let playMusic = true;

let checkbox = document.getElementById('music-play');

checkbox.addEventListener('click',
    function (){
                playMusic = checkbox.checked;
})


function starter(){
    let btn  = document.getElementById('avvia-button');
    btn.setAttribute('disabled', 'true');
    let checkbox =  document.getElementById('music-play');
    checkbox.setAttribute('disabled', 'true')
    stop  = false;
    avviaGioco();
}

function avviaGioco(){
    let celleDaEvolvere = [];
    //console.log('Sto qui');

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            console.log((array[i][j].getState() + 1)%p)
            let vicini = contaViciniVivi(i, j, (array[i][j].getState() + 1)%p);
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

    clearTimeout(suonaTimeout);
    clearTimeout(timeout);
}

function contaViciniVivi(i, j, state){
    let count = 0;

    if(array[nmod((i-1),row)][nmod((j-1),col)].getState() === state){
        count++;
    }

    //console.log(nmod((i-1),row) + ' , ' + nmod((j-1),col))

    if(array[i][nmod((j-1),col)].getState() === state){
        count++;
    }

    if(array[nmod((i-1),row)][j].getState() === state){
        count++;
    }

    if(array[(i+1)%row][(j+1)%col].getState() === state ){
        count++;
    }

    if(array[(i+1)%row][j].getState() === state){
        count++;
    }

    if(array[i][(j+1)%col].getState() === state){
        count++;
    }

    if(array[nmod((i-1),row)][(j+1)%col].getState() === state){
        count++;
    }

    if(array[(i+1)%row][nmod((j-1),col)].getState() === state){
        count++;
    }
    return count;
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

function generaConfigurazioneCasuale(){
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++) {
            let state = Math.floor(Math.random() * p);
            console.log(i, j)
            array[i][j].setState(state);

            let td = document.getElementById(i + '-' + j);

            td.style.background = color[state];

            //td.innerText = state.toString();

        }
    }
}

let suonaTimeout;
function suonaAll() {
    let instrument =  document.getElementById('instruments');
    switch (instrument.value){
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
                onload: () => suona(0, 0, clarinet),
                baseUrl: "./instruments/clarinet/"
            }).toDestination();
        break;
        case "flute":
            const flute = new Tone.Sampler({
                urls: {
                    'A4': 'A4.mp3',
                    'A5': 'A5.mp3',
                    'A6': 'A6.mp3',
                    'C4': 'C4.mp3',
                    'C5': 'C5.mp3',
                    'C6': 'C6.mp3',
                    'C7': 'F7.mp3',
                    'E4': 'E4.mp3',
                    'E5': 'E5.mp3',
                    'E6': 'E6.mp3'
                },
                onload: () => suona(0, 0, flute),
                baseUrl: "./instruments/flute/"
            }).toDestination();
            break;
        case "saxophone":
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
                onload: () => suona(0, 0, sax),
                baseUrl: "./instruments/saxophone/"
            }).toDestination();
            break;
        case "bassoon":
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
                onload: () => suona(0, 0, fagotto),
                baseUrl: "./instruments/bassoon/"
            }).toDestination();
            break;
        case "french-horn":
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
                onload: () => suona(0, 0, corno),
                baseUrl: "./instruments/french-horn/"
            }).toDestination();
            break;
            case "trombone":
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
                    'E4': 'E4.mp3',
                    'F2': 'F2.mp3',
                    'F3': 'F3.mp3',
                    'F4': 'F4.mp3',
                    'G#2': 'Gs2.mp3',
                    'G#3': 'Gs3.mp3',
                },
                onload: () => suona(0, 0, trombone),
                baseUrl: "./instruments/trombone/"
            }).toDestination();
            break;
        case "trumpet":
            const trumpet = new Tone.Sampler({
                urls: {
                    'A3': 'A3.mp3',
                    'A#4': 'As4.mp3',
                    'A5': 'A5.mp3',
                    'C4': 'C4.mp3',
                    'C6': 'C6.mp3',
                    'D#4': 'Ds4.mp3',
                    'D5': 'D5.mp3',
                    'E4': 'E4.mp3',
                    'F3': 'F3.mp3',
                    'F4': 'F4.mp3',
                    'F5': 'F5.mp3',
                    'G4': 'G4.mp3',
                },
                onload: () => suona(0, 0, trumpet),
                baseUrl: "./instruments/trumpet/"
            }).toDestination();
            break;
            case "tuba":
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
                onload: () => suona(0, 0, tuba),
                baseUrl: "./instruments/tuba/"
            }).toDestination();
            break;
        case "violin":
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
                onload: () => suona(0, 0, violino),
                baseUrl: "./instruments/violin/"
            }).toDestination();
            break;
        case "piano":
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
                onload: () => suona(0, 0, piano),
                baseUrl: "./instruments/piano/"
            }).toDestination();
            break;

        case "organ":
            const organo = new Tone.Sampler({
                urls: {
                    'A1': 'A1.mp3',
                    'A2': 'A2.mp3',
                    'A3': 'A3.mp3',
                    'A4': 'A4.mp3',
                    'A5': 'A5.mp3',
                    'A#1': 'As1.mp3',
                    'A#2': 'As2.mp3',
                    'A#3': 'As3.mp3',
                    'A#4': 'As4.mp3',
                    'A#5': 'As5.mp3',
                    'A#6': 'As6.mp3',
                    'A#7': 'As7.mp3',
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
                    'F1' : 'F1.mp3',
                    'F2': 'F2.mp3',
                    'F3': 'F3.mp3',
                    'F4': 'F4.mp3',
                    'F5': 'F5.mp3',
                },
                onload: () => suona(0, 0, organo),
                baseUrl: "./instruments/organ/"
            }).toDestination();
            break;

        }





}

let stop =  false;
async function suona(i, j, synth) {
    if(j != col){
        if (array[i][j].getState() !== 0) {
            console.log('Sto suonando...')
            let notes = getNotes(array[i][j], i, j);
            let num = Math.floor((Math.random()) * 3);
            let td = document.getElementById(i + '-' + j);
            let indexDurate = Math.floor(Math.random() * durate.length)
            td.style.borderColor = 'Yellow';
            synth.triggerAttackRelease(notes[num], durate[indexDurate])
            await sleep(timeOfDurate[indexDurate]- -10);
            td.style.removeProperty('border')

        }
    }


    if(j <= col - 1) {
        if (i == row - 1) {
            i = 0;
            j += 1;
        } else {
            i += 1;
        }

        console.log(i + ', ' + j)
        if (!stop) {
            suonaTimeout = setTimeout(function () {
                suona(i, j, synth);
            }, 0);
        }

        }else{
            avviaGioco();
        }
}

function getNotes(cellula, i, j){
    let notes = [note[cellula.getState()%note.length]];

    notes.push(Tone.Midi(note[0]).transpose(i).toNote());
    notes.push(Tone.Midi(note[1]).transpose(j).toNote());
    console.log(notes);
    return notes;
}


let addCol =  document.getElementById('col-add');
addCol.addEventListener('click', function (){aumenta("col");});

let addRow =  document.getElementById('row-add');
addRow.addEventListener('click', function (){aumenta("row")});

let addP =  document.getElementById('p-add');
addP.addEventListener('click', function (){aumenta("p")});

let addT =  document.getElementById('t-add');
addT.addEventListener('click', function (){aumenta("t")});


function aumenta(id){
    switch (id) {
        case "col":
            let tr =  document.querySelectorAll("table#compositor > tr");

            for(let i = 0; i < row; i++){
                array[i].push(new CellulaState());
                console.log(array[i])
                let td =  document.createElement('td');
                td.id = i + '-' + col;
                td.addEventListener('click',function (){cambiaStato(td)})
                tr[i].append(td);
            }
            col += 1;
            if(col == 30)
                addCol.setAttribute('disabled', 'true');
            delCol.removeAttribute('disabled');
            break;
        case "row":
            let table =  document.querySelector("table#compositor");
            let newTr =  document.createElement('tr');
            let newRow =  new Array(col);
            for(let i = 0; i < col; i++){
                let td =  document.createElement('td');
                td.id = row + '-' + i;
                td.addEventListener('click',function (){cambiaStato(td)})
                newTr.append(td);
                newRow[i] = new CellulaState();
                console.log(newRow)
            }
            table.appendChild(newTr);
            array.push(newRow)
            row += 1;

            if( row == 30)
                addRow.setAttribute('disabled', 'true');
            delRow.removeAttribute('disabled');
        break;
        case 'p':
            p += 1;

            pLabel.innerText = "p = " + p;
        break;
        case 't':
            t += 1;

            tLabel.innerText = "t = " + t;
        break;
    }
}

let delCol =  document.getElementById('col-delete');
delCol.addEventListener('click', function (){diminuisci("col");});

let delRow =  document.getElementById('row-delete');
delRow.addEventListener('click', function (){diminuisci("row")});

let delP =  document.getElementById('p-delete');
delP.addEventListener('click', function (){diminuisci("p")});

let delT =  document.getElementById('t-delete');
delT.addEventListener('click', function (){diminuisci("t")});

function diminuisci(id){
    switch (id) {
        case "col":
            let tr =  document.querySelectorAll("table#compositor > tr");
            col -= 1;
            for(let i = 0; i < row; i++){
                array[i].pop()
                console.log(array[i])

                id = i + '-' + col;
                let td =  document.getElementById(id);
                tr[i].removeChild(td);
            }

            if(col == 5)
                delCol.setAttribute('disabled', 'true');
            addCol.removeAttribute('disabled');
            break;
        case "row":
            let table =  document.querySelector("table#compositor");
            let lastTr = document.querySelectorAll("table#compositor > tr")[row-1];
            table.removeChild(lastTr);
            array.pop();
            row -= 1;
            if( row == 5)
                delRow.setAttribute('disabled', 'true');
            addRow.removeAttribute('disabled');
            break;
        case 'p':
            p -= 1;

            pLabel.innerText = "p = " + p;
            break;
        case 't':
            t -= 1;

            tLabel.innerText = "t = " + t;
            break;
    }
}



