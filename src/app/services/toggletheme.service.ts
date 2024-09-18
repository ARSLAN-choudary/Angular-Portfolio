import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ToggleThemeService {
  private isDarkTheme: boolean = false; // Default to light theme

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Apply the saved theme if available
      this.applyTheme();
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const document = window.document;
      if (this.isDarkTheme) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  // Getter to expose isDarkTheme state
  get currentTheme(): boolean {
    return this.isDarkTheme;
  }
}
