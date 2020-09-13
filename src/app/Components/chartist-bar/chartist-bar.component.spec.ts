import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartistBarComponent } from './chartist-bar.component';

describe('ChartistBarComponent', () => {
  let component: ChartistBarComponent;
  let fixture: ComponentFixture<ChartistBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartistBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartistBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
