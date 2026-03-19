import { Profile } from "../models/profile.model";
import { Skill } from "../models/skill.model";

export class Resume{
    profile: Profile
    match: number
    skillsRequired: Skill[]
}