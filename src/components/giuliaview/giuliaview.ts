import { Component } from '@angular/core';

/**
 * Generated class for the GiuliaviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'giuliaview',
  templateUrl: 'giuliaview.html'
})
export class GiuliaviewComponent {

  text: string;

  constructor() {
    console.log('Hello GiuliaviewComponent Component');
    this.text = 'Giulia View Componente';
  }

}
