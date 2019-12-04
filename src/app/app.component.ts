import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private title = 'project3';
  private currentRegex: string = '';
  private boxes: file[] = [];

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      let newFile = new file();
      newFile.originalText = 'filler';
      newFile.newText = newFile.originalText;
      newFile.savedText = newFile.originalText;
      newFile.selected = false;
      this.boxes.push(newFile)
      //console.log(this.boxes[i])
    }
  }

  constructRegex(regex: string) {
    this.currentRegex = regex;
    for (let i = 0; i < 6; i++) {
      if (this.boxes[i].selected) {
        this.boxes[i].newText = regex;
      }
    }
  }

  applyRegex(index: number) {
    console.log(index)
    if (this.boxes[index].selected) {
      this.boxes[index].newText = this.currentRegex;
    }else {
      this.boxes[index].newText = this.boxes[index].originalText;
    }
  }

  saveNames() {
    for (let i = 0; i < 6; i++) {
      if (this.boxes[i].selected) {
        this.boxes[i].savedText = this.boxes[i].newText;
      }
    }
  }

}

export class file {
  originalText: string;
  newText: string;
  savedText: string;
  selected: boolean;
}
