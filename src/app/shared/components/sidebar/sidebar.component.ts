import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { Gif } from 'src/app/gifs/services/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {

  // inyectar servicio privado

  constructor( private gifService: GifsService ) {}

  public get tags(): string[] {

    return this.gifService.tagsHistory;
  }

  public search(tag: string): void {

    this.gifService.searchTag(tag);
  }






}
