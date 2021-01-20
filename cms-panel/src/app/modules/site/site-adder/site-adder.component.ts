import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-site-adder',
  templateUrl: './site-adder.component.html',
  styleUrls: ['./site-adder.component.css'],
})
export class SiteAdderComponent implements OnInit {
  selectedFile!: File;
  constructor(private siteService: SiteService) {}
  fileTitle: any;

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }

  onUpload() {
    const fd = new FormData();
    fd.append('html', this.selectedFile, this.selectedFile.name);
    fd.append('title', this.fileTitle);
    this.siteService.uploadSite(fd);
  }
}
