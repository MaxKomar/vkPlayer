import {Component} from 'angular2/core';
import HasCallback from '../../hellperClasses/hasCallbacks'
import Slider from '../../directives/slider/slider'

@Component({
    selector: 'player',
    templateUrl: "app/components/player/player.html",
    directives: [Slider]
})

class Player extends HasCallback {
    private audio = new Audio();
    duration:string = "0:00";
    currentTime:string = "0:00";
    currentTimePercent:number = 0;
    buffered:number = 0;
    isPlay:boolean = false;
    audioSrc:string = "https://cs7-1v4.vk-cdn.net/p24/3e2a553506e4a0.mp3?extra=jXbmOWZbWp8mvNK2PdphSCWYBACZuhj9lAy6Xc-l2bkue6j-Gx7pTMXOGuz4N--7243Qo7dUxc5gAaxV5DxdeE-EqnKKnhin2e0T4pvrKsKN4l22tZFvNpvPwgZuJQmHTYJQRq3ob6o"
    constructor() {
        super();
        this.audio.src = this.audioSrc;
        this.audio.addEventListener("loadedmetadata", this.cb_setDuration);
        this.audio.addEventListener("timeupdate", this.cb_timeUpdate);
        this.audio.addEventListener("progress", this.cb_buffered);
    }

    play():void {
        this.isPlay = true;
        this.audio.play();
    }

    pause():void {
        this.isPlay = false;
        this.audio.pause();
    }

    updateAudioSrc():void {
        this.audio.src = this.audioSrc;
    }

    cb_setDuration():void {
        console.log(this.audio);
        var durMins:number = Math.floor(this.audio.duration / 60);
        var durSecs:any = Math.floor(this.audio.duration - durMins * 60);
        durSecs < 10 ? durSecs = '0' + durSecs : null;
        this.duration = `${durMins}:${durSecs}`;
    }

    cb_timeUpdate():void {
        this.currentTimePercent = this.audio.currentTime * (100 / this.audio.duration);
        var durMins:number = Math.floor(this.audio.currentTime / 60);
        var durSecs:any = Math.floor(this.audio.currentTime - durMins * 60);
        if (durSecs < 10) {
            durSecs = `0${durSecs}`;
        }
        this.currentTime = `${durMins}:${durSecs}`;
    }

    cb_buffered():void {
        var bufferedLength:number = this.audio.buffered.length;
        if(bufferedLength > 0){
            var bufferedMs:number = this.audio.buffered.end(bufferedLength - 1);
            this.buffered = bufferedMs * (100 / this.audio.duration);
        }
    }

}
export default Player;

