import { Property, Resource, HasMany, Reference, Named } from '@anrest/api';
import { Comment } from './comment';
import { BaseUser } from './base-user';

@Resource('/posts')
export class Post {
  @Property() id: number;
  @Named('userId') @Reference() user: BaseUser;
  @Property() title: string;
  @Property() body: string;

  @HasMany(Comment) comments(): any {}
}
