export class BaseModel {
  createdAt?: string;
  updatedAt?: string;

  constructor(init?: Partial<BaseModel>) {
    Object.assign(this, init);
  }
}