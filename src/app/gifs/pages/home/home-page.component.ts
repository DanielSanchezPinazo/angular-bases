import { Component } from '@angular/core';
import { Gif } from '../../services/interfaces/gifs.interfaces';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {


  constructor( private gifsService: GifsService ) {}

  get getGifs(): Gif[] {

    return this.gifsService.gifList;
  }


}


