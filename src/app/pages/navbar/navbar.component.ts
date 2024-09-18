import { Component } from '@angular/core';
import { ToggleThemeService } from '../../services/toggletheme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  navopen=false
  isDarkTheme = false;

  constructor(public themeService: ToggleThemeService) {
    this.isDarkTheme = this.themeService.currentTheme;
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme();
  }
  togglenav(){
this.navopen=!this.navopen
  }
}
