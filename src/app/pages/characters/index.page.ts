import { Component, inject } from '@angular/core';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-characters',
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonAvatar,
    IonLabel,
    RouterLink,
  ],
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Characters </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      @for (c of characters(); track c.id) {
        <ion-item [routerLink]="'/characters/' + c.id">
          <ion-avatar slot="start">
            <img [src]="c.image" [alt]="c.name" />
          </ion-avatar>
          <ion-label>
            <h2>
              {{ c.name }}
            </h2>
            <p>
              {{ c.status }}
            </p>
          </ion-label>
        </ion-item>
      }
    </ion-content>
  `,
  styles: ``,
})
export default class CharactersPageComponent {
  private readonly http = inject(HttpClient);
  readonly characters = toSignal(
    this.http
      .get('https://rickandmortyapi.com/api/character')
      .pipe(map((response: any) => response.results)),
  );
}
