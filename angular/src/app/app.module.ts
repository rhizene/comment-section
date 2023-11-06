import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentService } from './comment/comment.service';
import { CommentComponent } from './comment/comment.component';
import { UserService } from './user/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './icon/icon.component';
import { AddcommentComponent } from './comment/addcomment/addcomment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScoreComponent } from './comment/score/score.component';

const DATA_PROVIDERS = [
  CommentService,
  UserService,
];

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    IconComponent,
    AddcommentComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: DATA_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
