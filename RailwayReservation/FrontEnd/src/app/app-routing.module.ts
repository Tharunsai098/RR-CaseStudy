import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TrainFormComponent } from './train-form/train-form.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { IssueFormUserComponent } from './issue-form-user/issue-form-user.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { TrainListComponent } from './train-list/train-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentappComponent } from './paymentapp/paymentapp.component';
import { NewhomeComponent } from './newhome/newhome.component';

const routes: Routes = [
 
 
  {path:'newhome', component:NewhomeComponent},
  { path: '', redirectTo: '/newhome', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login', pathMatch: 'full' },
  {path:'home',component:HomePageComponent},
  {path:'login', component: SigninComponent},
  {path:'register', component: SignupComponent},
  {path:'addtrain', component: TrainFormComponent},
  {path:'bookingTicket', component: BookingFormComponent},
  {path:'issueUserForm', component: IssueFormUserComponent},
  {path:'navbar', component: NavbarAdminComponent}, 
  {path:'trainList', component: TrainListComponent},
  {path:'userList', component:UserListComponent},
  {path:'bookingList', component:BookingListComponent},
  {path:'searching', component:SearchTrainsComponent},
  {path: 'issueList', component:IssueListComponent},
  {path:'paymentlist',component:PaymentlistComponent},
  {path:'profile',component:MyProfileComponent},
  {path:'pay',component:PaymentappComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
