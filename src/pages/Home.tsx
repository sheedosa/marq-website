import Hero from '../components/Hero';
import Why from '../components/Why';
import Services from '../components/Services';
import Process from '../components/Process';
import Work from '../components/Work';
import FinalCta from '../components/FinalCta';

export default function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Services />
      <Process />
      <Work />
      <FinalCta tone="gold" />
    </>
  );
}
