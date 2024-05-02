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
  observPrenotazione! : Observable<Prenotazione[]>; 
  prenotazioni: Array<Prenotazione> = [];

  constructor(public http: HttpClient) {this.makeTypedRequest() }

  selezionaPrenotazione(prenotazio: Prenotazione) {
    this.selezionata = true;
    this.prenotazioneSelezionata = prenotazio;
  }

  makeTypedRequest() : void
  {
    //observPrenotazione : Observable<Prenotazione[]>; va dichiarato tra gli attributi della classe
    this.observPrenotazione = this.http.get<Prenotazione[]>('http://localhost:5000/appointments');
    this.observPrenotazione.subscribe(data => {this.prenotazioni = data;});
  }

}
