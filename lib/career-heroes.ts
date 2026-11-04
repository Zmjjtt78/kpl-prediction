import data from './all-player-heroes.json';
import type {PlayerStats,HeroStats} from './battle-types';
const archive=data as unknown as {at:number,available:number,expected:number,players:Record<string,{name:string,icon:string,n:number,wins:number,heroes:HeroStats[]}>};
export const heroArchiveCoverage={at:archive.at,available:archive.available,expected:archive.expected};
export function careerHeroes(roster:PlayerStats[]):PlayerStats[]{return roster.map(p=>{const all=archive.players[p.name];return all?{...p,n:all.n,wins:all.wins,icon:all.icon||p.icon,heroes:all.heroes}:p})}
export function careerHero(name:string){return archive.players[name]||null}
