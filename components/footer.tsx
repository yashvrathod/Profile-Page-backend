<footer className="w-full border-t border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              About
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Passionate developer crafting clean, scalable, and human-centered
              digital experiences with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
              Connect
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="mailto:youremail@example.com"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white transition"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white transition"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white transition"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-indigo-500 hover:text-white transition"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Built with <span className="text-red-500">♥</span> using Next.js
          </p>
        </div>
      </div>
    </footer>


 <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <form className="space-y-6">
          
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              required
            />
            <input
              type="email"
              placeholder="Email Address *"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
              required
            />
          </div>

          {/* Subject */}
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            required
          >
            <option value="">Select inquiry type *</option>
            <option value="research">Research Collaboration</option>
            <option value="guidance">Student Guidance</option>
            <option value="academic">Academic Discussion</option>
          </select>

          {/* Message */}
          <textarea
            placeholder="Message *"
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
            required
          ></textarea>

          {/* Consent */}
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input type="checkbox" className="mt-1 accent-emerald-600" required />
            I consent to the processing of my personal data for academic communication purposes.
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            🚀 Send Academic Inquiry
          </button>
        </form>
      </div>
