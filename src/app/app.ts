import { Component, signal } from '@angular/core';
import { Header } from './shared/components/header/header';
import { Navbar } from './shared/components/navbar/navbar';
import { AppRoutingModule } from './app.routes';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Navbar, AppRoutingModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
 title = 'Developer Store';

 showToast(msg: string): void {
    const toastEl = document.getElementById('toastMessage')!;
    const toastBody = document.getElementById('toastBody')!;
    toastBody.innerText = msg;

    const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
    bsToast.show();
  }
}
