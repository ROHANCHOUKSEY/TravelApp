import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { IoLocationSharp, IoCall, IoMail } from 'react-icons/io5';

const Footer = () => {
  return (
    <footer className="relative top-[64px] bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="bg-blue-500 p-2 rounded-lg mr-2">✈</span>
              Bharat Explorers
            </h2>
            <p className="text-gray-400 mb-4">
             Explore Bharat with us. We make travel planning simple, seamless, and unforgettable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Destinations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Special Deals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Tour Packages</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Travel Guides</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Refund Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <IoLocationSharp className="mt-1 mr-2 text-blue-400" />
                <span className="text-gray-400">123 Travel Street, Tourism City, 101010</span>
              </li>
              <li className="flex items-center">
                <IoCall className="mr-2 text-blue-400" />
                <span className="text-gray-400">+91 7898924256</span>
              </li>
              <li className="flex items-center">
                <IoMail className="mr-2 text-blue-400" />
                <span className="text-gray-400">contact@bharatexplorers.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-10 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-gray-400">This is a demo project. Newsletter feature coming soon.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-l-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-r-lg transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Bharat Explorers. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;