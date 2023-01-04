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

function creaGioco(row, col, cambiaStato, avviaGioco, stoppaGioco) {
    let elem = document.querySelector('div#container-game');
    let tab = document.createElement('table');

    for(let i = 0; i < row; i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < col; j++){

            let tmp = document.createElement('td');
            tmp.id = i + '-' + j;

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

export{nmod, creaGioco};