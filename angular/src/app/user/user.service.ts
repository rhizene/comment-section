import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import data from 'src/assets/data.json';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser:User = {
    username: '',
    image: {
      png: ''
    }
  }

  constructor() { }

  get isCurrentUserSet(){
    return this.currentUser.username !== '';
  }

  fetchCurrentUser(){
    if(this.isCurrentUserSet) return Promise.resolve(this.currentUser);

    return firstValueFrom(of(data.currentUser))
      .then((currentUser) =>  {
        this.currentUser = new User(currentUser);
        return this.currentUser;
      });
  }
}
