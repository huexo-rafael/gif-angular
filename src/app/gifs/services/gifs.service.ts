import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY ='RvpxNHtJsB1CvIJCTiDibgBU33Hj5aKl';

@Injectable({providedIn: 'root'})

export class GifsService {

  private _tagsHistory: string [] = [];

  private apiKey: string='RvpxNHtJsB1CvIJCTiDibgBU33Hj5aKl';

  private serviceUrl: string='https://api.giphy.com/v1/gifs';

  public gifsList : Gif [] = [];

  constructor( private httpClient: HttpClient  ) {
    this.loadLocalStorage();

    console.log( 'Gifs service ready');
  }

  get tagsHistory(){

    return [...this._tagsHistory];
  }

   searchTag(tag:string):void{

    if(tag.length===0){ return;}

    this.organizeHistory(tag);

    const params =new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag);

    /* Esto es un observable */
    this.httpClient.get<SearchResponse>(`${ this.serviceUrl}/search?`,{params})
    .subscribe( (response) =>{

      this.gifsList=response.data;

      console.log({Gifs: this.gifsList} );
    });

    /* Axios otra opción */
    /*
    fetch('https://api.giphy.com/v1/gifs/search?api_key=RvpxNHtJsB1CvIJCTiDibgBU33Hj5aKl&q=valorant&limit=10')
    .then( resp=> resp.json())
    .then( data => console.log(data));
    */

    //this._tagsHistory.unshift( tag );

  }

  private organizeHistory(tag:string){

    tag=tag.toLocaleLowerCase();
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory=this._tagsHistory.filter(( oldTag )=>oldTag!=tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory=this.tagsHistory.splice(0,10);
    this.saveLocalStorage();

  }

  private saveLocalStorage():void{
    /* Los arrays son necesarios serializarlos */
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void{

    if ( !localStorage.getItem('history')) return;

    this._tagsHistory= JSON.parse(localStorage.getItem('history')!);

    if ( this._tagsHistory.length===0 ) return;
    this.searchTag( this._tagsHistory[0]);


  }


}
