export enum ContentType {
    Container,
    Text,
    DateText,
    Photo,
    Video,
    Publications
}

export const types = Object.keys(ContentType).filter(v => !isNaN(parseInt(v, 10))).map(v => {
    return { type: ContentType[v], value: +v };
});
