/*
 * Public API Surface of loader
 */

export * from './lib/decorator';
export { AnRestLoaderConfig, ApiLoaderConfig } from './lib/loader.config';
export { AnRestLoaderModule } from './lib/loader.module';
export { Loader } from './lib/loader/loader';
export { PaginationLoader } from './lib/loader/pagination-loader';
export { InfiniteScrollLoader } from './lib/loader/infinite-scroll.loader';
export { LoaderFactory } from './lib/loader-factory.service';
