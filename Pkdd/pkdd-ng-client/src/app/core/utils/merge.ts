import { remove } from './remove';

export function merge<T extends object>(destination: T[], source: T[]): void {
    if (!destination || !source) {
        return;
    }

    destination.forEach(element => {
        if (!source.includes(element)) {
            remove(destination, element);
        }
    });

    source.forEach(element => {
        if (!destination.includes(element)) {
            destination.push(element);
        }
    });
}
