import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZooEditComponent } from './zoo-edit.component';

describe('ZooEditComponent', () => {
  let component: ZooEditComponent;
  let fixture: ComponentFixture<ZooEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZooEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZooEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
