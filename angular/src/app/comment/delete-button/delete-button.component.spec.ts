import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from 'src/app/icon/icon.component';
import { DeleteButtonComponent } from './delete-button.component';
import { CommentService } from '../comment.service';

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;
  let commentService:CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeleteButtonComponent,
        IconComponent,
      ],
      providers: [
        CommentService,
      ],
      imports: [
        FontAwesomeModule
      ],
    });
    commentService = TestBed.inject(CommentService);
    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete', ()=>{
    spyOn(commentService, 'delete');
    component.delete();

    expect(commentService.delete).toHaveBeenCalled();
  })
});
