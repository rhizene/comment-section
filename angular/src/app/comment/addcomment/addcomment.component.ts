import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

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
  username:string = '';
  activeFieldClass:'active' | '' = '';
  commentField:FormControl<string|null> = new FormControl('');

  private _componentClass:ADD_COMPONENT_STYLECLASS[] = [ADD_COMPONENT_STYLECLASS.wrapper];
  get componentClass (){
    return this._componentClass.join(' ');
  }

  constructor(
    private cd: ChangeDetectorRef,
    private userService:UserService,
     ){ }

  ngOnInit(){
    if(this.replyTo!== undefined){
      this._componentClass.push(ADD_COMPONENT_STYLECLASS.replying);
      this.cd.markForCheck(); 
    }

    this.userService.fetchCurrentUser()
      .then(user=>{
        this.userImage = user.image.png;
        this.username = user.username;
        this.cd.detectChanges();
      })
  }

  setIsFieldActive(isActive:boolean){
    this.activeFieldClass = isActive? 'active':'';
  }

  submitComment(){
    throw new Error('not implemented');
  }

}
