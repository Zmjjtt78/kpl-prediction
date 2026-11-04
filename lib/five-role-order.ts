import type {Player} from './battle-types';
import {POSITIONS} from './insights';
// Historical provider position labels can reflect a player's later role.
// Exact-roster presentation overrides follow contemporary published starting-lineup order.
const historicalOrders=[['诺言','花海','Cat','Alan','无铭'],['星痕','无畏','清融','久酷','子阳'],['Fly','Giao','Mojo','1dao','770'],['坦然','花海','清融','易峥','子阳']];
export function fiveRoleOrder(names:string[],players:Player[],teamId:string){const identity=names.slice().sort().join('|'),known=historicalOrders.find(order=>order.slice().sort().join('|')===identity);if(known)return known.slice();return names.slice().sort((a,b)=>{const rank=(n:string)=>{const i=POSITIONS.indexOf(players.find(p=>p.teamId===teamId&&p.name===n)?.pos||'');return i<0?99:i};return rank(a)-rank(b)});}
