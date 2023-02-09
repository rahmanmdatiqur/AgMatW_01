import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZooViewComponent } from './zoo-view.component';

describe('ZooViewComponent', () => {
  let component: ZooViewComponent;
  let fixture: ComponentFixture<ZooViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZooViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZooViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
