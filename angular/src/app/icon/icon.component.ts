import { Component, Input } from '@angular/core';
import { FlipProp, IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faShare, faPen } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
})

export class IconComponent {
  @Input({required: true})
  iconName:'faPen'|'faShare'|'none' = 'none';

  @Input()
  flip?:FlipProp;

  get componentIcon(){
    return {
      'faPen':faPen,
      'faShare':faShare,
      'none': undefined
    }[this.iconName]; 
  };


}