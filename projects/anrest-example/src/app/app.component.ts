import { Component, OnInit } from '@angular/core';
import { AnRestHttpClient } from '@anrest/api';
import { User } from './data/user';
import { Post } from './data/post';
import { Image } from './data/image';
import { PostsLoader } from './data/posts-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private query: any = {
    test: 'asdsd',
    order: {
      name: 'DESC',
      rating: 'DESC',
      additional: [
        true,
        undefined,
        'yes'
      ]
    },
    something: [ false, 4, 6 ]
  };

  constructor(private http: AnRestHttpClient, private postsLoader: PostsLoader) {
  }

  ngOnInit(): void {
    const userReference = this.http.getReference(User, 1);

    this.postsLoader.data.subscribe(console.log);
    this.postsLoader.user.next(userReference);
    this.postsLoader.new.next(true);

    this.query.users = [userReference];

    this.http.getList(User, this.query).subscribe(console.log);
    userReference.posts().subscribe(console.log);
    this.http.getItem(Post, 2).subscribe(console.log);
    this.http.getItem(User, 1).subscribe((u) => this.http.saveItem(u).subscribe());

    const image = new Image('image/png', '12345qwerty');
    this.http.saveItem(image).subscribe();
  }
}
