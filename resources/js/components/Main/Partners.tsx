// src/Pages/Sections/Partners.tsx

import { appUrl } from '@/app';
import axios from 'axios';
import { useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';

const partners = [
  {
    name: 'Giakaa Capital',
    logo: 'assets/images/partners/giakaa_capital.jpg',
    link: 'https://x.com/giakaacapital',
  },
  {
    name: 'Cequire Capital',
    logo: 'assets/images/partners/cequire_capital.jpg',
    link: 'https://cequire.com/',
  },
  // Add more partners here if needed
];

export const Partners = ({ partners }) => {
  return (
    <section className="bg-[#0d0f11] py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Fade triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Our <span className="text-[#00ffb3]">Partners</span>
          </h2>
        </Fade>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 items-center justify-center">
          {partners.map((partner:any, i:any) => {
            const logo = JSON.parse(partner.logo)
            return(
              <Fade direction="up" delay={i * 100} triggerOnce key={i}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mx-auto grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                >
                  <img
                    src={`${logo[0].url}`}
                    alt={partner.name}
                    className="max-h-20 w-auto mx-auto rounded-xl hover:rounded-sm"
                  />
                </a>
              </Fade>
            )
          })}
        </div>
      </div>
    </section>
  );
};


