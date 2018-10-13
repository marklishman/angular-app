import { Component, EventEmitter, Output } from '@angular/core';
import { GestureEventData, TouchGestureEventData } from 'tns-core-modules/ui/gestures';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {

  // TODO use a button?

  @Output() tap = new EventEmitter<GestureEventData>();

  onTouch(event: TouchGestureEventData): void {
    const btn = event.view;
    switch (event.action) {
      case 'down':
        btn.className = 'float-btn down';
        break;
      case 'up':
        btn.className = 'float-btn';
        break;
    }
  }

  onTap(event: GestureEventData): void {
    this.tap.next(event);
  }

}
