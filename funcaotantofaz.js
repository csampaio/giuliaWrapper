function FuncaoTantoFaz(val) {
            if(val == 0){
                $.ajax({
                    statusCode: {
                        200: function(data) {
                            console.log("200");
                            var json = {};
                            var cont = 0;
                            for(var i = 0; i < data.length; i = i+4){
                                if(data.length > i+4){
                                    json[cont] = {
                                        "start": data[i].start,
                                        "end": data[i+4].end,
                                        "text": data[i].text + " " + data[i+1].text + " " + data[i+2].text + " " + data[i+3].text + " " + data[i+4].text  
                                    };
                                    cont++;
                                }
                                if(data.length - data[i].id == 6){
                                    json[cont - 1] = {
                                        "start": data[data.length - 6].start,
                                        "end": data[data.length - 1].end,
                                        "text": data[i+1].text + " " + data[i+2].text + " " + data[i+3].text + " " + data[i+4].text + " " + data[i+5].text  
                                    };
                                }
                            }
                            kWidget.embed({
                                "targetId": "",
                                "wid": "",
                                "uiconf_id": ,
                                "cache_st": ,
                                "entry_id": "",
                                "readyCallback": function(playerID){
                                    var kdp = $('#' + playerID).get(0);
                                    kdp.kBind("mediaReady", function() {
                                        if(legendPosition == undefined)
                                            var legendPosition = 0;
                                        var isSeek = false;
                                        kdp.kBind("doPlay", function() {
                                            $(".avatar").show();
                                            $("#speed-picker").focus();
                                            console.log($("#speed-picker").focus());
                                            console.log("play");
                                        });
                                        kdp.kBind("doPause", function() {
                                            readText(" ");
                                            console.log("pause");
                                            $(".avatar").hide();
                                        });
                                        kdp.kBind("userInitiatedSeek", function() {
                                            kdp.kBind("preSeek", function(seekTime) {
                                                if(seekTime < json[0].start){
                                                    legendPosition = 0;
                                                }else{
                                                    for(var i = 0; i < cont-1; i++){
                                                        if(seekTime >= json[i].start && seekTime <= json[i].end){
                                                            legendPosition = i;
                                                        }
                                                    }
                                                }
                                            });
                                        });
                                        kdp.kBind("openFullScreen", function() {
                                            console.log("teste");
                                        });
                                        kdp.kBind("playerUpdatePlayhead", function(){
                                            var justOneTime = 0;
                                            if( justOneTime == 0){
                                                justOneTime++;
                                                if(parseInt(kdp.evaluate('{video.player.currentTime}')) >= parseInt(json[legendPosition].start) && parseInt(kdp.evaluate('{video.player.currentTime}')) <= parseInt(json[legendPosition].end)){
                                                    readText(json[legendPosition].text);
                                                    // readWithSpeed(json[legendPosition].start, json[legendPosition].end, json[legendPosition].text, "./legendas/animacoes.txt");
                                                    console.log(json[legendPosition]);
                                                    legendPosition++;
                                                }
                                                justOneTime = 0;
                                            }
                                        });
                                        kdp.kBind("playerPlayEnd", function() {
                                            legendPosition = 0;
                                            $(".avatar").hide();
                                            console.log("terminou");
                                        });
                                    });
                                }
                            });
                        },
                        500: function () {
                            console.log("500");
                        },
                        404: function () {
                            console.log("404");
                        }
                    },
                    type: "GET",
                    url: "/kaltura/legendas/legenda.json",
                    data: {teste: 10}
                });
            }
        }