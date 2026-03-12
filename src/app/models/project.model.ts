import { BaseModel } from "./base.model";

export class Project extends BaseModel {
  project_id!: number;
  profile_id!: number;
  name!: string;
  description!: string;
  link!: string;

  constructor(init?: Partial<Project>) {
    super(init);
    Object.assign(this, init);
  }
}