import { Component, OnInit } from '@angular/core';
import { AnRestHttpClient } from '@anrest/api';
import { User } from './data/user';
import { Post } from './data/post';
import { Image } from './data/image';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private query = {
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

  constructor(private http: AnRestHttpClient) {
  }

  ngOnInit(): void {
    this.http.getList(User, this.query).subscribe(console.log);
    this.http.getReference(User, 1).posts().subscribe(console.log);
    this.http.getItem(Post, 2).subscribe(console.log);
    this.http.getItem(User, 1).subscribe((u) => this.http.saveItem(u).subscribe());

    const image = new Image('image/png', '12345qwerty');
    this.http.saveItem(image).subscribe();
  }
}
