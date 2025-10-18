import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Member } from '../../../types/member';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive,RouterOutlet, AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit{
 
  private memeberService  = inject(MemberService);
  private route = inject(ActivatedRoute); // permet d'acceder aux route parameters
  private router = inject(Router);
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  protected title=signal<string | undefined>('Profile');
  protected isCurrentUser = computed(()=>{
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })

 ngOnInit(): void {
    this.route.data.subscribe({
      next:data => this.memberService.member.set(data['member'])
    }); // data from resolver charger avant
    this.title.set(this.route.firstChild?.snapshot?.title);

    // events to change route title dynamically
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => {
        this.title.set(this.route.firstChild?.snapshot?.title);
      }
    })
  }
}
