import { Routes } from '@angular/router';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { MemberList } from '../features/members/member-list/member-list';
import { Home } from '../features/home/home';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'members',component:MemberList},
    {path:'members/:id',component:MemberDetailed},
    {path:'list',component:Lists},
    {path:'messages',component:Messages},
    {path:'**',redirectTo:'',pathMatch:'full'},
];
