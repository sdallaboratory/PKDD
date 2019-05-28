import { Configuration } from '../app/models/core/configuration';
import { CssBreakpoint } from '../app/models/core/css-breakpoint';
import { CssBreakpoints } from '../app/models/core/css-breakpoints.enum';

export const environment: Configuration = {
  production: true,
  cssBreakpoints: [
    new CssBreakpoint(CssBreakpoints.mobile, 0, 600),
    new CssBreakpoint(CssBreakpoints.tablet, 601, 900),
    new CssBreakpoint(CssBreakpoints.pc, 901, Infinity)
  ],
  version: 'beta v2.0',
  developers: 'Батин, Соловьев & Гончаров',
  owners: 'МГТУ им Н.Э. Баумана и РАНХиГС',
  productName: 'ПКДД',
  backendOrigins: ['http://пкдд.рф/', ''],
  mmpiResultMaxValue: 100,
};
