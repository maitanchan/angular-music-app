import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

export class UserRegister {
  uid?: string;
  displayName?: string;
  birth?:string;
  gener?:string;
  email?: string;
  password?:string;
}
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit {

  user: UserRegister = new UserRegister();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  saveGener(): void {
    this.authService.Register(this.user).then(() => {
      alert('Created new item successfully!');
      this.router.navigate(['/client/login']);
    });
  }
  

  newGener(): void {
    this.user = new UserRegister();
  }
}
