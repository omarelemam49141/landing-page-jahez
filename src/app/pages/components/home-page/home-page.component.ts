import { Component } from '@angular/core';
import { NavbarComponent } from "../../../core/components/navbar/navbar.component";
import { HeaderComponent } from "../../../core/components/header/header.component";
import { ServicesComponent } from "../../../core/components/services/services.component";
import { FeaturesComponent } from "../../../core/components/features/features.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, ServicesComponent, FeaturesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {}
