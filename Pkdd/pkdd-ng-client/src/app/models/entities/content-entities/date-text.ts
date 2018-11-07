import { ContentText } from './content-text';

export class DateText {
    constructor(
        public text: ContentText = new ContentText(),
        public period: Period = new Period()
    ) {

    }
}

export class Period {
    constructor(
        public firstDate = new Date(),
        public secondDate = new Date()
    ) {
    }
}
