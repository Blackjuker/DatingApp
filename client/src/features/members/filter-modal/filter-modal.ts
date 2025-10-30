import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { MemberParams } from '../../../types/member';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-modal',
  imports: [FormsModule],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.css'
})
export class FilterModal {
 @ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>; // Ajout de ViewChild pour accéder à l'élément dialog

 closeModal = output(); // Événement de sortie pour fermer le modal

 submitData = output<MemberParams>(); // Événement de sortie pour soumettre les données
 memberParams = new MemberParams(); // Paramètres de membre pour le formulaire  


 open() {
   this.modalRef.nativeElement.showModal(); // Ouvre le modal
 }
  close() {
    this.modalRef.nativeElement.close(); // Ferme le modal
    this.closeModal.emit(); // Émet l'événement de fermeture
  }

  submit() {
    this.submitData.emit(this.memberParams); // Émet les données du formulaire
    this.close(); // Ferme le modal après la soumission
  }

  onMinAgeChange() {
    if(this.memberParams.minAge < 18) this.memberParams.minAge = 18;
  }

  onMaxAgeChange() {
    if(this.memberParams.maxAge < this.memberParams.minAge){
      this.memberParams.maxAge = this.memberParams.minAge;
    }
  }
}
