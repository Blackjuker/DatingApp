import { Component, inject, OnInit, output } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      email: new FormControl(),
      displayName: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
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
