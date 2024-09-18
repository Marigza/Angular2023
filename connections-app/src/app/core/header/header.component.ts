import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

enum Theme {
  light = 'light',
  dark = 'dark'
}

@Component({
  selector: 'con-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public theme: string = localStorage.getItem('theme') ?? 'light';

  constructor(private router: Router) {}

  ngOnInit() {
    document.documentElement.setAttribute('theme', this.theme);
    if (this.theme === 'dark') {
      document.body.classList.add('dark')
    }
  }

  get lightTheme(): boolean {
    return document.documentElement.getAttribute('theme') === 'light';
  }

  public showProfile(): void {
    this.router.navigate(['./profile']).catch(console.error);
  }

  public toggle() {
    if (this.lightTheme) {
      document.documentElement.setAttribute('theme', 'dark');
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('theme', 'light');
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
}
