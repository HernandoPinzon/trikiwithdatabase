import { Injectable, Output, EventEmitter } from '@angular/core';
import { Triki } from '../models/TrikiModel';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {
  @Output() disparadorDeActualizacion: EventEmitter<any> = new EventEmitter();
  constructor() { }


  actualizar(triki:Triki){
    
  }
}
