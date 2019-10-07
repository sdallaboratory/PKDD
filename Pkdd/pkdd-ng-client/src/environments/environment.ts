import { Configuration } from '../app/models/core/configuration';
import { CssBreakpoint } from 'src/app/models/core/css-breakpoint';
import { CssBreakpoints } from '../app/models/core/css-breakpoints.enum';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Configuration = {
  production: false,
  cssBreakpoints: [
    new CssBreakpoint('mobile', 0, 600),
    new CssBreakpoint('tablet', 601, 900),
    new CssBreakpoint('pc', 901, Infinity)
  ],
  version: 'beta v2.0',
  developers: 'Батин, Соловьев & Гончаров',
  owners: 'МГТУ им Н.Э. Баумана и РАНХиГС',
  productName: 'ПКДД',
  backendOrigins: ['', 'http://31.31.196.160/', 'http://пкдд.рф/', 'https://localhost:5001/'],
  mmpiResultMaxValue: 100,
};
