import { Component } from '@angular/core';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AppToastComponent } from './app-toast/app-toast.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,RouterModule,AppToastComponent]
})
export class AppComponent {
  title = 'rent';
  authService: AuthService = new AuthService(this.router)
  constructor(private router: Router){

  }
  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    console.log('Sikeresen kijelentkezett.');
  }
}
