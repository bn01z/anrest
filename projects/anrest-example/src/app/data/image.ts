import { Header, Body, Resource } from '@anrest/api';

@Resource('/images')
export class Image {
  @Header('Content-Type') type: string;
  private data: string;

  constructor(type: string, data) {
    this.type = type;
    this.data = data;
  }

  @Body() body() {
    return this.data.substr(5);
  }
}
