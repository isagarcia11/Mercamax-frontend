import { Component } from '@angular/core';
import { AuthService } from '../../services/services/auth.service';

@Component({
  selector: 'app-security',
  imports: [],
  standalone: true,
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  qrCodeUrl: string = '';
  secretKey: string = '';
  verificationCode: string = '';

  constructor(private authService: AuthService) { }

  activate2fa() {
    this.authService.activateTwoFactorAuth().subscribe(
      (response: any) => {
        this.qrCodeUrl = response.qr_code_url;
        this.secretKey = response.secret_key;
      }
    );
  }

  verify2fa() {
    this.authService.verifyTwoFactorAuth(this.verificationCode).subscribe(
      response => {
        console.log('2FA verified successfully', response);
      },
      error => {
        console.error('2FA verification failed', error);
      }
    );
  }

}
