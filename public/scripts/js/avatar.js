$.get("/legendas/json/legendas.json", function (legendas) {
    console.log(legendas);
});

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

// const giulia = new Giulia();

function isLoaded(val) {
    console.log('isLoaded', val);
}

player.on('play', () => {
    // var giulia = new Giulia();
    // giulia.readText('Meu nome é Giulia');
    for (var l in legendas) {
        //if(data.seconds > l.start){
        console.log(l.text);
        //}
    }
});

player.on('timeupdate', (data) => {
    console.log(data.seconds);
    //for (var l in legendas){
    // if(data.seconds > l.start){
    //console.log(l.text);
    // }
    // }
    // console.log('timeupdate', data)
});

player.getVideoTitle()
.then((title) => {
    console.log('title:', title);
});