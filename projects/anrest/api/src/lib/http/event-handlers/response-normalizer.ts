import { Inject, Optional } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { EventHandler } from '../../event/handler';
import { AfterEvent } from '../../event/event';
import { ANREST_HTTP_DATA_NORMALIZERS, Normalizer } from '../../normalizer/normalizer';
import { NormalizedResponse } from '../../normalizer/normalized-response';
import { AfterGetItem, AfterGetList, AfterRemove, AfterSave } from '../../decorator/event-handler';

@AfterGetList()
@AfterGetItem()
@AfterSave()
@AfterRemove()
export class ResponseNormalizer implements EventHandler {

  constructor(
    @Inject(ANREST_HTTP_DATA_NORMALIZERS) @Optional() private readonly normalizers: Normalizer[]
  ) {
    if (!Array.isArray(this.normalizers)) {
      this.normalizers = [];
    }
  }

  handle(event: AfterEvent) {
    if (event.data instanceof HttpResponse) {
      event.data = this.normalize(event.data) || event.data;
    }
  }

  priority(): number {
    return 10;
  }

  public normalize(response: HttpResponse<any>): NormalizedResponse {
    for (const normalizer of this.normalizers) {
      if (normalizer.supports(response.headers.get('content-type').split(';')[0])) {
        return normalizer.normalize(response);
      }
    }
  }
}
