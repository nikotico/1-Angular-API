import { Component, OnInit, ViewChild} from '@angular/core';
declare var $:any;//Para poder utilizar mi libreria de jquery

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('view', {static: true})view: any;//Para poder acceder a los elementos del html, sin usar jquery o el DOM/BOM de Js
  
  constructor() { }

  ngOnInit(): void {

    console.log(this.view.nativeElement.outerText);
    
    $('#logo').on('click',function(e: { preventDefault: () => void; }){
      e.preventDefault();//anula todo lo que debe de suceder cuando le doy click al logo
      $('header').css('background','green');
    });

    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: true,
      slideWidth: 400,
    });
  }

}
