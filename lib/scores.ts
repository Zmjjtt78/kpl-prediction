export type ScorePair=[number|null,number|null];
export function validScorePair(pair:ScorePair){const [a,b]=pair;return a!==null&&b!==null&&Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&a<=4&&b>=0&&b<=4&&a!==b&&(a===4||b===4);}
export function scoreMessage(pair:ScorePair){if(pair[0]===null||pair[1]===null)return '请为两队各选一个比分，选完才计入预测。';if(!validScorePair(pair))return '这个比分不能用，请更改：必须一方为4，另一方为0–3，不能同分。';return '';}
