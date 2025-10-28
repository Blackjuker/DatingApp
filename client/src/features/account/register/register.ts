import { Component, inject,  output, signal } from '@angular/core';
import { RegisterCreds } from '../../../types/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { TextInput } from '../../../shared/text-input/text-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register  {
  
   //membersFromHome = input.required<User[]>(); // laisser sans protected pour que cela soit public pour recuerer du parent
   private accountService = inject(AccountService);
   private router = inject(Router);
   private fb = inject(FormBuilder)
   cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  protected credentialsForm: FormGroup ;
  protected profileForm: FormGroup ;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  constructor(){
this.credentialsForm = this.fb.group({
      // définir les contrôles du formulaire ici
      email: ['',[ Validators.required, Validators.email]],
      displayName: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(20)]],
      confirmPassword: ['',[ Validators.required, this.matchValues('password')]]
    });

    this.profileForm = this.fb.group({
      gender : ['', Validators.required],
      dateOfBirth : ['', Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required]
    })
    // pour que le confirmPassword se mette à jour à chaque changement de password
    this.credentialsForm.controls['password'].valueChanges.subscribe({
      next:()=>{
        this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
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

  nextStep(){
    if(this.credentialsForm.valid){
      this.currentStep.update(prevStep => prevStep + 1);
    }
  }

  getMaxDate(){
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  }

  prevStep(){
    this.currentStep.update(prevStep => prevStep - 1);
  }
  
  register(){
    if(this.profileForm.valid && this.credentialsForm.valid){
      const formData = {...this.credentialsForm.value, ...this.profileForm.value};
      this.accountService.register(formData).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.cancel();
      },
      error: error => {
        console.log(error);
        this.validationErrors.set(error);
      }
    }); // ajouter gestion erreur
    }
    
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
