import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { MemberParams } from '../../../types/member';

@Component({
  selector: 'app-filter-modal',
  imports: [],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.css'
})
export class FilterModal {
 @ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>; // Ajout de ViewChild pour accéder à l'élément dialog

 closeModal = output(); // Événement de sortie pour fermer le modal

 submitData = output<MemberParams>(); // Événement de sortie pour soumettre les données

 open() {
   this.modalRef.nativeElement.showModal(); // Ouvre le modal
 }
  close() {
    this.modalRef.nativeElement.close(); // Ferme le modal
    this.closeModal.emit(); // Émet l'événement de fermeture
  }

  submit() {
    this.submitData.emit(new MemberParams()); // Émet les données du formulaire
    this.close(); // Ferme le modal après la soumission
  }
}
