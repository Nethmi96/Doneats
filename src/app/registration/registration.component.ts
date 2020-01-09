import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../services/authentication.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  types = ['Food Outlet', 'Charity Organization'];
  ratings = ['0', '1', '2', '3', '4', '5'];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private _authService: AuthenticationService
  ) {}

  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  contactNumPattern = '^((\\+91-?)|0)?[0-9]{9}$';

  get name() {
    return this.registrationForm.get('name');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get number() {
    return this.registrationForm.get('number');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get address() {
    return this.registrationForm.get('address');
  }

  get regNo() {
    return this.registrationForm.get('regNo');
  }

  get hygieneRating() {
    return this.registrationForm.get('hygieneRating');
  }

  get type() {
    return this.registrationForm.get('type');
  }

  registrationForm = this.fb.group({
    name: ['', Validators.required],
    password: ['', [Validators.required]],
    number: [
      '',
      [Validators.required, Validators.pattern(this.contactNumPattern)]
    ],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    address: ['', Validators.required],
    regNo: ['', Validators.required],
    hygieneRating: ['', Validators.required],
    type: ['', Validators.required]
  });

  onSubmit() {
    console.log('Submitted');
    this.submitted = true;
    
    if (this.type.value === 'Charity Organization') {
      this.route.navigate(['chome']);
    }

    if (this.registrationForm.invalid) {
      console.log('Invalid');
      return;
    } else {
      this._authService
        .register(this.registrationForm.value)
        .pipe(first())
        .subscribe(
          data => {
            const r = this.registrationForm.value;
            localStorage.getItem(r);
            localStorage.setItem('userData', JSON.stringify(r));
            console.log(r);

            if (this.type.value === 'Food Outlet') {
              this.route.navigate(['fhome'], data);
            }

            if (this.type.value === 'Charity Organization') {
              this.route.navigate(['chome'], data);
            }
          },
          error => {
            console.log(error);
            if (error.status === 400) {
              // this.toastCtrl.error('Cannot register.\n' + error.error.message);
              console.log('Cannot Register.\n\' + error.error.message');
            } else {
              // this.toastCtrl.error('Server Error');
              console.log('Server Error');
            }
          }
        );
    }
  }

  ngOnInit() {}
}
