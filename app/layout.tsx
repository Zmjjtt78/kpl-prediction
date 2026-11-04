import type {Metadata} from 'next';
import './globals.css';
import GlobalTools from '../components/arena/GlobalTools';
export const metadata:Metadata={title:'逐冠 · KPL预测台',description:'填写你的KPL晋级路线，查看对阵胜率、比赛比分与选手表现。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}<GlobalTools/></body></html>}
