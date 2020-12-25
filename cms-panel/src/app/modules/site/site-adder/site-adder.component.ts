import { Component, OnInit } from '@angular/core';
import { SiteService } from 'src/app/services/site/site.service';

@Component({
  selector: 'app-site-adder',
  templateUrl: './site-adder.component.html',
  styleUrls: ['./site-adder.component.css']
})
export class SiteAdderComponent implements OnInit {
  selectedFile!: File;
  constructor(private siteService: SiteService) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('html', this.selectedFile, this.selectedFile.name);
    this.siteService.uploadSite(fd);
  }
}
