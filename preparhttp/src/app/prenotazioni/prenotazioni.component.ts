import { Component } from '@angular/core';
import { Prenotazione } from './prenotazione.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent {
  selezionata: boolean = false;
  prenotazioneSelezionata!: Prenotazione;
  prenotazionePostata!: Prenotazione;
  observPrenotazioneArray! : Observable<Prenotazione[]>; 
  observPrenotazione!: Observable<Prenotazione>; 
  prenotazioni: Array<Prenotazione> = [];

  constructor(public http: HttpClient) {
    for (let i = -1; i < this.prenotazioni.length; i++) {
      this.makeTypedRequest() };
  }

  selezionaPrenotazione(prenotazio: Prenotazione) {
    this.selezionata = true;
    this.prenotazioneSelezionata = prenotazio;
  }

  makeTypedRequest() : void
  {
    //observPrenotazione : Observable<Prenotazione[]>; va dichiarato tra gli attributi della classe
    this.observPrenotazioneArray = this.http.get<Prenotazione[]>('https://my-json-server.typicode.com/PolisenoRiccardo/fakeServer/prenotazioni');
    this.observPrenotazioneArray.subscribe(prenotazioni => {this.prenotazioni = prenotazioni;});
  }

  POSTozzo(nome: HTMLInputElement, cognome: HTMLInputElement,indirizzo: HTMLInputElement,telefono: HTMLInputElement,mail: HTMLInputElement,data: HTMLInputElement,ora: HTMLInputElement,) : boolean
  {
    let prenotazione = new Prenotazione(nome.value, cognome.value, data.value, ora.value, indirizzo.value, mail.value, telefono.value)
    let postino = JSON.stringify(
      Object(prenotazione)
    );
    
    const headers = {'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };
    this.observPrenotazione = this.http.post<Prenotazione>("https://my-json-server.typicode.com/PolisenoRiccardo/fakeServer/prenotazioni", postino, {headers});
    this.observPrenotazione.subscribe(prenotazionePostata => {this.prenotazionePostata = prenotazionePostata;});
    this.prenotazioni.push(prenotazione)
    return false
  }



}
