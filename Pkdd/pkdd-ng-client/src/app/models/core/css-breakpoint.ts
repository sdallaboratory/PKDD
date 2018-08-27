import { CssBreakpoints } from './css-breakpoints.enum';

export class CssBreakpoint {
    constructor(
        public readonly deviceType: CssBreakpoints,
        public readonly minWidth: number,
        public readonly maxWidth: number,
    ) { }
}
