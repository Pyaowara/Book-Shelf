import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user_service/user.service';
import { UserProfileResponse } from '../../../services/user_service/user.respones.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redescription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './redescription.component.html',
  styleUrl: './redescription.component.scss'
})
export class RedescriptionComponent implements OnInit{
  newimg:string = '';
  confrimePass:string = '';
  userData:UserProfileResponse|null = null;
  message:string|undefined = '';
  noti_succes:boolean = false;
  noti_fail:boolean = false;

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private router:Router
  ){};

  async ngOnInit(){
      await this.loadData();
  }

  async update(event: Event){
    event.stopPropagation();
    const confirmation = confirm("Are you sure you want to update your description?");
    if (confirmation){
    try{
      let res = await this.userService.changeDescription(this.userData!.user_id, this.newimg, this.confrimePass);
      await this.cookieService.set('userToken', res!.userToken, 30, '/');
      this.message =  await res?.message;
      window.location.reload();
    }
    catch(err:any){
      this.message = await err.message;
    }}
  }

  async loadData(){
    this.userData = await this.userService.getData();
  }
}
