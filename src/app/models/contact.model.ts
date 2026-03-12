export class Contact {
  contact_id!: number;
  profile_id!: number;
  email!: string;
  phone_number!: string;

  constructor(init?: Partial<Contact>) {
    Object.assign(this, init);
  }
}