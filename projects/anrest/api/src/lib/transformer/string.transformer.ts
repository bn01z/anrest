import { DataTransformer } from './transformer';

export class StringTransformer implements DataTransformer {
  transform(data: any): any {
    if (data === undefined || data === null) {
      return null;
    }

    return String(data);
  }

  supports(name: string): boolean {
    return 'string' === name;
  }
}
