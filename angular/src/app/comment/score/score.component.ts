import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {

  @Input({required:true})
  score:number = 0;

  upvoteScore() {
    this.score += 1;
    //.then(handleSort)
  }
  downvoteScore() {
    this.score -= 1;
    //.then(handleSort)
  }
  
  // handleSort = ()=>dispatch(sortComments())

}
