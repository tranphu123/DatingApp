/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoListComponent } from './po-list.component';

describe('PoListComponent', () => {
  let component: PoListComponent;
  let fixture: ComponentFixture<PoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
