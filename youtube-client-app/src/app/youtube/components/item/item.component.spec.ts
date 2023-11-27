import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { ItemWithDetails } from '../../models/item-with-details.model';
import { ItemComponent } from './item.component';

const mockItem: ItemWithDetails = {
  kind: 'kind',
  etag: '',
  id: 'id',
  snippet: {
    publishedAt: 'publishedAt',
    channelId: 'channelId',
    title: 'title',
    description: 'description',
    thumbnails: {
      default: {
        url: 'url',
        width: 100,
        height: 100,
      },
      medium: {
        url: 'url',
        width: 100,
        height: 100,
      },
      high: {
        url: 'url',
        width: 100,
        height: 100,
      },
      standard: {
        url: 'url',
        width: 100,
        height: 100,
      },
      maxres: {
        url: 'url',
        width: 100,
        height: 100,
      },
    },
    channelTitle: 'channelTitle',
    tags: ['tag'],
    categoryId: 'categoryId',
    liveBroadcastContent: 'liveBroadcastContent',
    localized: {
      title: 'title',
      description: 'description',
    },
    defaultAudioLanguage: 'defaultAudioLanguage',
  },
  statistics: {
    viewCount: '1',
    likeCount: '1',
    dislikeCount: '1',
    favoriteCount: '1',
    commentCount: '1',
  },
};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [StoreModule.forRoot()],
    });
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.card = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
