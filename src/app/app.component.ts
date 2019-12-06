import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private words = ["filler", "BigPhoto.png", "desktopBackground.jpeg", "photoshopFile.psd", "gimp.exe" , "Assignmen3.doc"];
  private title = 'Assignment 3';
  private currentRegex: string = '';
  private boxes: file[] = [];

  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      let newFile = new file();
      newFile.originalText = this.words[i];
      //newFile.savedText = newFile.originalText;
      newFile.selected = false;
      this.boxes.push(newFile);
    }
  }
  // Rename Portion
  applyRename(regex: string) {
    const exp = new RegExp(regex);
    if (regex) {
      if (exp) {
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].selected) {
            this.boxes[i].newText = this.boxes[i].originalText.replace(exp, this.boxes[i].originalText + " + sup");
          }else {
            this.boxes[i].newText = ""
          }
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        if (this.boxes[i].selected) {
          this.boxes[i].newText = "";
        }
      }
    }
  }

  // Selection of files.
  constructRegex(regex: string) {
    this.currentRegex = regex;
    const exp = new RegExp(this.currentRegex);
    if (regex) {
      if (exp) {
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].originalText.match(exp)) {
            this.boxes[i].selected = true;
          } else {
            this.boxes[i].selected = false;
          }
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        if (this.boxes[i].selected) {
          this.boxes[i].selected = false;
          this.boxes[i].newText = "";
        }
      }
    }
  }
  
  applyRegex(index: number) {
    if (this.boxes[index].selected) {
      this.boxes[index].newText = this.boxes[index].originalText;
    }else {
      this.boxes[index].newText = "";
    }
  }

  // Save Button
  saveNames() {
    for (let i = 0; i < 6; i++) {
      console.log(this.boxes[i].newText);
      if (this.boxes[i].selected) {
        this.boxes[i].savedText =  this.boxes[i].newText;
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
