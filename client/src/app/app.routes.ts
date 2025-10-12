import { Routes } from '@angular/router';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { MemberList } from '../features/members/member-list/member-list';
import { Home } from '../features/home/home';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'members',component:MemberList},
    {path:'members/:id',component:MemberDetailed},
];
