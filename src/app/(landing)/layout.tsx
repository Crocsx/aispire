import { Header } from '../_components';
import { Shell } from './shell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell header={<Header />}>{children}</Shell>;
}
