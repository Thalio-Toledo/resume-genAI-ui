import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGen } from './resume-gen';

describe('ResumeGen', () => {
  let component: ResumeGen;
  let fixture: ComponentFixture<ResumeGen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeGen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeGen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
