import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent implements OnInit {
  colorMenu: any = '#dc1f1f';
  colorHeader: any = '#3d9d05';
  colorBody: any = '#e7e5e5';
  colorNavbar: any = '#008bd4';
  isLoaded = false;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors(): any {
    this.settingsService.getConfig().subscribe((response) => {
      console.log(response);
      this.colorBody = response.bodyColor;
      this.colorHeader = response.headerColor;
      this.colorNavbar = response.navbarColor;
      this.colorMenu = response.menuColor;
      this.isLoaded = true;
    });
  }

  sendColors(): void {
    const colors = {
      menuColor: this.colorMenu,
      headerColor: this.colorHeader,
      bodyColor: this.colorBody,
      navbarColor: this.colorNavbar,
    };
    this.settingsService.updateColors(colors).subscribe((response) => {
      console.log(response);
    });
  }
}
