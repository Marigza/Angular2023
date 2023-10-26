import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'yta-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() public newItemEvent = new EventEmitter<string>();

  public showAllItems(value: string): void {
    this.newItemEvent.emit(value);
  }

  // showSettings() {
  //   console.log('settings')
  // }
}
