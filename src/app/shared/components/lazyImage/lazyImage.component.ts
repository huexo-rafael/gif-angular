import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazyImage',
  templateUrl: './lazyImage.component.html'

})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  constructor() { }

  ngOnInit() {
    if(!this.url) throw new Error('Url property is required');
  }

}
