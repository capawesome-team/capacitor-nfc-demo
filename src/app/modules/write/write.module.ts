import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  CreateNdefAbsoluteUriRecordModalComponent,
  CreateNdefAndroidApplicationRecordModalComponent,
  CreateNdefExternalRecordModalComponent,
  CreateNdefMimeMediaRecordModalComponent,
  CreateNdefRecordModalComponent,
  CreateNdefTextRecordModalComponent,
  CreateNdefUriRecordModalComponent,
} from './components';
import { WritePage } from './pages';
import { WritePageRoutingModule } from './write-routing.module';

@NgModule({
  imports: [SharedModule, WritePageRoutingModule],
  declarations: [
    WritePage,
    CreateNdefRecordModalComponent,
    CreateNdefTextRecordModalComponent,
    CreateNdefUriRecordModalComponent,
    CreateNdefAbsoluteUriRecordModalComponent,
    CreateNdefMimeMediaRecordModalComponent,
    CreateNdefExternalRecordModalComponent,
    CreateNdefAndroidApplicationRecordModalComponent,
  ],
})
export class WritePageModule {}
