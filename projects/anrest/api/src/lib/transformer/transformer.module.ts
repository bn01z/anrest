import { NgModule } from '@angular/core';
import { TransformerService } from './service';
import { ANREST_DATA_TRANSFORMERS } from './transformer';
import { NumberTransformer } from './number.transformer';
import { StringTransformer } from './string.transformer';
import { DateTransformer } from './date.transformer';
import { SimpleObjectTransformer } from './simple-object.transformer';
import { EntityTransformer } from './entity.transformer';
import { ReferenceFormatterTransformer } from './reference-formatter.transformer';

@NgModule({
  providers: [
    TransformerService,
    {
      provide: ANREST_DATA_TRANSFORMERS,
      useClass: NumberTransformer,
      multi: true
    },
    {
      provide: ANREST_DATA_TRANSFORMERS,
      useClass: StringTransformer,
      multi: true
    },
    {
      provide: ANREST_DATA_TRANSFORMERS,
      useClass: DateTransformer,
      multi: true
    },
    {
      provide: ANREST_DATA_TRANSFORMERS,
      useClass: SimpleObjectTransformer,
      multi: true
    },
    {
      provide: ANREST_DATA_TRANSFORMERS,
      useClass: EntityTransformer,
      multi: true
    },
    {
      provide: ANREST_DATA_TRANSFORMERS,
      useClass: ReferenceFormatterTransformer,
      multi: true
    }
  ]
})
export class TransformerModule { }
