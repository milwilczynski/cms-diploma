import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    console.log('HALO');
    this.route.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        data.state.root.firstChild;
      }
    });
  }

  ngAfterViewInit(): void {}
}
