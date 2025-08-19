import { Fade } from 'react-awesome-reveal';
import { classMap } from '../Tools/Misc';
import { appUrl } from '@/app';

const services = [
  {
    title: "Startup Incubation & Acceleration",
    description:
      "Our end-to-end incubation services provide Web3.0 startups with the tools, resources, and guidance needed to bring their ideas to life.",
    image: `${appUrl}/assets/images/phi/acceleration.png`,
  },
  {
    title: "Investor Relations & Fundraising",
    description:
      "We connect visionary startups with committed investors through our strong networks to help them secure funding, build relationships, and create partnerships.",
    image: `${appUrl}/assets/images/phi/relation.png`,
  },
  {
    title: "Entrepreneur & Investor Dev.",
    description:
      "We nurture talent by giving early access to projects, hands-on learning, and exclusive opportunities—empowering future founders and investors in the Web3 space.",
    image: `${appUrl}/assets/images/phi/investor.png`,
  },
];

export const Services = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl text-center mx-auto">
        <Fade triggerOnce cascade>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00d2ff]">Why Choose Us</h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-16">
            PhiFinance is more than just an incubator — we're a launchpad for Web3 pioneers.
          </p>
        </Fade>

        <div className="grid gap-16 md:grid-cols-3">
          {services.map((service, idx) => (
            <Fade key={idx} direction="up" cascade triggerOnce>
              <div className={`bg-[#121417] border border-[#1e1f22] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition hover:duration-300 ${classMap.hoverAnimate()}`}> 
                <img
                  src={service.image}
                  alt={service.title}
                  className="my-image w-full h-50 object-cover"
                />
                <div className="p-6 space-y-4 h-50">
                  <h3 className="text-xl font-semibold text-[#00ffb3]">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};
