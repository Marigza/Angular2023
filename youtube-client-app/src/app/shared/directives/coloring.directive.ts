import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { periodInMiliseconds } from '../constants/constants';

@Directive({
  selector: '[ytaColoring]',
})
export class ColoringDirective {
  @Input() public set publishedAt(date: string) {
    this.calculationColor(date);
  }

  constructor(
    private readonly renderer: Renderer2,
    private readonly el: ElementRef
  ) {}

  private calculationColor(date: string): void {
    const delta = Date.now() - Date.parse(date);
    let color;

    if (delta >= periodInMiliseconds.sixMonth) {
      color = 'red';
    } else if (delta >= periodInMiliseconds.oneMonth) {
      color = 'yellow';
    } else if (delta >= periodInMiliseconds.sevenDays) {
      color = 'green';
    } else {
      color = 'blue';
    }

    this.renderer.setStyle(this.el.nativeElement, 'borderBottom', `5px solid ${color}`);
  }
}
