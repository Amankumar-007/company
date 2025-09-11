"use client"

export default function ContactFooter() {
  return (
    <footer className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="fade-up">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Have an idea?
              </h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl">
                Let's create something extraordinary together. We're always excited to hear about new projects and collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:info@cuberto.com" 
                  className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium text-center"
                >
                  info@cuberto.com
                </a>
                <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300 font-medium">
                  Schedule a Call
                </button>
              </div>
            </div>
          </div>
          
          <div className="fade-up">
            <h4 className="text-xl font-semibold mb-6">Our Locations</h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-medium mb-2">Main Office</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  901 N Pitt Street<br />
                  Alexandria VA, 22314<br />
                  United States
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-2">European Office</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Na Perstyne 342/1<br />
                  11000 Prague<br />
                  Czech Republic
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="fade-up mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Design Agency. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Instagram
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Dribbble
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
