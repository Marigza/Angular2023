import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { CardsStoreFacadeService } from '../../../shared/services/cards-store-facade.service';
import { ItemWithDetails } from '../../models/item-with-details.model';

@Component({
  selector: 'yta-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public currentDate = new Date();

  public newCard: ItemWithDetails = {
    kind: 'custom#video',
    etag: '',
    id: '',
    snippet: {
      publishedAt: '',
      channelId: '',
      title: '',
      description: '',
      thumbnails: {
        default: {
          url: '',
          width: 120,
          height: 90,
        },
        medium: {
          url: '',
          width: 320,
          height: 180,
        },
        high: {
          url: '',
          width: 480,
          height: 360,
        },
        standard: {
          url: '',
          width: 640,
          height: 480,
        },
        maxres: {
          url: '',
          width: 1280,
          height: 720,
        },
      },
      channelTitle: '',
      tags: [],
      categoryId: '',
      liveBroadcastContent: '',
      defaultLanguage: '',
      localized: {
        title: '',
        description: '',
      },
      defaultAudioLanguage: '',
    },
    statistics: {
      viewCount: '50',
      likeCount: '50',
      dislikeCount: '50',
      favoriteCount: '50',
      commentCount: '50',
    },
  };

  public createCard = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(255)]],
    image: ['', [Validators.required]],
    video: ['', [Validators.required]],
    date: ['', [Validators.required, Validators.maxLength(10), this.dateValidator()]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private cardsStoreFacadeService: CardsStoreFacadeService
  ) {}

  public dateValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const deltaTime = Number(this.currentDate) - Number(inputDate);

      return deltaTime < 0 ? { dateInFuture: true } : null;
    };
  }

  public onSubmit(): void {
    this.newCard.snippet.title = this.createCard.get('title')?.value ?? '';
    this.newCard.snippet.description = this.createCard.get('description')?.value ?? '';
    this.newCard.snippet.thumbnails.medium.url = this.createCard.get('image')?.value ?? '';
    this.newCard.snippet.thumbnails.high.url = this.createCard.get('image')?.value ?? '';
    this.newCard.snippet.thumbnails.maxres.url = this.createCard.get('video')?.value ?? '';
    this.newCard.snippet.publishedAt = this.createCard.get('date')?.value ?? '';
    this.newCard.id = this.generateId();

    this.cardsStoreFacadeService.createCustomCard(this.newCard);

    this.newCard = {
      kind: 'custom#video',
      etag: '',
      id: '',
      snippet: {
        publishedAt: '',
        channelId: '',
        title: '',
        description: '',
        thumbnails: {
          default: {
            url: '',
            width: 120,
            height: 90,
          },
          medium: {
            url: '',
            width: 320,
            height: 180,
          },
          high: {
            url: '',
            width: 480,
            height: 360,
          },
          standard: {
            url: '',
            width: 640,
            height: 480,
          },
          maxres: {
            url: '',
            width: 1280,
            height: 720,
          },
        },
        channelTitle: '',
        tags: [],
        categoryId: '',
        liveBroadcastContent: '',
        defaultLanguage: '',
        localized: {
          title: '',
          description: '',
        },
        defaultAudioLanguage: '',
      },
      statistics: {
        viewCount: '50',
        likeCount: '50',
        dislikeCount: '50',
        favoriteCount: '50',
        commentCount: '50',
      },
    };
    this.resetForm();
  }

  /* eslint-disable class-methods-use-this */

  public generateId(): string {
    return String(Math.round(Math.random() * 1000000));
  }

  /* eslint-enable class-methods-use-this */

  public resetForm(): void {
    this.createCard.reset();
  }
}
