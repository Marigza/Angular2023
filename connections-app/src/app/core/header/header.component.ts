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
  public theme: string = localStorage.getItem('theme') ?? Theme.light;

  constructor(private router: Router) {}

  ngOnInit() {
    document.documentElement.setAttribute('theme', this.theme);
    if (this.theme === Theme.dark) {
      document.body.classList.add(Theme.dark)
    }
  }

  get lightTheme(): boolean {
    return document.documentElement.getAttribute('theme') === Theme.light;
  }

  public showProfile(): void {
    this.router.navigate(['./profile']).catch(console.error);
  }

  public toggle() {
    if (this.lightTheme) {
      document.documentElement.setAttribute('theme', Theme.dark);
      document.body.classList.add(Theme.dark)
      localStorage.setItem('theme', Theme.dark)
    } else {
      document.documentElement.setAttribute('theme', Theme.light);
      document.body.classList.remove(Theme.dark)
      localStorage.setItem('theme', Theme.light)
    }
  }
}
