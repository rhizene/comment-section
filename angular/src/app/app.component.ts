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
    private userService:UserService,
    ){
    Promise.all([
      this.commentsService.getComments(),
      this.userService.fetchCurrentUser(),
    ])

    .then(([
      comments,
      currentUser,
    ]) => {
        this.dataItems = comments;
      });


  }
}

