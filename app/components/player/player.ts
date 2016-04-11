import {Component} from 'angular2/core';
import HasCallback from '../../hellperClasses/hasCallbacks'

@Component({
    selector: 'player',
    templateUrl: "app/components/player/player.html"
})

class Player extends HasCallback{
    audio = new Audio();
    duration: string = "0:00";
    currentTime: string = "0:00";
    currentTimePercent = 0;

    constructor (){
        super();
        this.audio.src = "https://cs7-1v4.vk-cdn.net/p14/45af7c7f8238bf.mp3?extra=tDOF2m4V7GkWZIojXW1HxTLFNeIcIayk6H4bRRYu6b4hkTu67CGWo4cHuYXO91XKWXCA3M3pHZ_vE-N3OGzGtwq-1PT7DgX2mv6iPEPdZw_D-lAphkZx2rKgDfXuTLMjYOp-_uKcQ_H1";
        this.audio.addEventListener("loadedmetadata", this.cb_setDuration);
        this.audio.addEventListener("timeupdate", this.cb_timeUpdate);
    }

    cb_setDuration(): void{
        var durMins : number = Math.floor(this.audio.duration / 60);
        var durSecs : any = Math.floor(this.audio.duration - durMins*60);
        durSecs < 10 ? durSecs = '0' + durSecs : null;
        this.duration = `${durMins}:${durSecs}`;
    }

    cb_timeUpdate(): void{
        this.currentTimePercent = this.audio.currentTime * (100  / this.audio.duration);
        var durMins : number = Math.floor(this.audio.currentTime / 60);
        var durSecs : any = Math.floor(this.audio.currentTime - durMins*60);
        if(durSecs < 10) {
            durSecs = `0${durSecs}`;
        }
        this.currentTime = `${durMins}:${durSecs}`;
    }

}
export default Player;

