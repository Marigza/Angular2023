import { ItemWithDetails } from 'src/app/youtube/models/item-with-details.model';

export interface YoutubeStore {
  customCards: ItemWithDetails[];
  youtubeCards: ItemWithDetails[];
  favoriteCards: ItemWithDetails[];
  error: string | null;
  isLoading: boolean;
}
