import {Component, Input} from 'angular2/core';

@Component ({
    selector: 'slider',
    templateUrl: "/app/directives/slider/slider.html"
})

export default class Slider {
    @Input() buffered: number;
    @Input() amount: number;
}