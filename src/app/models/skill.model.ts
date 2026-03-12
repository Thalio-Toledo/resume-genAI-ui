export class Skill {
  skill_id!: string;
  profile_id!: number;
  name!: string;
  level!: string;

  constructor(init?: Partial<Skill>) {
    Object.assign(this, init);
  }
}