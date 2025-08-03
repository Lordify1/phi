// resources/js/Components/Footer.tsx
export const Footer = () => {
  return (
    <footer className="bg-[#0d0f11] text-white py-10 border-t border-[#1e1f22] mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6 text-sm">
        <div>
          <h2 className="text-[#00d2ff] font-bold text-lg">PhiFinance</h2>
          <p className="mt-2 text-gray-400 max-w-sm">
            Building a future-proof Web3 incubation platform that accelerates growth and innovation.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          <div>
            <h3 className="font-semibold text-white mb-2">Explore</h3>
            <ul className="text-gray-400 space-y-1">
              <li><a href="/platform" className="hover:text-[#00ffb3]">Platform</a></li>
              <li><a href="/about" className="hover:text-[#00ffb3]">About Us</a></li>
              <li><a href="/careers" className="hover:text-[#00ffb3]">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Resources</h3>
            <ul className="text-gray-400 space-y-1">
              <li><a href="/docs" className="hover:text-[#00ffb3]">Docs</a></li>
              <li><a href="/blog" className="hover:text-[#00ffb3]">Blog</a></li>
              <li><a href="/contact" className="hover:text-[#00ffb3]">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-600 mt-6">
        © {new Date().getFullYear()} PhiFinance Inc. All rights reserved.
      </div>
    </footer>
  );
};
