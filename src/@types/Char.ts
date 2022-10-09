export interface Char {
  name: string;
  title: string;
  vision: string;
  weapon: string;
  nation: string;
  affiliation: string;
  rarity: number;
  constellation: string;
  birthday: string;
  description: string;
  skillTalents?: (SkillTalentsEntity)[] | null;
  passiveTalents?: (PassiveTalentsEntity)[] | null;
  constellations?: (ConstellationsEntity)[] | null;
  vision_key: string;
  weapon_type: string;
}
export interface SkillTalentsEntity {
  name: string;
  unlock: string;
  description: string;
  type: string;
}
export interface PassiveTalentsEntity {
  name: string;
  unlock: string;
  description: string;
  level?: number | null;
}
export interface ConstellationsEntity {
  name: string;
  unlock: string;
  description: string;
  level: number;
}
