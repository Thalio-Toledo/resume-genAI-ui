export class Language {
  language_id!: string;
  profile_id!: number;
  name!: string;
  level!: string;

  constructor(init?: Partial<Language>) {
    Object.assign(this, init);
  }
}