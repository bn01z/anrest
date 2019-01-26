import { HttpResponse } from '@angular/common/http';

import { Normalizer } from './normalizer';
import { NormalizedCollectionResponse, NormalizedResponse } from './normalized-response';
import { CollectionInfo } from '../collection/collection-info';

export class LdJsonDataNormalizer implements Normalizer {

  normalize(response: HttpResponse<any>): NormalizedResponse {
    return response.body['@type'] === 'hydra:Collection' ?
      new NormalizedCollectionResponse(response.body['hydra:member'], this.createCollectionInfo(response)) :
      new NormalizedResponse(response.body);
  }

  supports(type: string): boolean {
    return type === 'application/ld+json';
  }

  private createCollectionInfo(response: HttpResponse<any>): CollectionInfo {
    const info = new CollectionInfo();
    if (response.body['hydra:view']) {
      info.current = response.body['hydra:view']['@id'] || response.url;
      info.first = response.body['hydra:view']['hydra:first'];
      info.previous = response.body['hydra:view']['hydra:previous'];
      info.next = response.body['hydra:view']['hydra:next'];
      info.last = response.body['hydra:view']['hydra:last'];
      if (info.current === info.first) {
        info.alias = response.body['@id'];
      }
    } else {
      info.current = response.body['@id'] || response.url;
    }
    info.itemsTotal = response.body['hydra:totalItems'] || response.body['hydra:member'].length;

    return info;
  }
}
