/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LocaitionComponent } from './Locaition.component';

describe('LocaitionComponent', () => {
  let component: LocaitionComponent;
  let fixture: ComponentFixture<LocaitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
