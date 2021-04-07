import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm : FormGroup;
  maxDate: Date;
  // we have to initialize validationErrors. Because in html we compare >0. If not initialized then undefined and we have error.
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private toastr:ToastrService, private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    //We set the max date in order datepicker dont allow selection below 18 years old
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      // Initial value and validators in brackets cause of fb service
      gender : ['male'],
      username : ['',Validators.required],
      knownAs : ['',Validators.required],
      dateOfBirth : ['',Validators.required],
      city : ['',Validators.required],
      country : ['',Validators.required],
      //if we need more validators we put it in brackets []
      password : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(16)]],
      confirmPassword : ['',[Validators.required,this.matchValues('password')]]
    });
    //Also when the control "password" of register form (above) changes value, we subscribe to the
    // observable and tell to confirmPassword Values and Validity (length and not null) )
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }
  //We create a custom validator called matchValues to check if 2 password texts match. We declare that we return a validatorFn(function) with :
  matchValues(matchTo:string) : ValidatorFn {
    return (control: AbstractControl) => {
      //in initializeForm we add this validator to ConfirmPassword. It will compare with the value of the FormControl that will be passed. 
      //This case, password Form control. This is declare in Initialize
      return control?.value === control?.parent?.controls[matchTo].value? null : {isMatching : true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationErrors = error;
    })
    console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}