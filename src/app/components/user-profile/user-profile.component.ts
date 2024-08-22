import { Component, OnInit } from '@angular/core';
import { UserProfilePesponse } from '../../services/user_service/user.respones.interface';
import { UserService } from '../../services/user_service/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  constructor(private userService:UserService,
              private authService:AuthService
  ){}

  public userData:UserProfilePesponse | null = null;

  async ngOnInit(){
      let res = await this.userService.getData();
      this.userData = res;
      
  }

  public logout():void{
    this.authService.logout();
  }

  
  

}

