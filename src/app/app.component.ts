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
  private selectText: string = '';
  private newFileName: string;
  private boxes: file[] = [];
  private history: string[] = [];
  private favorite: string[] = [];
  
  ngOnInit() {
    for (let i = 0; i < 6; i++) {
      let newFile = new file();
      newFile.originalText = this.words[i];
      newFile.savedText = newFile.originalText;
      newFile.newText = "";
      newFile.selected = false;
      this.boxes.push(newFile);
    }
  }
  // Rename Portion
  applyRename(regex: string, newFileName: string) {
    const exp = new RegExp(regex);
    let duplicate: boolean = false;
    let count = 0;
    let tempString: string;
    if (regex) {
      if (exp) { 
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].selected) {
            this.boxes[i].newText = this.boxes[i].originalText.replace(exp, newFileName);
            tempString = this.boxes[i].newText;
            for(let i = 0; i < this.history.length; i++) {
              if(this.history[i] == regex) {
                duplicate = true;
              }
            }
            if (duplicate == false) {
              this.history.unshift(regex);
            }
          }else {
            this.boxes[i].newText = "";
          }
        }
      } else {
        for (let i = 0; i < 6; i++) {
          if (this.boxes[i].selected) {
            this.boxes[i].newText = "";
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
    for (let j = 0; j < 6; j++) {
      if (this.boxes[j].newText ==  tempString) {
        if (count == 0) {
          this.boxes[j].newText = this.boxes[j].newText;
          count++;
        }
        if (this.boxes[j].newText.includes('.')) {
          var n = this.boxes[j].newText.indexOf('.', 0);
          console.log(n);
          this.boxes[j].newText = this.boxes[j].newText.substring(0, n) + "(" + count + ")" + this.boxes[j].newText.substring(n);
          count++;
        } else{
          this.boxes[j].newText += "(" + count + ")";
          count++;
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

  newName(value: string) {
    this.newFileName = value;
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
