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


function nmod(n, m) {
    //console.log('(' + n + ',' + m + ')');
    if(n >= 0){
        //console.log(n%m);
        return n%m;
    }else{
        //console.log(n + m);
        return n + m
    }
}

function creaGioco(row, col, cambiaStato, avviaGioco, stoppaGioco, array, color) {
    let elem = document.querySelector('div#container-game');
    let tab = document.createElement('table');
    tab.setAttribute('id', 'compositor');

    for(let i = 0; i < row; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < col; j++){

            let tmp = document.createElement('td');
            tmp.id = i + '-' + j;

            if(array != undefined)
                tmp.addEventListener('click',function (){cambiaStato(array, color, tmp)})
            else
                tmp.addEventListener('click',function (){cambiaStato(tmp)})
            tr.appendChild(tmp)
        }

        tab.appendChild(tr);
    }
    elem.appendChild(tab)

    let avviaButton =  document.getElementById('avvia-button');
    avviaButton.addEventListener('click', avviaGioco);

    let stopButton =  document.getElementById('stop-button');
    stopButton.addEventListener('click', stoppaGioco);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}


export{contaVicini, generaConfigurazioneCasuale, nmod, creaGioco, sleep}



