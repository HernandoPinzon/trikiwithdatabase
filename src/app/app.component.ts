import { Component } from '@angular/core';
import { Triki } from './models/TrikiModel';
import { OnlineService } from './services/online.service';
import { UpdateService } from './services/update.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  start: boolean = false;
  symbolchoose: string = "o";
  trikiValues: Triki = {
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

  constructor(private onlineService:OnlineService, private updateService:UpdateService){
    this.onlineService.getTriki().subscribe((response)=>{
      this.trikiValues = response;
    })
    
  }


  selectPlayer(item: any){
    //TODO: reiniciar vista sin ngif sino modificando el DOM
    //TODO: obtener data desde base de datos
    //TODO: validar si el player1 ya creo un game antes de poder seleccionaer player2
    let button: HTMLElement = item!
    this.symbolchoose = button.id;
    this.onlineService.getTriki().subscribe((response)=>{
      this.trikiValues = response;
      this.updateService.disparadorDeActualizacion.emit({
        value:this.trikiValues
      })
    })
    this.onlineService.postTriki()
    this.start = true;
  }


  reiniciarJuego(){
    //TODO:reiniciar juego en la base de datos
  }

  actualizarJuego(){
    //TODO:actualizar vista del juego en la base de datos, SOLUCION PROVISIONAL
  }
}
