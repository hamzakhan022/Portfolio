import {
  Automation,
  Contact,
  Experience,
  Hero,
  HowIWork,
  MoreWork,
  ProofBar,
  SelectedWork,
  Testimonials,
} from '@/components/home/Sections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofBar />
      <SelectedWork />
      <Automation />
      <MoreWork />
      <HowIWork />
      <Experience />
      <Testimonials />
      <Contact />
    </>
  );
}
