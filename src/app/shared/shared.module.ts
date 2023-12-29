import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  BooleanToTextPipe,
  BytesToHexPipe,
  BytesToTextPipe,
  HexToBytesPipe,
  RecordLabelPipe,
  RecordPayloadPipe,
  TagManufacturerPipe,
  TagNamePipe,
} from './pipes';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, IonicModule];

const DECLARATIONS = [
  TagManufacturerPipe,
  TagNamePipe,
  BooleanToTextPipe,
  BytesToHexPipe,
  BytesToTextPipe,
  HexToBytesPipe,
  RecordLabelPipe,
  RecordPayloadPipe,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...DECLARATIONS],
  exports: [...MODULES, ...DECLARATIONS],
})
export class SharedModule {}
