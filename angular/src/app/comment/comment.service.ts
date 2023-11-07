import { Injectable } from '@angular/core';
import data from 'src/assets/data.json';
import {of, firstValueFrom, Subject, lastValueFrom} from "rxjs";
import { UserComment } from './user-comment.model';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  private comments:UserComment[] = [];
  readonly commentsUpdate:Subject<UserComment[]> = new Subject();
  
  constructor() {

  }

  private getStoredComments(){
    return this.comments;
  }

  async getComments() {
    const currentComments = this.getStoredComments();
    if(currentComments.length > 0) {
      return Promise.resolve(currentComments);
    };

    return this.fetchComments();
  }

  private async fetchComments(){
    return (firstValueFrom(of(data.comments)))
      .then(comments => {
        this.comments = comments.map(commentData => new UserComment(commentData) );
        return this.comments
      });
  }

  addComment(newComment: UserComment):Promise<UserComment[]> {
    const comments = this.getStoredComments();
    comments.push(newComment);
    return Promise.resolve(comments);
  }

  async editComment(id:number, content:string) {
    const clonedComments = _.cloneDeep(this.getStoredComments()) as UserComment[];
    const editedComment = UserComment.findById(clonedComments, id);
    if(editedComment === null){
      throw new Error('comment id not found: ' + id);
    }
    editedComment.content = content;
    this.comments = clonedComments;
    this.commentsUpdate.next(this.comments);
  }

  reply(repliedCommentId: number, reply: UserComment) {
    const updatedComments = _.cloneDeep(this.getStoredComments());
    const repliedComment = UserComment.findById(updatedComments, repliedCommentId);
    if(repliedComment === null) throw new Error('Replied comment not found: '+repliedCommentId);
    repliedComment.addReply(reply);
    this.comments = updatedComments;

    this.commentsUpdate.next(this.comments);
    return Promise.resolve(this.comments);
  }

  delete(targetId: number, repliedFrom?:number) {
    const commentsCopy = _.cloneDeep(this.getStoredComments())
                          .filter(comment => comment.id !== targetId);
    this.comments = commentsCopy;
    this.commentsUpdate.next(this.comments);
  }

}
