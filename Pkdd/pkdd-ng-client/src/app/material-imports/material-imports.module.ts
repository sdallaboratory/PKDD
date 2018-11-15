import { NgModule } from '@angular/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';


import {
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatChipsModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatDatepickerModule,
  DateAdapter,
  MatRadioModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatSliderModule,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material';

const imports = [
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatChipsModule,
  MatSelectModule,
  MatMenuModule,
  MatListModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatRadioModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatSliderModule,
];

@NgModule({
  imports: imports,
  exports: imports,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'DD/MM/YYYY',
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'DD/MM/YYYY',
        },
      }
    },
  ]
})
export class MaterialImportsModule { }
