import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
   styleUrl: './header.component.scss'

})
export class HeaderComponent {
  userName: string = ''; //Se debe de recuperar del back

  
  @Output() toggleMenu = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleMenu.emit();
  }
  
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
