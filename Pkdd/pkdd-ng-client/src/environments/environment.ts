import { Configuration } from '../app/models/core/configuration';
import { CssBreakpoint } from 'src/app/models/core/css-breakpoint';
import { CssBreakpoints } from '../app/models/core/css-breakpoints.enum';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Configuration = {
  production: false,
  cssBreakpoints: [
    new CssBreakpoint(CssBreakpoints.mobile, 0, 600),
    new CssBreakpoint(CssBreakpoints.tablet, 601, 900),
    new CssBreakpoint(CssBreakpoints.pc, 901, Infinity)
  ],
  version: 'v.0.0',
  developers: 'Батин, Соловьев & Гончаров',
  owners: 'МГТУ им Н.Э. Баумана и РАНХиГС',
  productName: 'ПКДД',
  backendOrigins: [''],
  mmpiResultMaxValue: 120,
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
