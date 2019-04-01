export class MmpiResultNames {
    public static getNames(locale: 'ru' | 'en' | 'conf' | 'base'): LocaleName {
        switch (locale) {
            case 'ru':
                return null;
            case 'en':
                return new EnLocaleName();
            case 'conf':
                return new ConferenceLocaleName();
            case 'base':
                return new EnLocaleName();
        }
    }

    public static getInBaseLocale(name: string, locale: 'ru' | 'en' | 'conf') {
        switch (locale) {
            case 'ru':
                return null;
            case 'en':
                return Object.entries(new EnLocaleName()).find(n => n[1] === name)[0];
            case 'conf':
                return Object.entries(new ConferenceLocaleName()).find(n => n[1] === name)[0];
        }
    }

    public static getBaseKeys() {
        return Object.keys(new EnLocaleName());
    }
}

export interface LocaleName {
    hypochondriasis: string;
    depression: string;
    hysteria: string;
    psychopathia: string;
    masculinity: string;
    paranoia: string;
    psychasthenia: string;
    schizophrenia: string;
    hypomania: string;
    sociality: string;
}

class ConferenceLocaleName implements LocaleName {
    public hypochondriasis = 'Поиск причин неудач вовне';
    public depression = 'Самокритика';
    public hysteria = 'Демонстративность';
    public psychopathia = 'Решитильность';
    public masculinity = 'Чувствительность натуры';
    public paranoia = 'Найстойчивость';
    public psychasthenia = 'Футурологическая тревога';
    public schizophrenia = 'Индивидуализированность';
    public hypomania = 'Оптимизм';
    public sociality = 'Замкнутость';
}

class EnLocaleName implements LocaleName {
    public hypochondriasis = 'hypochondriasis';
    public depression = 'depression';
    public hysteria = 'hysteria';
    public psychopathia = 'psychopathia';
    public masculinity = 'masculinity';
    public paranoia = 'paranoia';
    public psychasthenia = 'psychasthenia';
    public schizophrenia = 'schizophrenia';
    public hypomania = 'hypomania';
    public sociality = 'sociality';
}
