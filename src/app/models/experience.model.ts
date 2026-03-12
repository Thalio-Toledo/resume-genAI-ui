export class Experience {
  experience_id!: string;
  profile_id!: number;
  company!: string;
  is_current!: boolean;
  role!: string;
  description!: string;
  start_date!: string;
  end_date!: string;

  constructor(init?: Partial<Experience>) {
    Object.assign(this, init);
  }
}