import { Component, Input } from '@angular/core';
import { Prenotazione } from '../prenotazioni/prenotazione.model';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.css']
})
export class DettagliComponent {
 @Input() prenotazione! : Prenotazione;
}
