import { Hero } from '@/components/it-services/Hero';
import { Solutions } from '@/components/it-services/Solutions';
import { Services } from '@/components/it-services/Services';
import { Demo } from '@/components/it-services/Demo';
import { Products } from '@/components/it-services/Products';
import { Partners } from '@/components/it-services/Partners';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Solutions />
      <Services />

      <Products />
      <Demo />
      <Partners />
    </div>
  );
};

export default Index;
