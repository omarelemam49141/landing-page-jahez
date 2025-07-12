import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/themes.service';
import { sharedImports } from '../../imports/sharedImports';

@Component({
  selector: 'app-theme-gearbox',
  standalone: true,
  imports: [sharedImports],
  templateUrl: './theme-gearbox.component.html',
  styleUrl: './theme-gearbox.component.scss'
})
export class ThemeGearboxComponent {
  //properties
  themes = [
    { name: 'Default', value: 'theme-default' },
    { name: 'Dark', value: 'theme-dark' },
    { name: 'Blue', value: 'theme-blue' },
  ];

  //injection
  private themesService = inject(ThemeService);

  //methods
  changeTheme(theme: string): void {
    this.themesService.setTheme(theme);
  }
}
