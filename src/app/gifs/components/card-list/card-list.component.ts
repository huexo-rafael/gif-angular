import { Component, Input, input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent implements OnInit {

  @Input()

  public gifsList : Gif[]=[];
  constructor() { }

  ngOnInit() {
  }

}
