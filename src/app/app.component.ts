import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'project3';
  private currentRegex: string = '';
  private box1Txt: string = "filler";
  private box2Txt: string = "filler";
  private box3Txt: string = "filler";
  private box4Txt: string = "filler";
  private box5Txt: string = "filler";
  private box6Txt: string = "filler";
  private boxes: [boolean];

  ngOnInit() {
    
  }

  constructRegex(regex: string) {
    this.currentRegex = regex;
    for (let i = 0; i < 6; i++) {
      
    }
  }
}
