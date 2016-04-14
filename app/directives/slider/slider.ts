import {Component, Input, HostListener, ElementRef} from 'angular2/core';

@Component ({
    selector: 'slider',
    templateUrl: "/app/directives/slider/slider.html"
})

export default class Slider {
    width:number;
    @Input() buffered: number;
    @Input() amount: number;

    constructor(element: ElementRef){
        this.width = element.nativeElement.clientWidth;
        console.log(this.width);
    }

    @HostListener("mousedown", ["$event.offsetX"])
    onMoseDown(offset):void{
        this.amount = offset/this.width*100;
        console.log(offset);
    }
}