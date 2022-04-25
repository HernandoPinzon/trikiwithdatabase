import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http'
import { Triki } from '../models/TrikiModel';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnlineService {

  _url = 'http://localhost:8080/api/triki/62659b537c715fc6599899d8'

  constructor(
    private http: HttpClient
  ) {
    console.log('Servicio persona')
  }

  getTriki(){
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
    let trikiResponse = this.http.get<Triki>(this._url, {headers: headers})
    return trikiResponse;
  }



  postTriki(){
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')

    let trikiBase:Triki = {
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
      pos5: 0,
      pos6: 0,
      pos7: 0,
      pos8: 0,
      pos9: 0
    }

    let trikiResponse = this.http.post<Triki>(this._url, trikiBase)
    return trikiResponse;
  }

  putTriki(position:string ,value:number){
    let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
    console.log("put:", position, value)

    const body = { pos5: value };

    const params = new HttpParams().set( position,value);
    
    let trikiResponse = this.http.put<Triki>(this._url, params);
    
    //let trikiResponse = this.http.put(this._url, null, {headers: headers, params: params})
    //return trikiResponse;
  }
}