import { isNullOrUndefined } from 'util';
export class TypeChecker {

  private static primitiveTypes: string[] = ['string', 'number', 'boolean', 'symbol'];

  /**
   * returns true if the object can be iterated
   * @param value value to be checked
   */
  static isIterable(value): value is any[] {
    if (value === undefined) {
      throw new Error('Type checker: object is undefined');
    }
    return value !== null && typeof value[Symbol.iterator] === 'function';
  }

  /**
   * returns true if the value is an instance
   * @param value value to be checked
   */
  static isPrimitive(value: any): boolean {
    if (value === undefined) {
      throw new Error('Type checker: object is undefined');
    }
    const type: string = typeof (value);
    return value !== null && this.primitiveTypes.includes(type);
  }

  static isNumberArray(array: number[] | object[]): array is number[] {
    if (array.length === 0) {
      return false;
    }
    if (typeof array[0] === 'number') {
      return true;
    } else {
      return false;
    }
  }

  static isNumber(obj: any): obj is number {
    if (isNullOrUndefined(obj)) {
      return false;
    }
    if (typeof obj === 'number') {
      return true;
    } else {
      return false;
    }
  }
}