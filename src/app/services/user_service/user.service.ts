import { Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { UserProfileResponse } from './user.respones.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService{

  private token:string | null = null;

  constructor(private cookieService:CookieService,
              private http: HttpClient
  ) { }

  public async getData(){
    try {
      this.token = this.cookieService.get('userToken');
      return await lastValueFrom(
        this.http.post<UserProfileResponse>(`https://books-shelves.vercel.app/getUserProfile`, { token: this.token })
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async getDataByParam(userName:string|null){
    try {
      return await lastValueFrom(
        this.http.get<UserProfileResponse>(`https://books-shelves.vercel.app/getUserProfile/`+userName)
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  
  public async changeName(userId: string, userName: string, password: string) {
    try {
      return await lastValueFrom(
        this.http.post<{ message: string, userToken: string }>(
          `https://books-shelves.vercel.app/change/user_name`,
          { user_id: userId, data: userName, password: password }
        )
      );
    } catch (err: any) {
      let errorMessage = 'Please fill out all the fields';
      if (err.status === 409) {
        errorMessage = 'Username already exists';
      }
      else if (err.status === 401) {
        errorMessage = 'Invalid password';
      }
      throw { status: err.status, message: errorMessage };
    }
  }

  public async changeEmail(userId:string, userEmail:string, password:string){
    try {
      return await lastValueFrom(
        this.http.post<{message:string, userToken:string}>(`https://books-shelves.vercel.app/change/user_email`, {user_id:userId, data:userEmail, password:password})
      );
    } catch (err:any) {
      let errorMessage = 'Please fill out all the fields';
      if (err.status === 409) {
        errorMessage = 'Email already exists';
      }
      else if (err.status === 401) {
        errorMessage = 'Invalid password';
      }
      throw { status: err.status, message: errorMessage };
    }
  }

  public async changePassword(userId:string, userPassword:string, password:string){
    try {
      return await lastValueFrom(
        this.http.post<{message:string, userToken:string}>(`https://books-shelves.vercel.app/change/user_pass`, {user_id:userId, data:userPassword, password:password})
      );
    } catch (err:any) {
      let errorMessage = 'Please fill out all the fields';
      if (err.status === 401) {
        errorMessage = 'Invalid password';
      }
      throw { status: err.status, message: errorMessage };
    }
  }

  public async changePhone(userId:string, userPhone:string, password:string){
    try {
      return await lastValueFrom(
        this.http.post<{message:string, userToken:string}>(`https://books-shelves.vercel.app/change/user_phone`, {user_id:userId, data:userPhone, password:password})
      );
    } catch (err:any) {
      let errorMessage = 'Please fill out all the fields';
      if (err.status === 401) {
        errorMessage = 'Invalid password';
      }
      throw { status: err.status, message: errorMessage };
    }
  }
}

  
