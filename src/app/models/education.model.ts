export class Education {
  education_id!: string;
  profile_id!: number;
  institution!: string;
  degree!: string;
  field!: string;
  start_date!: string;
  end_date!: string;

  constructor(init?: Partial<Education>) {
    Object.assign(this, init);
  }
}