import { TestBed } from '@angular/core/testing';

import { TogglethemeService } from './toggletheme.service';

describe('TogglethemeService', () => {
  let service: TogglethemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglethemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
