import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestandoComponent } from './testando.component';

describe('TestandoComponent', () => {
  let component: TestandoComponent;
  let fixture: ComponentFixture<TestandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestandoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
