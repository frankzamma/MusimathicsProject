import {CellulaState} from "./CellulaState.js";
import {creaGioco, nmod} from "./utils.js";
import {Point} from "./Point.js";


const row =  30;
const col = 60;
const p = 12;
const t =  1;

const color = ['grey', 'pink', 'red', 'yellow', 'blue', 'green',
    'aquamarine', 'chocolate', 'cadetblue', 'azure', 'orange', 'magenta'];

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

creaGioco(row, col, cambiaStato, avviaGioco, stoppaGioco)

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

function avviaGioco(){
    let celleDaEvolvere = new Array();

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){

            let vicini = contaViciniVivi(i, j, (array[i][j].getState() + 1)%p);

            if(vicini >= t){
                celleDaEvolvere.push(new Point(i,j));
            }
        }
    }

    aggiornaArray(celleDaEvolvere);
    timeout =  setTimeout(avviaGioco, 200);

}

function stoppaGioco(){
    clearTimeout(timeout)
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

async function generaConfigurazioneCasuale(){
    const synth = new Tone.Synth().toDestination();

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            let state = Math.floor(Math.random()*13);

            array[i][j].setState(state);

            let td = document.getElementById(i + '-' + j);

            td.style.background = color[state];

            const notes = ['A', 'B', 'C', 'D']

            //synth.triggerAttackRelease( notes[Math.floor(Math.random() * notes.length)]+'4', '8n');
            //await sleep(200);
        }
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}





