import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-body-renderer',
  templateUrl: './body-renderer.component.html',
  styleUrls: ['./body-renderer.component.css'],
})
export class BodyRendererComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('name'));
    });
  }
}
