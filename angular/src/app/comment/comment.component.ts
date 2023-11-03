import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { UserComment } from './user-comment.model';
import { UserService } from '../user/user.service';
import { format, formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit{
  @Input({required: true})
  comment:UserComment = UserComment.EMPTY;

  @Input()
  repliedFrom:number|null = null;

  commentStyle:string = 'comments';
  private _commentDate:string = '';
  get commentDate(){
    return this._commentDate;
  }

  private _commentSince:string = '';
  get commentSince(){
    return this._commentSince;
  }

  private _isOwnComment = false;
  get isOwnComment() {
    return this._isOwnComment
  };

  constructor(
    private userService:UserService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){

    if(this.comment.replies.length > 0) {
      this.commentStyle += ' withReplies';
    };
    
    this._commentDate = format(this.comment.createdAt, 'MMMM d, yyyy hh:mm aa');
    this._commentSince = formatDistanceToNow(this.comment.createdAt, {addSuffix: true});
    this.cd.markForCheck();
    


    this.userService.fetchCurrentUser()
      .then(user=>{
        this._isOwnComment = this.comment.user.username === user.username;
        this.cd.markForCheck();
      })
      .finally(()=>this.cd.detectChanges())
    

  }

}
