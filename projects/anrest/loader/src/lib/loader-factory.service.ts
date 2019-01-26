import { Inject, Injectable, Type } from '@angular/core';

import { AnRestHttpClient } from '@anrest/api';

import { Loader } from './loader/loader';
import { PaginationLoader } from './loader/pagination-loader';
import { InfiniteScrollLoader } from './loader/infinite-scroll.loader';
import { AnRestLoaderConfig, ApiLoaderConfig } from './loader.config';

@Injectable()
export class LoaderFactory {
  private loaders = {};

  constructor(
    private http: AnRestHttpClient,
    @Inject(AnRestLoaderConfig) protected readonly apiConfig: ApiLoaderConfig,
  ) {}

  getLoader(type: Type<any>, id?: string): Loader {
    return this.getCachedLoader<Loader>(id)
      || this.saveAndReturnLoader<Loader>(new Loader(this.http, type, this.apiConfig), id);
  }

  getPaginationLoader(type: Type<any>, id?: string): PaginationLoader {
    return this.getCachedLoader<PaginationLoader>(id)
      || this.saveAndReturnLoader<PaginationLoader>(new PaginationLoader(this.http, type, this.apiConfig), id);
  }

  getInfiniteScrollLoader(type: Type<any>, preload = false, id?: string): InfiniteScrollLoader {
    return this.getCachedLoader<InfiniteScrollLoader>(id)
           || this.saveAndReturnLoader<InfiniteScrollLoader>(new InfiniteScrollLoader(this.http, type, this.apiConfig, preload), id);
  }

  private getCachedLoader<T>(id?: string): T {
    if (id && this.loaders[id] ) {
      return this.loaders[id];
    }
  }

  private saveAndReturnLoader<T>(loader: T, id?: string): T {
    if (id) {
      this.loaders[id] = loader;
    }
    return loader;
  }
}
