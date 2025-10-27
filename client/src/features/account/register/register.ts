import { Component, inject, OnInit, output } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  
   //membersFromHome = input.required<User[]>(); // laisser sans protected pour que cela soit public pour recuerer du parent
   private accountService = inject(AccountService);
   cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.registerForm = new FormGroup({
      // définir les contrôles du formulaire ici
      email: new FormControl('johndoe@test.com',[ Validators.required, Validators.email]),
      displayName: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(20)]),
      confirmPassword: new FormControl('',[ Validators.required, this.matchValues('password')])
    });
    // pour que le confirmPassword se mette à jour à chaque changement de password
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>{
        this.registerForm.controls['confirmPassword'].updateValueAndValidity();
      }
    });
  }

  matchValues(matchTo:string){
    return (control:AbstractControl) : Validators | null => {
      const parent = control.parent;
      if(!parent) return null;
      const matchValue = parent.get(matchTo)?.value;
      if(control.value === matchValue) return null;
      return {isMatching:true};
    }
  }
  register(){
    console.log(this.registerForm.value);
    // this.accountService.register(this.creds).subscribe({
    //   next: response => {
    //     console.log(response);
    //     this.cancel();
    //   },
    //   error: error => {
    //     console.log(error);
    //   }
    // }); // ajouter gestion erreur
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
