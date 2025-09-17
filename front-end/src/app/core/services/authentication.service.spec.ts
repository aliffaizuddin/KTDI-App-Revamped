import {TestBed} from '@angular/core/testing';
import {AuthenticationService} from './authentication.service';
import {HttpTestingController} from '@angular/common/http/testing';
import {LoginCredentials, LoginResponse} from '../models/ktdi';
import { environment } from '../../../environments/environment';


describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should perform login and return login response', () => {
    const mockCredentials: LoginCredentials = {email: 'test', password: '12345678'};
    const mockResponse: LoginResponse = {token: '123', user_id: 1, role: 'user' };
    service.login$(mockCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
    })
    const req = httpMock.expectOne(`${environment.API_URL}/login?username=test&password=1234`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  })
});
