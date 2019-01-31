import { DataTransformer } from './transformer';

export class NumberTransformer implements DataTransformer {
  transform(data: any): any {
    if (data === undefined || data === null) {
      return null;
    }

    return Number(data);
  }

  supports(name: string): boolean {
    return 'number' === name;
  }
}
