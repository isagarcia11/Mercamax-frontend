import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
   styleUrl: './header.component.scss'

})
export class HeaderComponent {
  userName: string = '';
  // Propiedad para controlar si el menú desplegable está abierto
  isDropdownOpen: boolean = false;

  constructor() {}


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
  logout() {
    console.log('Usuario ha cerrado sesión.');
    this.isDropdownOpen = false;

}
}
