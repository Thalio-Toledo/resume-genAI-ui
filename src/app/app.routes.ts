import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ResumeTemplateComponent } from './resume-template.component';
import { ProfileComponent } from './views/profile/profile.component';

export const routes: Routes = [
  // {
  //   path: 'registration',
  //   component: RegistrationComponent,
  // },
  {
    path: 'registration/:id',
    component: RegistrationComponent,
  },
   {
    path: 'resume/:id',
    component: ResumeTemplateComponent,
  },
   {
    path: 'profiles',
    component: ProfileComponent,
  },
];
