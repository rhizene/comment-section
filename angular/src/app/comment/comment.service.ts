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
    const editedComment = this.findComment(clonedComments, id);

    editedComment.content = content;
    this.comments = clonedComments;
    this.commentsUpdate.next(this.comments);
  }

  reply(repliedCommentId: number, reply: UserComment) {
    const updatedComments = _.cloneDeep(this.getStoredComments());
    const repliedComment = this.findComment(updatedComments, repliedCommentId);
    repliedComment.addReply(reply);
    this.comments = updatedComments;

    this.commentsUpdate.next(this.comments);
    return Promise.resolve(this.comments);
  }

  
  delete({
    commentId,repliedFrom
  }:DeleteCommentParams) {
    const commentsCopy = _.cloneDeep(this.getStoredComments())

      if(repliedFrom === undefined) {
        this.comments = commentsCopy.filter((comment:UserComment) => comment.id !== commentId);
      } else {

        const parentComment = this.findComment(commentsCopy, repliedFrom)
        parentComment.deleteReply(commentId);
        this.comments = commentsCopy;
      }
      this.commentsUpdate.next(this.comments);
  }

  upvote(commentId: number) {
    this.handleScore(commentId, 'upvote');
  }

  downvote(commentId: number) {
    this.handleScore(commentId, 'downvote');
  }

  private handleScore(commentId:number, mode:'upvote'|'downvote') {
    const copy = _.cloneDeep(this.getStoredComments());
    const comment = this.findComment(copy, commentId);

    if(mode === 'upvote') {
      comment.upvote();
    } else {
      comment.downvote();
    }
    this.comments = copy;
    this.handleSort();
  }

  private findComment(commentArray:UserComment[], commentId:number){
    const comment = UserComment.findById(commentArray, commentId);
    if(comment === null ) throw new Error('Comment not found. Id: ' + commentId);
    return comment;
  }

  private handleSort(){
    const sortedComments = _.cloneDeep(this.comments);
    sortedComments.sort(
      (previous,next)=>
        UserComment.sort(previous as UserComment,next as UserComment)
      );
    this.comments = sortedComments;

    this.commentsUpdate.next(this.comments);

  }

}

type DeleteCommentParams = {
  commentId: number,
  repliedFrom?:number
}
