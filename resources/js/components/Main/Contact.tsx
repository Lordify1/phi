import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import SendRequest from "../Tools/SendRequest";
import { classMap } from "../Tools/Misc";


export const Contact = () => {

  const [data, setData] = React.useState({
    name: "",
    email: "",
    message: "",
    reason_id: ""
  })

  const contactTypes = [
    "complaint",
    "request",
    "feedback",
    "support",
    "general_inquiry",
    "other",
  ]

  const setDataToNull = () => {
    setData({
      name: "",
      email: "",
      message: "",
      reason_id: ""
    })
  }

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
                onChange={(e) => setData((prev) => ({...prev, name: e.target.value}))}
                className={`${classMap.input()}`}
              />
              <input
                type="email"
                placeholder="Your Email"
                onChange={(e) => setData((prev) => ({...prev, email: e.target.value}))}
                className={`${classMap.input()}`}
              />
              <textarea
                rows={5}
                placeholder="Your Message"
                onChange={(e) => setData((prev) => ({...prev, message: e.target.value}))}
                className={`${classMap.input()}`}
              ></textarea>
              <select 
              name="reason_id"
              id="reason_id"
              onChange={(e) => setData((prev) => ({...prev, reason_id: e.target.value}))}
              className={`${classMap.input()}`}>
                <option value="" className="text-red-200">Select message Purpose</option>
                {contactTypes.map((item, index) => {
                  return(
                    <option value={item} key={index}>{item}</option>
                  )
                })}
              </select>
              <SendRequest
                url={'/contact_us'}
                method="post"
                data={data}
                className="w-full"
                onResponse={() => {setDataToNull()}}
                text="Send Message"
              />
            </form>
          </div>
        </Fade>

        <Fade direction="right" triggerOnce>
          <div className="space-y-6">
            {/* <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Our Location</h4>
                <p className="text-gray-400">Swiss-based HQ • Remote-first worldwide</p>
              </div>
            </div> */}

            <div className="flex items-start gap-4 ">
              <FaEnvelope className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                <p className="text-gray-400">info@phifinance.tech</p>
              </div>
            </div>

            {/* <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-[#4db8ff] text-xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-400">+41 22 123 4567 (Mon–Fri)</p>
              </div>
            </div> */}
          </div>
        </Fade>
      </div>
    </section>
  );
};
