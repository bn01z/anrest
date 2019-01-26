import { HttpResponse } from '@angular/common/http';

import { Normalizer } from './normalizer';
import { NormalizedCollectionResponse, NormalizedResponse } from './normalized-response';
import { CollectionInfo } from '../collection/collection-info';

export class JsonDataNormalizer implements Normalizer {

  normalize(response: HttpResponse<any>): NormalizedResponse {
    return Array.isArray(response.body) ?
      new NormalizedCollectionResponse(response.body, this.createCollectionInfo(response)) :
      new NormalizedResponse(response.body);
  }

  supports(type: string): boolean {
    return type === 'application/json';
  }

  private createCollectionInfo(response: HttpResponse<any>): CollectionInfo {
    const info = new CollectionInfo();
    info.current = response.headers.get('X-Current-Page') || this.formatUrl(response.url);
    info.first = response.headers.get('X-First-Page') || undefined;
    info.previous = response.headers.get('X-Prev-Page') || undefined;
    info.next = response.headers.get('X-Next-Page') || undefined;
    info.last = response.headers.get('X-Last-Page') || undefined;
    info.itemsTotal = response.headers.get('X-Total') || response.body.length;

    return info;
  }

  private formatUrl(urlString: string) {
    const url = new URL(urlString);
    return url.pathname + url.search + url.hash;
  }
}
