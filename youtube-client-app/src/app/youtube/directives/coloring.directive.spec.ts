import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ColoringDirective } from './coloring.directive';

let renderer2: Renderer2;
let el: ElementRef;

describe('ColoringDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer2],
    });
  });

  it('should create an instance', () => {
    const directive = new ColoringDirective(renderer2, el);
    expect(directive).toBeTruthy();
  });
});
