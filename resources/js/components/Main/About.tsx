import { appUrl } from '@/app';
import { Fade } from 'react-awesome-reveal';
import { classMap } from '../Tools/Misc';

export const About = () => {
  return (
    <section className="bg-[#0d0f11] text-white py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center">
        <Fade direction="up" triggerOnce>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#00d2ff]">
            About <span className="text-[#00ffb3]">PhiFinance</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-16">
            The launchpad empowering Web3 innovators to build and scale the future of decentralized technology.
          </p>
        </Fade>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side – Image */}
        <Fade triggerOnce direction="left">
          <div className={`w-full h-full bg-[#111215] border border-[#1e1f22] rounded-xl p-4 ${classMap.hoverAnimate()}`}>
            <img
              src={`${appUrl}/assets/images/phi/logo.png`}
              alt="About PhiFinance"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </Fade>

        {/* Right Side – Text */}
        <Fade triggerOnce direction="right">
          <div>
            <p className="text-lg text-gray-300 leading-relaxed">
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