import { TestBed } from '@angular/core/testing';

import { ContactContentService } from './contact-content.service';

describe('ContactContentService', () => {
  let service: ContactContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
