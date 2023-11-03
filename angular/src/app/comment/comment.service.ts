import { Injectable } from '@angular/core';
import data from 'src/assets/data.json';
import {of, firstValueFrom} from "rxjs";
import { UserComment } from './user-comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() {

  }

  async getComments():Promise<UserComment[]> {
    return await firstValueFrom(of(data.comments))
      .then(result => 
        result.map(commentData => new UserComment(commentData) )
      );
  }
}
