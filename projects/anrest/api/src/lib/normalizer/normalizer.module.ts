import { NgModule } from '@angular/core';
import { ANREST_HTTP_DATA_NORMALIZERS } from './normalizer';
import { JsonDataNormalizer } from './json-normalizer';
import { LdJsonDataNormalizer } from './ld-json-normalizer';

@NgModule({
  providers: [
    {
      provide: ANREST_HTTP_DATA_NORMALIZERS,
      useClass: JsonDataNormalizer,
      multi: true
    },
    {
      provide: ANREST_HTTP_DATA_NORMALIZERS,
      useClass: LdJsonDataNormalizer,
      multi: true
    },
  ]
})
export class NormalizerModule {
}
