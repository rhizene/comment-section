import { Component, Input } from '@angular/core';
import { CommentService } from '../comment.service';

@Component({
  selector: 'delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
  @Input({required: true})
  commentId:number = 0;

  @Input()
  repliedFrom:string|null = null;

  constructor(private commentService:CommentService) {

  }

  delete(){
    this.commentService.delete(this.commentId);
  }

}
