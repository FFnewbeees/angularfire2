import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm:FormGroup;
  constructor(
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private router:Router) 
    { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6) ]]
    });
  }

  signIn( formData ){
    this.authService.signIn( formData.email, formData.password )
    .then( (response) => {
      console.log(response);
      this.router.navigate(['/home']);
      
    })
    .catch( (error) => {
      console.log(error);
      
    })
  }

}
