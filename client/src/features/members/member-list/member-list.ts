import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Member, MemberParams } from '../../../types/member';
import { MemberCard } from "../member-card/member-card";
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from "../../../shared/paginator/paginator";
import { FilterModal } from '../filter-modal/filter-modal';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModal],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList implements OnInit {
  @ViewChild('filterModal') modal!: FilterModal; // Référence au composant FilterModal
  private memberService = inject(MemberService);
  protected paginatedMembers =signal<PaginatedResult<Member>| null>(null);
  memberParams = new MemberParams();

  
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.memberParams).subscribe({
      next: (members) => {
        this.paginatedMembers.set(members);
      },
      error: (error) => {
        console.error('Error loading members:', error);
      }
    });
  }
  
  // Gestion du changement de page
  onPageChanged(event :{pageNumber:number, pageSize:number}){
    this.memberParams.pageNumber = event.pageNumber;
    this.memberParams.pageSize = event.pageSize;
    this.loadMembers();
  }

  // Méthode pour ouvrir le modal de filtrage
  openModal(){
    this.modal.open();
  }

  // Méthode appelée lors de la fermeture du modal
  onClose(){
    console.log('Filter modal closed');
  }

  // Méthode appelée lors de la soumission des données de filtrage
  onFilterChange(data: MemberParams){
    console.log('Filter data received:', data);
  }

  resetFilters(){
    this.memberParams = new MemberParams();
    this.loadMembers();
  }
}
