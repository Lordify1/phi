import { Link } from '@inertiajs/react';
import { Fade } from 'react-awesome-reveal';

export const Hero = () => {
  return (
    <section className="min-h-screen bg-[#0d0f11] text-white flex items-center px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24 md:py-32">
        {/* Text Content */}
        <Fade direction="up" cascade>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#00d2ff]">
              Build the Web3 Future with
              <br />
              <span className="text-[#00ffb3]">PhiFinance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl">
              Accelerate your startup in the decentralized economy. From funding to incubation, we provide everything you need to launch and scale your Web3 venture.
            </p>
            {/* <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/get-started"
                className="bg-[#00ffb3] hover:bg-[#00d2ff] text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link
                href="/platform"
                className="border border-[#00ffb3] hover:bg-[#00d2ff] text-[#00ffb3] hover:text-black px-6 py-3 rounded-lg font-semibold transition"
              >
                Explore Platform
              </Link>
            </div> */}
          </div>
        </Fade>

        {/* Placeholder for Animation or Image */}
        <Fade direction="right">
          <div className="w-full h-[350px] md:h-[450px] bg-[#00d2ff]/10 border border-[#00ffb3]/30 rounded-xl flex items-center justify-center text-gray-400">
            [3D Visual / Animation Placeholder]
          </div>
        </Fade>
      </div>
    </section>
  );
};