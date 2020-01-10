import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    name: [''],
    email: ['', [Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required]]
  });

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  ngOnInit() {
  }

  onSubmit() {
     if (this.loginForm.invalid ) {
       console.log('invalid' );
     }
     console.log(this.loginForm.value);
  }
}
