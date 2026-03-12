export class SocialMedia {
  social_media_id!: number;
   profile_id!: number;
  platform!: string;
  handle!: string;
  link!: string;

  constructor(init?: Partial<SocialMedia>) {
    Object.assign(this, init);
  }
}