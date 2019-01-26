export class CollectionInfo {
  public itemsTotal: number;
  public current: string;
  public first: string;
  public previous: string;
  public next: string;
  public last: string;
  public alias: string;

  public get pagesTotal() {
    return Number((/page=(\d+)/g.exec(this.last) || [undefined, 1])[1]);
  }

  public get page() {
    return Number((/page=(\d+)/g.exec(this.current) || [undefined, 1])[1]);
  }
}
