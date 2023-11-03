import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentService } from './comment/comment.service';
import { CommentComponent } from './comment/comment.component';
import { UserService } from './user/user.service';

const DATA_PROVIDERS = [
  CommentService,
  UserService,
];

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: DATA_PROVIDERS,
  bootstrap: [AppComponent]
})
export class AppModule { }
