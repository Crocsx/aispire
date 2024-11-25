import { Header } from '../_components';
import { Navbar } from './_components';
import { Shell } from './shell';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Shell header={<Header />} navbar={<Navbar />}>
      {children}
    </Shell>
  );
}
