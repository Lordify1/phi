import { Fade } from 'react-awesome-reveal';
import { classMap } from '../Tools/Misc';

const services = [
  {
    title: "Startup Incubation and Acceleration",
    description:
      "Our end-to-end incubation services provide Web3.0 startups with the tools, resources, and guidance needed to bring ideas to life. From concept to launch, we support every growth stage.",
    image: "https://placehold.co/600x400/000000/FFF",
  },
  {
    title: "Investor Relations and Fundraising",
    description:
      "We connect visionary startups with committed investors. Through strong networks, we help secure funding, build relationships, and create partnerships that power sustainable growth.",
    image: "https://placehold.co/600x400/000000/FFF",
  },
  {
    title: "Entrepreneur & Investor Development",
    description:
      "We nurture talent by giving early access to projects, hands-on learning, and exclusive opportunities—empowering future founders and investors in the Web3 space.",
    image: "https://placehold.co/600x400/000000/FFF",
  },
];

export const Services = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Fade direction="up" triggerOnce>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#00d2ff]">
            What We Offer
          </h2>
        </Fade>

        <div className="grid gap-16 md:grid-cols-3">
          {services.map((service, idx) => (
            <Fade key={idx} direction="up" cascade triggerOnce>
              <div className={`bg-[#121417] border border-[#1e1f22] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition hover:duration-300 ${classMap.hoverAnimate()}`}> 
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-6 space-y-4">
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
