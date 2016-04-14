import {Component, Input, HostListener, Output, EventEmitter, OnChanges, SimpleChange} from 'angular2/core';

@Component({
    selector: 'slider',
    templateUrl: "/app/directives/slider/slider.html"
})

export default class Slider implements OnChanges {
    pressed:boolean = false;
    elementOffsetLeft:number;
    width:number;
    currentTime:number;
    @Input() buffered:number;
    @Input() amount:number;
    @Output() slide:EventEmitter = new EventEmitter();

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        if("amount" in changes && !this.pressed){
            this.currentTime = changes["amount"].currentValue;
        }
    }

    @HostListener("mouseenter", ["$event.target"])
    omMouseEnter(target):void {
        this.width = target.scrollWidth;
        this.elementOffsetLeft = target.getBoundingClientRect().left;
    }

    @HostListener("mousedown", ["$event.pageX"])
    onMouseDown(pointerOffset:number):void {
        this.pressed = true;
        this.updateTime(pointerOffset);
    }

    @HostListener("document:mousemove", ["$event.pageX"])
    onMouseMove(pointerOffset:number):void {
        if(this.pressed == true){
            this.updateTime(pointerOffset);
        }
    }

    @HostListener("document:mouseup", ["$event.pageX"])
    onMouseUp(pointerOffset):void {
        if(this.pressed){
            this.pressed = false;
            this.updateTime(pointerOffset);
        }
    }


    updateTime(pointerOffset:number){
        var amount = (pointerOffset - this.elementOffsetLeft) / this.width * 100;
        if(amount <=100 && amount >= 0){
            this.currentTime = amount;
        }
        if(this.pressed == false){
            this.slide.emit(this.currentTime);
        }
    }
}