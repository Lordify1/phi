// src/Pages/Sections/Why.tsx

import { Fade } from 'react-awesome-reveal';
import { classMap } from '../Tools/Misc';

const reasons = [
  {
    title: "Comprehensive Web3 Expertise",
    description:
      "With specialized knowledge in DeFi, NFTs, the metaverse, and blockchain, we guide Web3.0 startups through every phase of development.",
  },
  {
    title: "Secure and Trustworthy Environment",
    description:
      "Security is at the core of everything we do. We prioritize infrastructure and transparency to give startups peace of mind.",
  },
  {
    title: "Mentorship from Industry Leaders",
    description:
      "Our mentors bring years of Web3 and finance experience to guide founders through common pitfalls and scale strategically.",
  },
  {
    title: "Access to a Global Investor Network",
    description:
      "We connect startups with passionate global investors, opening funding, partnerships, and collaborations worldwide.",
  },
  {
    title: "Innovation-Driven Culture",
    description:
      "We encourage bold ideas and creative problem-solving—empowering founders to push the boundaries of decentralized tech.",
  },
  {
    title: "Commitment to Long-Term Growth",
    description:
      "We focus on sustainability. Our support system is built to nurture startups through long-term success.",
  },
];

export const Why = () => {
  return (
    <section className="bg-[#0d0f11] text-white px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto text-center">
        <Fade triggerOnce cascade>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#00d2ff]">Why Choose Us</h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-16">
            We’re more than just an incubator — we’re your growth partner in the evolving Web3.0 frontier.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {reasons.map((item, i) => (
            <Fade direction="up" delay={i * 100} triggerOnce key={i}>
              <div className={`bg-[#111315] border border-[#1e1f22] rounded-xl flex flex-col h-full shadow-md hover:shadow-lg transition ${classMap.hoverAnimate()}`}>
                <img
                  src="https://placehold.co/600x400/000000/FFF?text=Why+Us"
                  alt={item.title}
                  className={`rounded-t-xl w-full h-48 object-cover`}
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-[#00ffb3] mb-2">{item.title}</h3>
                  <p className="text-gray-300 flex-1">{item.description}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};
