import { Component, Input } from '@angular/core';
import { FlipProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faShare, faTrash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})

export class IconComponent {
  @Input({required: true})
  iconName:'faPen'|'faShare'|'faTrash'|'none' = 'none';

  @Input()
  flip?:FlipProp;

  get componentIcon(){
    return {
      'faPen':faPen,
      'faShare':faShare,
      'faTrash':faTrash,
      'none': undefined
    }[this.iconName]; 
  };


}
