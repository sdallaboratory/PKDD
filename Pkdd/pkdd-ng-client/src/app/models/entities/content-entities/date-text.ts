import { ContentText } from './content-text';

export class DateText {
    constructor(
        public text: string = '', // ContentText = new ContentText(),
        public period: EventDate = new EventDate()
    ) { }
}

export class EventDate {
    constructor(
        public isRange = false,
        public firstDate = new Date(),
        public secondDate = new Date()
    ) { }
}
