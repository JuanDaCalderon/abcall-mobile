import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {Subscription} from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  const subscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterAll(() => {
    subscriptions.forEach((s) => s.unsubscribe());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return concatenated email and password', (done: DoneFn) => {
    const email = 'test@example.com';
    const password = '123456';
    subscriptions.push(
      service.login(email, password).subscribe((result) => {
        expect(result).toBe(email + '----' + password);
        done();
      })
    );
  });
});
