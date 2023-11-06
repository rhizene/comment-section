import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';
import { CommentService } from '../comment.service';
import { UserComment } from '../user-comment.model';
import { User } from 'src/app/user/user.model';

enum ADD_COMPONENT_STYLECLASS {
  wrapper=  "addCommentWrapper",
  replying = "replying",
}

@Component({
  selector: 'app-addcomment',
  templateUrl: './addcomment.component.html',
  styleUrls: ['./addcomment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddcommentComponent implements OnInit {
  @Input()
  replyTo?:string;

  userImage:string = '';
  currentUser:User = User.EMPTY;

  activeFieldClass:'active' | '' = '';
  commentField:FormControl<string> = new FormControl('', {nonNullable: true});

  private _componentClass:ADD_COMPONENT_STYLECLASS[] = [ADD_COMPONENT_STYLECLASS.wrapper];
  get componentClass (){
    return this._componentClass.join(' ');
  }

  constructor(
    private cd: ChangeDetectorRef,
    private userService:UserService,
    private commentService:CommentService,
     ){ }

  ngOnInit(){
    if(this.replyTo!== undefined){
      this._componentClass.push(ADD_COMPONENT_STYLECLASS.replying);
      this.cd.markForCheck(); 
    }

    this.userService.fetchCurrentUser()
      .then(user=>{
        this.currentUser = user;
        this.userImage = user.image.png;
        this.cd.detectChanges();
      })
  }

  setIsFieldActive(isActive:boolean){
    this.activeFieldClass = isActive? 'active':'';
  }

  submitComment(){
    const creationDate = new Date();
    this.commentService.addComment(new UserComment({
      user: this.currentUser,
      content: this.commentField.value,
      id: creationDate.getTime(),
      createdAt: creationDate.toString(),
    }))
    .then(()=>this.commentField.reset());
  }

}
