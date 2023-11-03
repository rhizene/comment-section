import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import data from 'src/assets/data.json';
import { User } from './user.model';
const AVATAR_PATH = '/resources/images/avatars'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  fetchCurrentUser(){
    return firstValueFrom(of(data.currentUser))
      .then((currentUser) =>  {
        const userAvatar = currentUser.image.png.split('/').pop();
        return {
          username: currentUser.username,
          image: {
            png: AVATAR_PATH+'/'+ userAvatar
          }
        } as User
      });
  }
}
