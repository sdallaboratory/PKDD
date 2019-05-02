import { ColorName } from 'src/app/models/persons/results/luscher-result';

export const colors: { [key in ColorName]: string } = {
    grey: '#98938D',
    pink: '#D42481',
    black: '#231F20',
    yellow: '#F2DD00',
    green: '#1D9772',
    blue: '#004983',
    red: '#F12F23',
    brown: '#C55223',
};

export const colorsNames: ColorName[] = Object.keys(colors) as ColorName[];
