import { Component, inject,  output } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';
import { TextInput } from '../../../shared/text-input/text-input';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,JsonPipe,TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register  {
  
   //membersFromHome = input.required<User[]>(); // laisser sans protected pour que cela soit public pour recuerer du parent
   private accountService = inject(AccountService);
   private fb = inject(FormBuilder)
   cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected registerForm: FormGroup ;

  constructor(){
this.registerForm = this.fb.group({
      // définir les contrôles du formulaire ici
      email: ['',[ Validators.required, Validators.email]],
      displayName: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      confirmPassword: ['',[ Validators.required, this.matchValues('password')]]
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
      return control.value === matchValue ? null : {passwordMismatch: true};
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
