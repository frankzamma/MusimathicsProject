import {Cellula} from "./Cellula.js";
import {Point} from "./Point.js";
import{nmod, creaGioco} from "./utils.js";

const row =  30;
const col = 60;



let array = new Array(row);

for(let i = 0; i < row; i++){
    array[i] = new Array(col);
}

for(let i = 0; i < row; i++){
    for(let j = 0; j < col; j++){
        array[i][j] = new Cellula();
    }
}

creaGioco(row, col, cambiaStato, avviaGioco, stoppaGioco)

function cambiaStato(td){
    let id = td.id;
    let tmp = id.split('-');

    if( array[tmp[0]][tmp[1]].isViva()){
        td.style.removeProperty('background-color');
        array[tmp[0]][tmp[1]].morte();
    }else{
        td.style.background = 'yellow';
        array[tmp[0]][tmp[1]].nascita();
    }
}

let timeout;
function avviaGioco(){
    let celleDaAttivare = new Array();
    let celleDaDisattivare = new Array();

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){

            let viciniVivi = contaViciniVivi(i, j);

            if(!array[i][j].isViva() &&  viciniVivi == 3){
               celleDaAttivare.push(new Point(i, j));
            }
            if(array[i][j].isViva() && !(viciniVivi == 2 || viciniVivi == 3)){
                celleDaDisattivare.push(new Point(i, j));
            }
        }
    }

    aggiornaArray(celleDaAttivare, celleDaDisattivare);
    timeout =  setTimeout(avviaGioco, 200);
}

function aggiornaArray(celleDaAttivare, celleDaDisattivare){
    for(let elem of celleDaAttivare){
        array[elem.i][elem.j].nascita();
        document.getElementById(elem.i+ '-' + elem.j).style.background = 'yellow';
    }

    for(let elem of celleDaDisattivare){
        array[elem.i][elem.j].morte();
        document.getElementById(elem.i+ '-' + elem.j).style.removeProperty('background-color');
    }
}



function contaViciniVivi(i, j){
    let count = 0;

    if(array[nmod((i-1),row)][nmod((j-1),col)].isViva()){
        count++;
    }

    //console.log(nmod((i-1),row) + ' , ' + nmod((j-1),col))

    if(array[i][nmod((j-1),col)].isViva()){
        count++;
    }

    if(array[nmod((i-1),row)][j].isViva()){
        count++;
    }

    if(array[(i+1)%row][(j+1)%col].isViva()){
        count++;
    }

    if(array[(i+1)%row][j].isViva()){
        count++;
    }

    if(array[i][(j+1)%col].isViva()){
        count++;
    }

    if(array[nmod((i-1),row)][(j+1)%col].isViva()){
        count++;
    }

    if(array[(i+1)%row][nmod((j-1),col)].isViva()){
        count++;
    }

    return count;

}

function stoppaGioco(){
    clearTimeout(timeout)
}

