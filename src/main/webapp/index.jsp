<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
    <head>
        <title>Progetto Musimatica</title>
        <link rel="stylesheet" type="text/css" href="style.css" >
    </head>
        <h1>
            Compositore automatico basato su automi celluari
        </h1>
        <div id="container-game">
        </div>
        <button type="button" id="avvia-button">Avvia</button>
        <button type="button" id="stop-button">Stop</button>
        <button type="button" id="generate-button">Genera casualmente</button>
        <input type="checkbox" id="music-play" checked ><label for="music-play">Riproduci Musica</label>

        <script src="script/script.js" type="module"></script>
        <script src="http://unpkg.com/tone" type="module"></script>
    </body>
</html>