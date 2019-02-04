import { Component, OnInit } from '@angular/core';
import { AnRestHttpClient } from '@anrest/api';
import { User } from './data/user';
import { tap } from 'rxjs/operators';
import { SpecificPost } from './data/specific-post';

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
    this.http.getItem(SpecificPost, 1)
      .pipe(
        tap((post: SpecificPost) => this.http.refreshItem(post.user).subscribe()),
        tap((post: SpecificPost) => post.comments().subscribe(console.log))
      )
      .subscribe(console.log);
  }
}
