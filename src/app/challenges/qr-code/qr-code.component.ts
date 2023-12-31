import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [],
  template: `
    <div class="container">
      <img src="assets/images/image-qr-code.png" alt="qr-code" />
      <div class="text-container">
        <p class="title">Improve your front-end skills by building project</p>
        <p class="subtitle">
          Scan the QR code to visit Frontend Mentor and take your coding skills
          to the next level
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent {}
