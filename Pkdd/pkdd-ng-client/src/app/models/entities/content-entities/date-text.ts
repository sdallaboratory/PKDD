import { ContentText } from './content-text';

export class DateText {
    text: ContentText;
}

export class Period {
    firstDate: Date;
    secondDate: Date | null;
}
