//ng g d resaltado
//Esta directiva me sirve para seleccionar un elemento html y modificarlo como yo quiera
//contanct.html line 4
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(el: ElementRef) {
    var element = el.nativeElement
        element.style.background = 'green';
        element.style.color = 'white';
   }

}
