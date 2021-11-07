import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  group: FormGroup;

  constructor(private router: Router) {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  ngOnInit(): void {}

  login() {
    const { email, password } = this.group.value;
    Auth.signIn(email, password)
      .then((user) => {
        console.log(user);
        this.router.navigate(['/clients']);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
