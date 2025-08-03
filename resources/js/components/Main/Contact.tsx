import { Fade } from "react-awesome-reveal";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export const Contact = () => {
  return (
    <section className="py-20 bg-[#0e0f10] text-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <Fade cascade direction="left" triggerOnce>
          <div>
            <h2 className="text-4xl font-bold mb-4 text-[#4db8ff]">Contact Us</h2>
            <p className="text-gray-400 mb-8">
              Have questions or want to collaborate? Fill out the form and we’ll get back to you ASAP.
            </p>
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-[#1a1d20] text-white border border-gray-700 focus:outline-none focus:border-[#4db8ff]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded bg-[#1a1d20] text-white border border-gray-700 focus:outline-none focus:border-[#4db8ff]"
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full p-3 rounded bg-[#1a1d20] text-white border border-gray-700 focus:outline-none focus:border-[#4db8ff]"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-3 bg-[#19e68c] text-black font-medium rounded hover:bg-[#15c67a] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </Fade>

        <Fade direction="right" triggerOnce>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Our Location</h4>
                <p className="text-gray-400">Swiss-based HQ • Remote-first worldwide</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                <p className="text-gray-400">info@phifinance.tech</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-400">+41 22 123 4567 (Mon–Fri)</p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};
