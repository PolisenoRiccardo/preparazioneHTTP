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

  POSTozzo() : boolean
  {
    let postino = JSON.stringify({ 

        "nome": "Luigi",
        "cognome": "Campana",
        "data": "52/11/2009",
        "ora": "13.30",
        "indirizzo": "Via Sacconi, 4",
        "email": "blu@piccolo.com",
        "telefono": "1923932203"
      });
    
    const headers = {'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };
    this.observPrenotazione = this.http.post<Prenotazione>("https://my-json-server.typicode.com/PolisenoRiccardo/fakeServer/prenotazioni", postino, {headers});
    this.observPrenotazione.subscribe(prenotazionePostata => {this.prenotazionePostata = prenotazionePostata;});
    return false
  }



}
