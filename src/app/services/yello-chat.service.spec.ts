import { TestBed } from '@angular/core/testing';

import { YelloChatService } from './yello-chat.service';

describe('YelloChatService', () => {
  let service: YelloChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YelloChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
