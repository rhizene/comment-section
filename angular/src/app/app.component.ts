import { Component } from '@angular/core';
import { CommentService } from './comment/comment.service';
import { UserComment } from './comment/user-comment.model';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comment-section';
  dataItems:UserComment[] = [];
  

  constructor(
    private commentsService:CommentService,
    ){
      commentsService.commentsUpdate.subscribe({
        next: comments =>{
          this.dataItems = comments
        }
      })
    this.refresh();
  }

  refresh(){
    Promise.all([
      this.commentsService.getComments()
    ])
    .then(([
      comments
    ])=>{
      this.dataItems = comments;
    });
  }
}

