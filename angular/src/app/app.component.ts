import { Component } from '@angular/core';
import { CommentService } from './comment/comment.service';
import { UserComment } from './comment/user-comment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comment-section';
  dataItems:UserComment[] = []; 

  constructor(private commentsService:CommentService){
    commentsService.getComments()
      .then(data => {
        this.dataItems = data
      })
      ;


  }
}

