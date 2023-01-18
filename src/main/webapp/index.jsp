<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
    <head>
        <title>Progetto Musimatica</title>
        <link rel="stylesheet" type="text/css" href="style.css" >
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
        <div class="container">
            <h1>
                Compositore automatico basato su automi celluari
            </h1>
            <div id="container-game">
            </div>
            <div id="controller">
                <h2>Controller</h2>
                <input type="checkbox" id="music-play" checked ><label for="music-play">Riproduci Musica</label><br>
                <div class="button-mod">
                    <button id="row-delete">-</button>
                    <label>Righe</label>
                    <button id="row-add">+</button>
                </div>
                <div class="button-mod">
                    <button id="col-delete">-</button>
                    <label>Colonne</label>
                    <button id="col-add">+</button>
                </div>
                <div class="button-mod">
                    <button id="p-delete">-</button>
                    <label id="p-label">p = 10</label>
                    <button id="p-add">+</button>
                </div>
                <div class="button-mod">
                    <button id="t-delete">-</button>
                    <label id="t-label">t = 10</label>
                    <button id="t-add">+</button>
                </div>

                <button type="button" id="avvia-button">Avvia</button>
                <button type="button" id="stop-button">Stop</button>
                <button type="button" id="generate-button">Genera casualmente</button>
                <select id="instruments">
                    <option value="clarinet" selected>Clarinetto</option>
                    <option value="flute">Flauto</option>
                    <option value="saxophone">Sassofono</option>
                    <option value="bassoon">Fagotto</option>
                    <option value="french-horn">Corno Francese</option>
                    <option value="trombone">Trombone</option>
                    <option value="trumpet">Tromba</option>
                    <option value="tuba">Tuba</option>
                    <option value="violin">Violino</option>
                    <option value="piano">Piano</option>
                    <option value="organ">Organo</option>
                </select>
            </div>
        </div>
            <script src="script/script.js" type="module"></script>
            <script src="script/Tone.js" type="module"></script>
    </body>
</html>