import { Configuration } from '../app/models/core/configuration';
import { CssBreakpoint } from '../app/models/core/css-breakpoint';
import { CssBreakpoints } from '../app/models/core/css-breakpoints.enum';

export const environment: Configuration = {
  production: true,
  cssBreakpoints: [
    new CssBreakpoint('mobile', 0, 600),
    new CssBreakpoint('tablet', 601, 900),
    new CssBreakpoint('pc', 901, Infinity)
  ],
  version: 'beta v2.2',
  developers: 'SDAL (sdal.pw)',
  owners: 'МГТУ им Н.Э. Баумана и РАНХиГС',
  productName: 'ПКДД',
  backendOrigins: ['', 'http://пкдд.рф/'],
  mmpiResultMaxValue: 100,
};
