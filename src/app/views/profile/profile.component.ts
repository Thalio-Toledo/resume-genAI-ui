import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Profile } from '../../models/profile.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ProgressSpinnerModule, CardModule, ButtonModule,TieredMenuModule ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profiles = signal<Profile[]> ([])
  loading = signal(false);
  error = signal<string | null>(null);
  
  constructor(private profileService: ProfileService, private router: Router){
    
  }
  ngOnInit(): void {
    this.getProfiles()
  }

  getProfiles(){
    this.loading.set(true)
    this.profileService.get().subscribe({
        next: data => {
            data.map(data => {
              data.menu = [{
                    label: 'Edit',
                    icon: 'pi pi-pencil',
                    command: ()=> this.openRegistration(data),
                  },
                  {
                    label: 'Delete',
                    icon: 'pi pi-trash'
                  }]
              return data
            })
            this.profiles.set(data);
            this.error.set(null);

          },
        error: err => {
          this.error.set('Erro ao carregar profiles');
        },
        complete: () => {
          this.loading.set(false);
        }
      });
  }

  openRegistration(profile: Profile){
     this.router.navigate([`/registration/${profile.profile_id}`]);
  }


}
