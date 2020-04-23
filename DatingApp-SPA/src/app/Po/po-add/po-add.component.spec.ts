/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PoAddComponent } from './po-add.component';

describe('PoAddComponent', () => {
  let component: PoAddComponent;
  let fixture: ComponentFixture<PoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
