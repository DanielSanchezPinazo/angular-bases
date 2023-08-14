import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from './interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private apiKey: string = "mrAEsSHAI3Xqe4aWil4P2tQCD6MAFRT6";
  private serviceUrl: string = "https://api.giphy.com/v1/gifs";

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log("Gifs Service Ready");
   }

  get tagsHistory(): string[] {
    // como los elementos se pasan por referencia hacemos una copia del array con el operador spread.
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {

      this._tagsHistory = this._tagsHistory.filter(item => item !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {

    localStorage.setItem("history", JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage(): void {

    if ( !localStorage.getItem("history")) return;

    this._tagsHistory = JSON.parse( localStorage.getItem("history")!);

    if (this._tagsHistory.length === 0 ) return;

    this.searchTag( this._tagsHistory[0] );
  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;

    this.organizeHistory(tag);

    // console.log(this._tagsHistory);

    //https://api.giphy.com/v1/gifs/search?api_key=mrAEsSHAI3Xqe4aWil4P2tQCD6MAFRT6&q=dragon ball&limit=10

    const params = new HttpParams()
      .set("api_key", this.apiKey)
      .set("limit", "10")
      .set("q", tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe((respuesta) => {

        this.gifList = respuesta.data;
        // console.log({ gifs: this.gifList });
      });
  }
}
