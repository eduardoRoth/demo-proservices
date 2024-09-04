import { Component, computed, inject, input } from '@angular/core';
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title> Character</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      @if (character(); as c) {
        <ion-item>
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
  imports: [
    IonAvatar,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
  ],
})
export default class CharacterIdPageComponent {
  readonly characterId = input();
  private readonly http = inject(HttpClient);
  readonly character = toSignal(
    toObservable(this.characterId).pipe(
      filter((id) => !!id),
      switchMap((id) =>
        this.http.get<any>(`https://rickandmortyapi.com/api/character/${id}`),
      ),
    ),
  );
}
