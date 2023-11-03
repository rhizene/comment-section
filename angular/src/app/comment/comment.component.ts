import { Component, Input } from '@angular/core';
import { UserComment } from './user-comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input()
  comment:UserComment = UserComment.EMPTY;

  @Input()
  repliedFrom:number|null = null;

  constructor(){
  }

}
