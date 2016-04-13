import {Component, Input} from 'angular2/core';

@Component ({
    selector: 'slider',
    template: '<div class="buffered" [ngStyle] = "{\'width\': buffered + \'%\'}"></div>' +
    '<div class="amount" [ngStyle] = "{\'width\': amount + \'%\'}"></div>' +
    '<div class="handler"></div>'
})

export default class Slider {
    @Input() buffered: number;
    @Input() amount: number;
}