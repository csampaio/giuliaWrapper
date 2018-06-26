const player = new Vimeo.Player($('#video'));
const giulia = new Giulia();

function isLoaded(val) {
    if(val == 0) {
        player.on('loaded', (data) => {
            $.get("/legendas/json/legendas.json", function (legendas) {
                const json = {};
                let cont = 0;
                let currentScript = 0;
                for (let i = 0; i < legendas.length; i = i + 4) {
                    if (legendas.length > i + 4) {
                        json[cont] = {
                            start: legendas[i].start,
                            end: legendas[i + 4].end,
                            text: legendas[i].text + " " + legendas[i + 1].text + " " + legendas[i + 2].text + " " + legendas[i + 3].text + " " + legendas[i + 4].text
                        };
                        cont++;
                    }
                    if (legendas.length - legendas[i].id == 6) {
                        json[cont - 1] = {
                            start: legendas[legendas.length - 6].start,
                            end: legendas[legendas.length - 1].end,
                            text: legendas[i + 1].text + " " + legendas[i + 2].text + " " + legendas[i + 3].text + " " + legendas[i + 4].text + " " + legendas[i + 5].text
                        };
                    }
                }
                player.on('timeupdate', (timeupdate) => {
                    if (parseInt(timeupdate.seconds) >= parseInt(json[currentScript].start) && parseInt(timeupdate.seconds) <= parseInt(json[currentScript].end)) {
                        giulia.readText(json[currentScript].start + '\t' + json[currentScript].end + '\t' + legendas[currentScript].text);
                        currentScript++;
                    }
                });
                player.on('pause', (pause) => {
                    giulia.stopAnimation();
                });
                player.on('seeked', (seeked) => {
                    giulia.stopAnimation();
                    if (seeked.seconds < legendas[0].start) {
                        currentScript = 0;
                    } else {
                        for (let i = 0; i < cont; i++) {
                            if (parseInt(seeked.seconds) >= parseInt(json[i].start) && parseInt(seeked.seconds) <= parseInt(json[i].end))
                                currentScript = i;
                        }
                    }
                });
                player.on('ended', (ended) => {
                    currentScript = 0;
                });
            });
            console.log('Vídeo carregou. Id: ' + data.id);
        });
    }
}