import { Property, Resource, HasMany, Reference, Named } from '@anrest/api';
import { Comment } from './comment';
import { User } from './user';

@Resource('/posts')
export class Post {
  @Property() id: number;
  @Named('userId') @Reference(() => User) user: User;
  @Property() title: string;
  @Property() body: string;

  @HasMany(() => Comment) comments(): any {}
}
