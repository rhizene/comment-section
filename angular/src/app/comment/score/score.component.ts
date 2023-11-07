import { Component, Input } from '@angular/core';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {

  @Input({required:true})
  commentId:number = 0;

  @Input({required:true})
  score:number = 0;

  constructor(private commentService:CommentService){

  }

  upvoteScore() {
    this.commentService.upvote(this.commentId);
    //.then(handleSort)
  }
  downvoteScore() {
    this.commentService.downvote(this.commentId);
    //.then(handleSort)
  }
  
  // handleSort = ()=>dispatch(sortComments())

}
