export class Certification {
  certification_id!: number;
  profile_id!: number;
  name!: string;
  issuer!: string;
  date_issued!: string;

  constructor(init?: Partial<Certification>) {
    Object.assign(this, init);
  }
}