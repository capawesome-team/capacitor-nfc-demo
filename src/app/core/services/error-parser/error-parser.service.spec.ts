import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TimeoutError } from 'rxjs';
import { ErrorParserService } from './error-parser.service';

describe('ErrorParserService', () => {
  let service: ErrorParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Error', () => {
    it('should return the default error message', () => {
      const defaultErrorMessage = 'An unknown error has occurred.';
      const result = ErrorParserService.getMessageFromUnknownError({});
      expect(result).toBe(defaultErrorMessage);
    });

    it('should return the error message', () => {
      const error = new Error('Error message');
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(error.message);
    });

    it('should return the rejection error message', () => {
      const error = { rejection: new Error('Error message') };
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(error.rejection.message);
    });
  });

  describe('HttpErrorResponse', () => {
    it('should return the default error message', () => {
      const defaultErrorMessage = 'An unknown network error has occurred.';
      const error = new HttpErrorResponse({ status: 999 });
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(defaultErrorMessage);
    });

    it('should return the error message for unknown `status`', () => {
      const defaultErrorMessage = [
        'No connection could be established.',
        'Please check your internet connection and try again later.',
      ].join(' ');
      const error = new HttpErrorResponse({});
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(defaultErrorMessage);
    });

    it('should return the error message for `status` === 0', () => {
      const defaultErrorMessage = [
        'No connection could be established.',
        'Please check your internet connection and try again later.',
      ].join(' ');
      const error = new HttpErrorResponse({
        status: 0,
      });
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(defaultErrorMessage);
    });

    it('should return the error message for `status` < 0', () => {
      const defaultErrorMessage = [
        'No connection could be established.',
        'Please check your internet connection and try again later.',
      ].join(' ');
      const error = new HttpErrorResponse({
        status: -1,
      });
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(defaultErrorMessage);
    });

    it('should return the error message for `status` === 500', () => {
      const defaultErrorMessage = [
        'An internal server error has occurred.',
        'Please try again later.',
      ].join(' ');
      const error = new HttpErrorResponse({
        status: 500,
      });
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(defaultErrorMessage);
    });

    it('should return the error reponse message property for `status` === 404', () => {
      const errorMessage = 'Workspace not found.';
      const error = new HttpErrorResponse({
        status: 404,
        error: {
          message: errorMessage,
        },
      });
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(errorMessage);
    });

    it('should return the error reponse message property for `status` === 500', () => {
      const errorMessage = 'Currently not available.';
      const error = new HttpErrorResponse({
        status: 500,
        error: {
          message: errorMessage,
        },
      });
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(errorMessage);
    });
  });

  describe('TimeoutError', () => {
    it('should return the default error message', () => {
      const defaultErrorMessage = [
        'A timeout occurred.',
        'Please check your internet connection and try again later.',
      ].join(' ');
      const error = new TimeoutError();
      const result = ErrorParserService.getMessageFromUnknownError(error);
      expect(result).toBe(defaultErrorMessage);
    });
  });
});
