import { NameParameters } from './name-parameters.model';
import { SizeVariants } from './size-variants.model';

export interface Snippet extends NameParameters {
  publishedAt: string;
  channelId: string;
  thumbnails: SizeVariants;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: NameParameters;
  defaultAudioLanguage: string;
}
