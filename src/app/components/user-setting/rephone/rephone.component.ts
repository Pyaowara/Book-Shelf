import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user_service/user.service';
import { UserProfileResponse } from '../../../services/user_service/user.respones.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rephone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rephone.component.html',
  styleUrl: './rephone.component.scss'
})
export class RephoneComponent implements OnInit{
  newPhone:string = '';
  confrimePass:string = '';
  userData:UserProfileResponse|null = null;
  message:string|undefined = '';

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private router:Router
  ){};

  async ngOnInit(){
      await this.loadData();
  }

  isNumeric(value: string): boolean {
    const number = Number(value);
    return !isNaN(number) && Number.isInteger(number);
  }

  async update(event: Event){
    if(this.isNumeric(this.newPhone)){
      event.stopPropagation();
      const confirmation = confirm("Are you sure you want to update your phone number?");
      if (confirmation){
      try{
        let res = await this.userService.changePhone(this.userData!.user_id, this.newPhone, this.confrimePass);
        this.cookieService.set('userToken', res!.userToken, 30, '/');
        this.message =  res?.message;
        window.location.reload();
      }
      catch(err:any){
        console.log('Error:', err);
        this.message = await err.message;
      }
    }}
    else{
      this.message = 'Only number allowed';
    }
  }

  async loadData(){
    this.userData = await this.userService.getData();
  }
}
