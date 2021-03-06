/**
 * Created by Damian Terlecki on 16.04.17.
 */
(function () {
    'use strict';

    Sutoringu.Menu = function (game) {
        this.game = game;
        this.title = "Sutoringu";
        this.labels = ["Hiragana", "Katakana", "Kanji"];
        this.about = "About";
        this.authorData = null;
    };

    Sutoringu.Menu.prototype = {
        create: function () {
            setUpBackground.call(this);
            let horizontalCenter = this.game.width / 2;
            let title = this.game.add.text(horizontalCenter, 16, this.title, {
                fontSize: '48px',
                fill: '#ff0044',
                font: 'Molle',
                boundsAlignH: "center"
            });
            let favicon = this.game.add.sprite(0, 0, 'favicon');
            favicon.scale.setTo(0.25, 0.25);
            favicon.x = horizontalCenter - title.width / 2 - 8;
            favicon.y = title.height / 1.5;
            favicon.anchor.setTo(0.5, 0.5);
            title.x += favicon.width / 2 + 8;
            title.anchor.setTo(0.5, 0);
            let verticalPosition;
            for (let i = 0; i < this.labels.length; i++) {
                let verticalCenter = this.game.height / 2;
                let halfTotalHeight = (this.labels.length - 1) * (64 + 32) / 2;
                let itemHeight = i * (64 + 32);
                verticalPosition = verticalCenter - halfTotalHeight + itemHeight;
                new LabelButton(this.game, horizontalCenter,
                    verticalPosition,
                    "button", this.labels[i], onGameplayClick, 1, 0, 2);
            }
            if (window.location.hash === "#about") {
                onAboutClick(false);
            }

            this.aboutButton = new LabelButton(this.game, horizontalCenter,
                verticalPosition + 64 + 32 + 32,
                "button", this.about, onAboutClick, 1, 0, 2, this);

            function setUpBackground() {
                const sakuraCanvas = this.game.make.bitmapData(this.game.world.width, this.game.world.height);
                new Sakura(sakuraCanvas, '#ff000000', '#ffa7c5').create().paint();
                sakuraCanvas.addToWorld();
            }

            function onGameplayClick() {
                this.game.state.start('AdvancedMenu', true, false, this.label.text);
            }

            function onAboutClick(userClick) {
                window.location.hash = "about";
                if (userClick) {
                    window.history.replaceState({generatedInternally: true}, window.title, window.location.search + window.location.hash);
                }
                document.getElementById('modal').style.display = "flex";
                document.getElementById('modal-content').innerHTML =
                    "<div id='author' style='font-size: 1.5em;text-align: center;'>" +
                    "<img src='assets/images/favicon.ico' style='width: 64px;height: 64px;margin-bottom: 16px'/></br>" +
                    "<b>Sutoringu v1.1.6</br>Created by <a href='https://t3r1jj.github.io' style='color: #ff0044;text-decoration: none'>T3r1jj</a>" +
                    "<br/>Attributions; build on:</b>" +
                    "<div style='text-align: center'>" +
                    "<ul style='font-size: 0.67em;text-align: left;margin-top: 0'>" +
                    "<li><a href='https://phaser.io/'>Phaser</a> v2.6.2 - Copyright (c) 2017 Richard Davey, Photon Storm Ltd. [MIT]</li>" +
                    "<li><a href='https://github.com/Flaxis/slick-ui'>SlickUI</a> Phaser plugin - Flaxis [Public Domain]</li>" +
                    "<li><a href='https://github.com/timoschaefer/jQuery-Sakura'>jQuery-Sakura</a> - Copyright (c) 2014 Timo Schäfer [MIT]</li>" +
                    "<li>Image assets - <a href='https://pixabay.com/'>Pixabay</a> [CC0 Public Domain]</li>" +
                    "<li>Dictionary data - <a href='https://www.wikipedia.org/'>Wikipedia</a> [CC BY-SA 3.0]</li>" +
                    "<li><a href='https://fonts.google.com/?query=molle&selection.family=Candal|Molle:400i'>Google fonts</a>:" +
                    "<ul><li>Candal - Copyright (c) 2011, Vernon Adams (vern@newtypography.co.uk) [OFL]</li>" +
                    "<li>Molle - Copyright (c) 2012 by Sorkin Type Co (www.sorkintype.com) [OFL]</li></ul></li>" +
                    "<li><a href='https://github.com/satazor/js-spark-md5'>SparkMD5</a> - Copyright (c) 2015 André Cruz (amdfcruz@gmail.com) [WTF2/MIT]</li>" +
                    "</ul></div>";
            }
        }
    };

})();