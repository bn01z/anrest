import { CollectionInfo } from '../collection/collection-info';

export class NormalizedResponse {
  constructor(public data: any) {}
}

export class NormalizedCollectionResponse extends NormalizedResponse {
  constructor(data: any, public info: CollectionInfo) {
    super(data);
  }
}
