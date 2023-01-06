import {CellulaState} from "./CellulaState.js";
import {creaGioco, nmod, sleep} from "./utils.js";
import {Point} from "./Point.js";

const row =  5;
const col = 10;
const p = 7;
const t =  2;

const color = ['gray', 'cyan', 'red', 'yellow', 'blue', 'lime',
    'purple', 'black', 'white', 'lightblue', 'orange', 'magenta'];
const note = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
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

    if(array[nmod((i-1),row)][nmod((j-1),col)].getState() == state){
        count++;
    }

    //console.log(nmod((i-1),row) + ' , ' + nmod((j-1),col))

    if(array[i][nmod((j-1),col)].getState() == state){
        count++;
    }

    if(array[nmod((i-1),row)][j].getState() == state){
        count++;
    }

    if(array[(i+1)%row][(j+1)%col].getState() == state ){
        count++;
    }

    if(array[(i+1)%row][j].getState() == state){
        count++;
    }

    if(array[i][(j+1)%col].getState() == state){
        count++;
    }

    if(array[nmod((i-1),row)][(j+1)%col].getState() == state){
        count++;
    }

    if(array[(i+1)%row][nmod((j-1),col)].getState() == state){
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
            let state = Math.floor(Math.random() * p + 1);

            array[i][j].setState(state);

            let td = document.getElementById(i + '-' + j);

            td.style.background = color[state];
        }
    }
}

let suonaTimeout;
function suonaAll() {
    const synth = new Tone.Synth().toDestination();
    suona(0,0, synth);
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
            await sleep(timeOfDurate[indexDurate]);
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
    let notes = [note[cellula.getState() - 1]];

    notes.push(Tone.Midi(note[0]).transpose(i).toNote());
    notes.push(Tone.Midi(note[1]).transpose(j).toNote());
    console.log(notes);
    return notes;
}




