import { TypeChecker } from './type-checker';
import { isNullOrUndefined } from 'util';

export class EntityScanner {

    public static deepCopy(source, target) {
        target = this.newEntity(source);
        return target;
    }

    public static isEqual<T>(first: T, second: T) {
        if (isNullOrUndefined(first) || isNullOrUndefined(second)) {
            return false;
        }
        return JSON.stringify(first) === JSON.stringify(second);
    }

    public static newEntity(entity: any) {
        if (!isNullOrUndefined(entity)) {
          return JSON.parse(JSON.stringify(entity));
        } else {
          return null;
        }
      }
}
