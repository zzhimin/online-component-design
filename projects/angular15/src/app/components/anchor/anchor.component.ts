import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'anchor',
  template: '<ng-template></ng-template>'
})
export class AnchorComponent {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
