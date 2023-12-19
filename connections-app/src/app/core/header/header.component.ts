import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'con-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  public showProfile(): void {
    this.router.navigate(['./profile']).catch(({ message }: Error) => message || null);
  }
}
