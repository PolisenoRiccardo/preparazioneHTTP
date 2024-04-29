import { Component } from '@angular/core';
import { Prenotazione } from './prenotazione.model';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.css']
})
export class PrenotazioniComponent {
  selezionata: boolean = false;
  prenotazioneSelezionata!: Prenotazione; 
  prenotazioni: Array<Prenotazione> = [
    new Prenotazione('Riccardo', 'Poliseno', 'via delle Grigne' ,'112','polipo6@gmail.com',  '08/01/2006', '9.30' ),
    new Prenotazione('Riccardo', 'Poliseno', 'via delle Grigne' ,'112','polipo6@gmail.com',  '08/01/2006', '9.30' ),
    new Prenotazione('Riccardo', 'Poliseno', 'via delle Grigne' ,'112','polipo6@gmail.com',  '08/01/2006', '9.30' )
  ];

  constructor() {}

  selezionaPrenotazione(prenotazio: Prenotazione) {
    this.selezionata = true;
    this.prenotazioneSelezionata = prenotazio;
  }
}
