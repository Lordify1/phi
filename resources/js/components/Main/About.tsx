import { Fade } from 'react-awesome-reveal';

export const About = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side – Image */}
        <Fade triggerOnce direction="left">
          <div className="w-full h-full bg-[#111215] border border-[#1e1f22] rounded-xl p-4">
            <img
              src="https://placehold.co/600x400/000000/FFF?text=About+Image"
              alt="About PhiFinance"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </Fade>

        {/* Right Side – Text */}
        <Fade triggerOnce direction="right">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#00d2ff] mb-6">
              About <span className="text-[#00ffb3]">PhiFinance</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              PhiFinance is more than just an incubator — we're a launchpad for Web3 pioneers.
              Built on the principles of innovation, transparency, and growth, we empower bold
              ideas and transform them into real-world blockchain success stories.
            </p>
            <p className="mt-6 text-gray-300">
              From incubation to investor connection, our focus remains on long-term value,
              strategic infrastructure, and building ecosystems where both startups and investors
              thrive.
            </p>
            <p className="mt-6 text-gray-300">
              At PHI, we’re dedicated to advancing the Web3.0 ecosystem through innovation, empowerment, and strategic growth. Our dual focus—PHI Incubator and PHI Finance—creates a powerful support system for emerging startups and visionary founders. PHI Incubator empowers Web3.0 innovators with secure, comprehensive incubation services, connecting them to resources, mentorship, and investors who share our commitment to a thriving decentralized economy.
            </p>
            <p className='mt-6 text-gray-300'>
                Meanwhile, PHI Finance enhances this journey by leveraging networks, protocols, and financial expertise to fuel both founder and investor success. Together, we’re building a future where every pioneering project in DeFi, NFTs, and the metaverse can redefine global digital ecosystems.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
};
