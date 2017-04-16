/**
 * Created by t3r on 16.04.17.
 */
(function () {
    'use strict';

    Sutoringu.Preload = function (game) {
        this.game = game;
    };

    Sutoringu.Preload.prototype = {
        create: function () {
            loadJSON.call(this, loadDictionary);

            function loadJSON(callback) {
                let xhr = new XMLHttpRequest();
                xhr.overrideMimeType("application/json");
                xhr.open('GET', 'assets/dictionary.json', true);
                xhr.onreadystatechange = (function (xhr, context) {
                    return function () {
                        if (xhr.readyState == 4 && xhr.status == "200") {
                            callback.call(context, xhr.responseText);
                        }
                    }
                })(xhr, this);
                xhr.send(null);
            }

            function loadDictionary(response) {
                this.game.state.start('Play', true, true, JSON.parse(response));
            }
        }
    }

})();