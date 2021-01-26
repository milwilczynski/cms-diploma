import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title-show',
  templateUrl: './title-show.component.html',
  styleUrls: ['./title-show.component.css'],
})
export class TitleShowComponent implements OnInit {
  @Input() title!: string;
  @Input() url!: string;
  @Input() siteName!: string;

  constructor() {}

  ngOnInit(): void {}
}
