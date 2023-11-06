import { Injectable } from '@angular/core';
import data from 'src/assets/data.json';
import {of, firstValueFrom, Subject} from "rxjs";
import { UserComment } from './user-comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments:UserComment[] = [];
  
  constructor() {

  }

  async getComments():Promise<UserComment[]> {
    if(this.comments.length > 0) return Promise.resolve(this.comments);

    return this.fetchComments();
  }

  private async fetchComments(){
    return await firstValueFrom(of(data.comments))
      .then(result => 
        result.map(commentData => new UserComment(commentData) )
      )
      .then(mappedComments => this.comments = mappedComments);
  }

  addComment(newComment: UserComment) {
    this.comments.push(newComment);
    return Promise.resolve();
  }

}
