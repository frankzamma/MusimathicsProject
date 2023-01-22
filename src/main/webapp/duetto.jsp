<%--
  Created by IntelliJ IDEA.
  User: frank
  Date: 19/01/2023
  Time: 22:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<html>
    <head>
        <title>Orchestra</title>
        <%@include file="WEB-INF/links.jsp"%>
    </head>
    <body>
        <%@include file="WEB-INF/navbar.jsp"%>
        <div class="container">
            <div class="container">
                <h1>
                    Orchestra Automa Cellulare
                </h1>
                <div class="container-select">
                    <div class="container-select-item">
                        <div class="row">Strumento 1</div>
                        <div class="row">
                            <select id="instrument1">
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
                    <div class="container-select-item">
                        <div class="row">Strumento 2</div>
                        <div class="row">
                            <select id="instrument2">
                                <option value="clarinet">Clarinetto</option>
                                <option value="flute">Flauto</option>
                                <option value="saxophone">Sassofono</option>
                                <option value="bassoon">Fagotto</option>
                                <option value="french-horn">Corno Francese</option>
                                <option value="trombone">Trombone</option>
                                <option value="trumpet">Tromba</option>
                                <option value="tuba">Tuba</option>
                                <option value="violin">Violino</option>
                                <option value="piano" selected>Piano</option>
                                <option value="organ">Organo</option>
                            </select>
                        </div>
                    </div>
                    <div  class="container-select-item">
                        <div class="row">
                            <label for="tonalita">Tonalità</label>
                        </div>
                        <div class="row">
                            <select id="tonalita">
                                <option value="C4" selected>Do</option>
                                <option value="C#4">Do#</option>
                                <option value="D4">Re</option>
                                <option value="D#4">Re#</option>
                                <option value="E4">Mi</option>
                                <option value="F4">Fa</option>
                                <option value="F#4">Fa#</option>
                                <option value="G3">Sol</option>
                                <option value="G#3">Sol#</option>
                                <option value="A3">La</option>
                                <option value="Bb3">Sib</option>
                                <option value="B3">Si</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div id="container-game">
                </div>
                <div id="controller">
                    <h2>Controller</h2>
                    <input type="checkbox" id="music-play" checked ><label for="music-play">Riproduci Musica</label><br>
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
                    <button type="button"  class="button-big" id="avvia-button">Avvia</button>
                    <button type="button" class="button-big"  id="stop-button">Stop</button>
                    <button type="button" class="button-big"  id="generate-button">Genera casualmente</button>
                </div>
            </div>
        </div>
        <%@include file="WEB-INF/footer.jsp"%>
        <script src="script/duetto.js" type="module"></script>
        <script src="script/Tone.js" type="module"></script>
    </body>
</html>
