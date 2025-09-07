import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { NotificationsService } from '../services/notifications.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [NotificationsService],
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
  isNotificationsOpen: boolean = false;
  notifications: any[] = [];
  unreadNotifications: number = 0;

  constructor(private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.fetchNotifications();
  }

  // Método para obtener las notificaciones del servicio
  fetchNotifications() {
    this.notificationsService.getNotifications().subscribe(
      (data) => {
        this.notifications = data;
        this.updateUnreadCount();
      },
      (error) => {
        console.error('Error al obtener las notificaciones', error);
      }
    );
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isNotificationsOpen) {
      this.isNotificationsOpen = false;
    }
  }

  toggleNotifications(){
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if(this.isDropdownOpen){
      this.isDropdownOpen=false;
    }
  }

  // Método para actualizar el contador de notificaciones no leídas
  updateUnreadCount() {
    this.unreadNotifications = this.notifications.filter(notif => !notif.read).length;
  }

  // Método para marcar todas las notificaciones como leídas
  markAllAsRead() {
    // Llama a un método del servicio para actualizar el estado en el backend
    this.notificationsService.markAllAsRead().subscribe(
      () => {
        // Si la llamada al backend es exitosa, actualiza el estado local
        this.notifications.forEach(notif => notif.read = true);
        this.updateUnreadCount();
      },
      (error) => {
        console.error('Error al marcar las notificaciones como leídas', error);
      }
    );
  }

  //Pendiente métod
  logout() {
    
    console.log('Usuario ha cerrado sesión.');
    this.isDropdownOpen = false;

}
}