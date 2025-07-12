import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: string = 'theme-default';

  setTheme(theme: string): void {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    document.body.className = ''; // Clear existing themes
    document.body.classList.add(this.theme);
  }

  getTheme(): string {
    return this.theme;
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'theme-default';
    this.setTheme(savedTheme);
  }
}
