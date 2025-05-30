import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeExplanatorComponent } from './code-explanator.component';

describe('CodeExplanatorComponent', () => {
  let component: CodeExplanatorComponent;
  let fixture: ComponentFixture<CodeExplanatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeExplanatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeExplanatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
