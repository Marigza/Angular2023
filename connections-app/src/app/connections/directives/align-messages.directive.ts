import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[conAlignMessages]',
})
export class AlignMessagesDirective implements OnInit {
  @Input() public conAlignMessages = '';

  constructor(private currentElement: ElementRef) {}

  public ngOnInit(): void {
    this.conAlignMessages === localStorage.getItem('uid') ? this.alignToRight() : this.alignToLeft();
  }

  private alignToLeft(): void {
    (this.currentElement.nativeElement as HTMLElement).style.alignSelf = 'flex-start';
  }

  private alignToRight(): void {
    (this.currentElement.nativeElement as HTMLElement).style.alignSelf = 'flex-end';
  }
}
