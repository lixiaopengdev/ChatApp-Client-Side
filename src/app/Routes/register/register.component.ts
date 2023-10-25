import { Component, OnInit } from '@angular/core';
import {animate, group, style, transition, trigger} from '@angular/animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import validate = WebAssembly.validate;
import {AuthenticationService} from '../../Services/authentication.service';
import {SignUp} from '../../models/model';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {Countries} from '../../models/countries';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('scaleIn', [
      transition('void => *', [
        style({
          opacity : 0,
          transform : 'translateX(-50%)'
        }), group([
          animate(250, style({
            opacity : 1
          })), animate(250, style({
            transform : 'translateX(0)'
          }))
        ])
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  // variables
  sendRequest = false;
  registerCountries = JSON.parse(this.country.countriesString);
  // form group
  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z ]*'), Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    age: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}'), Validators.maxLength(2)]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  // interfaces
  signUpData: SignUp = {
    age: null,
    phone: '',
    userName: '',
    gender: '',
    password: '',
    country: '',
  };
  // arraies
  genderArray = [
    {name: 'Male'},
    {name: 'Female'},
  ];
  // Sweet alert
  Toast = Swal.mixin({
    toast: true,
    position: 'top-left',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
  constructor(public auth: AuthenticationService, private router: Router, public country: Countries) { }

  ngOnInit(): void {

  }

  RegisterUser(): void {
    this.sendRequest = true;
    this.signUpData.age = this.registerForm.controls.age.value;
    this.signUpData.phone = this.registerForm.controls.phone.value;
    this.signUpData.userName = this.registerForm.controls.userName.value;
    this.signUpData.gender = this.registerForm.controls.gender.value;
    this.signUpData.password = this.registerForm.controls.password.value;
    this.signUpData.city = this.registerForm.controls.city.value;

    this.auth.registerAuth(this.signUpData).subscribe(res => {
      this.sendRequest = false;
      this.alertSuccess(`${res.data.message}`);
      this.registerForm.reset();
      setTimeout(() => {
        if (localStorage.getItem('chatsapp-token') === null) {
          this.router.navigate(['/login']);
        }
      }, 2500);
    }, err => {this.sendRequest = false; this.alertDanger(`${err.error.error}`); });
  }

  alertSuccess(message: string): void {
    this.Toast.fire({
      icon: 'success',
      title: message
    });
  }

  alertDanger(message: string): void {
    this.Toast.fire({
      icon: 'error',
      title: message
    });
  }
}
