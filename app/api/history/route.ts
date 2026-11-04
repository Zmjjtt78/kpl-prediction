import coverage from '../../../lib/history-coverage.json';
import finalIds from '../../../lib/final-match-ids.json';
import {championFiveStats} from '../../../lib/finals-insights';
import {getEvidence} from '../../../lib/evidence-server';
import {getArena,history} from '../../../lib/server-data';
import {historyInsights} from '../../../lib/history-insights';
import type {EvidenceBattle} from '../../../lib/battle-types';
export async function GET(){const current=await getArena();const evidence=await getEvidence(current.matches);const matches=[...history.filter(m=>m.league!=='20260004'),...current.matches];return Response.json({matches,coverage,finalFive:championFiveStats(matches,evidence.battles,finalIds),stats:historyInsights(matches,evidence.battles),at:evidence.at,live:current.live});}
