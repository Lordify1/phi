import { Fade } from 'react-awesome-reveal';
import SendRequest from '../Tools/SendRequest';
import { useState } from 'react';

export const Newsletter = () => {
  const [data, setData] = useState({
    name: "",
    email: ""
  });
  
  const handleChange = (e:any) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <section className="bg-[#0d0f11] py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Fade triggerOnce>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe to our <span className="text-[#00ffb3]">Newsletter</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Looking to keep track with PhiFinance and not miss anything that happens in the Phi Axis?
            Subscribe to our newsletter to stay connected. You can unsubscribe anytime.
          </p>
        </Fade>

        <form className="mt-10 grid gap-4 md:grid-cols-3 items-center">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-3 rounded-md bg-[#1e1f22] text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-[#00d2ff]"
            name='name'
            value={data.name}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Enter email"
            className="px-4 py-3 rounded-md bg-[#1e1f22] text-white placeholder-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-[#00d2ff]"
            name='email'
            value={data.email}
            onChange={handleChange}
          />
          <SendRequest
          text='Subscribe'
          url={`/newsletter/subscribe`}
          data={data}
          onResponse={() => {}}
          />
        </form>
      </div>
    </section>
  );
};

