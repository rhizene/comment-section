import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentService } from './comment/comment.service';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [
    CommentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
