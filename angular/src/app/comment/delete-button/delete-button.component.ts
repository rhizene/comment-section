import { Component, Input } from '@angular/core';
import { CommentService } from '../comment.service';
import { isNumber } from 'lodash';

@Component({
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input({required: true})
  commentId:number = 0;

  @Input()
  repliedFrom:number|null = null;

  constructor(private commentService:CommentService) {

  }

  delete(){
    if(isNumber(this.repliedFrom)) {
      return this.commentService.delete({
        commentId: this.commentId,
        repliedFrom: this.repliedFrom
      });
    }
    return this.commentService.delete({
      commentId: this.commentId
    });
  }

}
