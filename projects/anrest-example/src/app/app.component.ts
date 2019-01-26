import { Component, OnInit } from '@angular/core';
import { AnRestHttpClient } from '@anrest/api';
import { Post } from './data/post';
import { mergeMap } from 'rxjs/operators';
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
    this.http.getList(User).subscribe(console.log);
    this.http.getItem(Post, 1).subscribe(console.log);
  }
}
