import {nmod} from "./utils.js";

function contaVicini(array, i, j, state, row, col){
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



function generaConfigurazioneCasuale(array, row, col, p, color){
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

export{contaVicini, generaConfigurazioneCasuale}



