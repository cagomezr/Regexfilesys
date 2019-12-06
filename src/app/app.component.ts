import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  private words = ["filler", "BigPhoto.png", "desktopBackground.jpeg", "photoshopFile.psd", "gimp.exe" , "Assignmen3.doc"];
  private title = 'Assignment 3';
  private currentRegex: string = '';
  private selectText: string = '';
  private boxes: file[] = [];
  private history: string[] = [];
  private favorite: string[] = [];
  
  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      let newFile = new file();
      newFile.originalText = this.words[i];
      newFile.savedText = newFile.originalText;
      newFile.newText = newFile.originalText;
      newFile.selected = false;
      this.boxes.push(newFile);
    }
  }
  // Rename Portion
  applyRename(regex: string) {
    const exp = new RegExp(regex);
    let duplicate: boolean = false;
    if (regex) {
      if (exp) {
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].selected) {
            this.boxes[i].newText = this.boxes[i].originalText.replace(exp, this.boxes[i].originalText + " + sup");
            for(let i = 0; i < this.history.length; i++) {
              if(this.history[i] == regex) {
                duplicate = true;
              }
            }
            if (duplicate == false) {
              this.history.unshift(regex);
            }
          }else {
            this.boxes[i].newText = this.boxes[i].originalText;
          }
        }
      } else {
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].selected) {
            this.boxes[i].newText = this.boxes[i].originalText;
          }
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        if (this.boxes[i].selected) {
          this.boxes[i].newText = this.boxes[i].originalText;
        }
      }
    }
  }

  // Selection of files.
  constructRegex(regex: string) {
    this.currentRegex = regex;
    const exp = new RegExp(this.currentRegex);
    let duplicate: boolean = false;
    if (regex) {
      if (exp) {
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].originalText.match(exp)) {
            this.boxes[i].selected = true;
            for(let i = 0; i < this.history.length; i++) {
              if(this.history[i] == regex) {
                duplicate = true;
              }
            }
            if (duplicate == false) {
              this.history.unshift(regex);
            }
          } else {
            this.boxes[i].selected = false;
          }
        }
      }
    } else {
      for (let i = 0; i < 6; i++) {
        if (this.boxes[i].selected) {
          this.boxes[i].selected = false;
          this.boxes[i].newText = this.boxes[i].originalText
        }
      }
    }
  }
  
  applyRegex(index: number) {
    if (this.boxes[index].selected) {
      this.boxes[index].newText = this.boxes[index].originalText;
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

  // Add regex to favorite list
  addFavRegex(regex: string) {
    this.favorite.push(regex);
  }

  removeFav(fav: string) {
    let i = this.favorite.indexOf(fav, 0)
    if (i > -1) {
      this.favorite.splice(i, 1)
    }
  }

  applyFav(fav: string) {
    this.selectText = fav
  }

}

export class file {
  originalText: string;
  newText: string;
  savedText: string;
  selected: boolean;
}
