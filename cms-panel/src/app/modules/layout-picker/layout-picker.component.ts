import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-layout-picker',
  templateUrl: './layout-picker.component.html',
  styleUrls: ['./layout-picker.component.css'],
})
export class LayoutPickerComponent implements OnInit {
  layout: any = 'modern';
  isHeader = true;
  isLoaded = false;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getLayout();
  }

  getLayout(): any {
    this.settingsService.getConfig().subscribe((response) => {
      this.layout = response.layout;
      this.isHeader = response.isHeader;
      this.isLoaded = true;
    });
  }

  updateLayout(value): any {
    const body = {
      layout: value,
    };
    this.settingsService.updateLayout(body).subscribe((response) => {
      console.log(response);
    });
  }

  updateHeader(): any {
    this.isHeader = !this.isHeader;
    const body = {
      isHeader: this.isHeader,
    };
    this.settingsService.updateHeader(body).subscribe((response) => {
      console.log(response);
    });
  }
}
