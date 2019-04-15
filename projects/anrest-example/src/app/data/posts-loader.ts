import { AnRestHttpClient } from '@anrest/api';
import { InfiniteScrollLoader, AnRestLoaderConfig, ApiLoaderConfig, LoaderFilters } from '@anrest/loader';
import { Post } from './post';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsLoader extends InfiniteScrollLoader {
  constructor(http: AnRestHttpClient, @Inject(AnRestLoaderConfig) config: ApiLoaderConfig) {
    super(http, Post, config, true);
  }

  get user() {
    return this.filters.user;
  }

  get title() {
    return this.filters.title;
  }

  get new() {
    return this.filters.new;
  }
}
