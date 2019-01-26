import { DataTransformer } from './transformer';

export class DateTransformer implements DataTransformer {
  transform(data: any): Date {
    if (data === undefined || data === null) {
      return null;
    }

    return new Date(data);
  }
}
