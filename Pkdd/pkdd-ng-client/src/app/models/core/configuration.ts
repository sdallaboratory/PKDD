import { CssBreakpoint } from './css-breakpoint';

export interface Configuration {

    production: boolean;

    cssBreakpoints: CssBreakpoint[];

    version: string;

    developers: string;

    productName: string;
}
