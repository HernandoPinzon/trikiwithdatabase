import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { Triki } from 'src/app/models/TrikiModel';
import { OnlineService } from 'src/app/services/online.service';
import { UpdateService } from 'src/app/services/update.service';

const caseOK = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];




@Component({
  selector: 'game-view',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() symbol:string = "o";
  @Input() trikiValues: Triki = {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    pos5: 0,
    pos6: 0,
    pos7: 0,
    pos8: 0,
    pos9: 0,
  };

  constructor(
    private elementRef:ElementRef,
    private updateService:UpdateService,
    private onlineService:OnlineService
    ) {

  }

  ngOnInit(): void {
    console.log("onInit");
    this.updateService.disparadorDeActualizacion.subscribe((data)=>{
      this.trikiValues = data.value;
      console.log(this.trikiValues)
      for (let i = 1; i < 10; i++) {
        const element = this.elementRef.nativeElement.querySelector('#pos-'+i);
  
        type ObjectKey = keyof typeof this.trikiValues;
        const myVar = 'pos'+i as ObjectKey;
        const valueActual = Number(this.trikiValues[myVar]);
        if (valueActual==0) {
          element.value = "";
        } else if(valueActual==1) {
          element.value = "o";
        } else if(valueActual==2){
          element.value = "x";
        }
      }
    });




    for (let i = 1; i < 10; i++) {
      const element = this.elementRef.nativeElement.querySelector('#pos-'+i);

      type ObjectKey = keyof typeof this.trikiValues;
      const myVar = 'pos'+i as ObjectKey;
      const valueActual = Number(this.trikiValues[myVar]);
      if (valueActual==0) {
        element.value = "";
      } else if(valueActual==1) {
        element.value = "o";
      } else if(valueActual==2){
        element.value = "x";
      }
    }
  }


  checkTriqui(item:any) {
    //TODO:hacer que no se pueda dar mas click luego de haber un ganador
    //TODO:antes de hacer algo revisr si ya se gano en otra maquina
    //TODO: ver como actualizar cada cierto tiempo o saber si algo cambio en la base de datos
    let that = this;
    item.value = this.symbol;
    this.onlineService.postTriki();
    this.onlineService.putTriki(
        item.name,
        (this.symbol=="o")?1:2
      );
    let value = this.symbol+this.symbol+this.symbol;
    caseOK.forEach(function(element, index, array) {
      let elem1 = that.elementRef.nativeElement.querySelector('#pos-'+element[0]);
      let elem2 = that.elementRef.nativeElement.querySelector('#pos-'+element[1]);
      let elem3 = that.elementRef.nativeElement.querySelector('#pos-'+element[2]);
      let isOK = elem1.value+elem2.value+elem3.value;
      if (value.length>0 && isOK.length>0 && isOK==value) {
        elem1.classList.add("border", "border-success", "input-ok");
        elem2.classList.add("border", "border-success", "input-ok");
        elem3.classList.add("border", "border-success", "input-ok");
        that.elementRef.nativeElement.querySelector('#player').innerHTML = item.value;
        that.elementRef.nativeElement.querySelector('#playerContainer').classList.remove("d-none");
      }
    });
  }
}
