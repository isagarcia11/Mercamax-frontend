import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  
  activeSubmenu: string | null = null;

  toggleSubmenu(submenuName: string) {
    
    this.activeSubmenu = this.activeSubmenu === submenuName ? null : submenuName;
  }

}
