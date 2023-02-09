import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZooCreateComponent } from './zoo-create.component';

describe('ZooCreateComponent', () => {
  let component: ZooCreateComponent;
  let fixture: ComponentFixture<ZooCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZooCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZooCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
