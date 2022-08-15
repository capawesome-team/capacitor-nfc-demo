import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorParserService {
  public static readonly nfcIframeError =
    'Web NFC can only be accessed in a top-level browsing context';

  constructor() {}

  /**
   * Create an accessible error message for the user from an unknown error.
   */
  public static getMessageFromUnknownError(error: unknown): string {
    let message = 'An unknown error has occurred.';
    if (error instanceof Object && 'rejection' in error) {
      error = (error as any).rejection;
    }
    if (error instanceof HttpErrorResponse) {
      message = this.getMessageFromHttpErrorResponse(error);
    } else if (error instanceof TimeoutError) {
      message = this.getMessageFromTimeoutError(error);
    } else if (error instanceof Error && error.message) {
      message = this.getMessageFromError(error);
    }
    return message;
  }

  private static getMessageFromHttpErrorResponse(
    error: HttpErrorResponse,
  ): string {
    let message = 'An unknown network error has occurred.';
    if (!error.status || error.status <= 0) {
      message = [
        'No connection could be established.',
        'Please check your internet connection and try again later.',
      ].join(' ');
    } else if (error.error && error.error.message) {
      message = error.error.message;
    } else if (error.status === 500) {
      message = [
        'An internal server error has occurred.',
        'Please try again later.',
      ].join(' ');
    }
    return message;
  }

  private static getMessageFromTimeoutError(error: TimeoutError): string {
    return [
      'A timeout occurred.',
      'Please check your internet connection and try again later.',
    ].join(' ');
  }

  private static getMessageFromError(error: Error): string {
    let message = error.message;
    if (message.includes(ErrorParserService.nfcIframeError)) {
      message =
        'Please open this app in a new tab to continue (see link below).';
    }
    return message;
  }
}
