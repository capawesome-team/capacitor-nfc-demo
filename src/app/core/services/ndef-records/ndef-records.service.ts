import { Injectable } from '@angular/core';
import { NdefRecord } from '@capawesome-team/capacitor-nfc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NdefRecordsService {
  private readonly recordsSubject = new BehaviorSubject<NdefRecord[]>([]);

  public get records$(): Observable<NdefRecord[]> {
    return this.recordsSubject.asObservable();
  }

  public addRecord(record: NdefRecord): void {
    const records = this.recordsSubject.getValue();
    this.recordsSubject.next([...records, record]);
  }

  public getRecords(): NdefRecord[] {
    return this.recordsSubject.getValue();
  }

  public removeNdefRecordAtIndex(index: number): void {
    const records = this.recordsSubject.getValue();
    records.splice(index, 1);
    this.recordsSubject.next([...records]);
  }
}
