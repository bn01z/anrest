import { Component, OnInit } from '@angular/core';
import { AnRestHttpClient } from '@anrest/api';
import { Post } from './data/post';
import { User } from './data/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: AnRestHttpClient) {
  }

  ngOnInit(): void {
    const query = {
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
    this.http.getList(User, query).subscribe(console.log);
    this.http.getItem(Post, 1).subscribe(console.log);
  }
}
