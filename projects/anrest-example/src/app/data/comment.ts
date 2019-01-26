import { Property, Resource } from '@anrest/api';

@Resource('/comments')
export class Comment {
  @Property() id: number;
  @Property() postId: number;
  @Property() name: string;
  @Property() email: string;
  @Property() body: string;
}
