import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNoteDialogComponent } from './view-note-dialog.component';

describe('ViewNoteDialogComponent', () => {
  let component: ViewNoteDialogComponent;
  let fixture: ComponentFixture<ViewNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNoteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
