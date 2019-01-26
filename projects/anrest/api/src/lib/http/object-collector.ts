import { Injectable } from '@angular/core';
import { Meta } from '../meta/meta';

@Injectable()
export class ObjectCollector {
    map: Map<string, any>  = new Map<string, any>();

    set(data: any) {
      this.map.set(Meta.getForObject(data).id, data);
    }

    remove(data: any) {
      this.map.delete(Meta.getForObject(data).id);
    }

    get(id: string) {
      return this.map.get(id);
    }

    has(id: string) {
      return this.map.has(id);
    }

    clear() {
      this.map.clear();
    }
}
