"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setFormStatus('success');

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name <span className="text-amber-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 transition-all duration-200 placeholder:text-gray-400"
          placeholder="John Smith"
        />
      </div>

      {/* Email and Phone in grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address <span className="text-amber-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 transition-all duration-200 placeholder:text-gray-400"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-amber-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 transition-all duration-200 placeholder:text-gray-400"
            placeholder="04XX XXX XXX"
          />
        </div>
      </div>

      {/* Service dropdown */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
          Service Required <span className="text-amber-500">*</span>
        </label>
        <div className="relative">
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="" disabled>Select a service</option>
            <option value="diesel-mechanic">Mobile Diesel Mechanic</option>
            <option value="plant-repairs">Mobile Plant Repairs</option>
            <option value="earthmoving-repairs">Earthmoving Repairs</option>
            <option value="truck-repairs">Truck Repairs</option>
            <option value="air-conditioning">Air-conditioning Service</option>
            <option value="auto-electrical">Auto Electrical</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-gray-800 transition-all duration-200 resize-none placeholder:text-gray-400"
          placeholder="Please provide details about the service you need..."
        ></textarea>
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            formStatus === 'submitting'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5'
          }`}
        >
          {formStatus === 'submitting' ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Success message */}
      {formStatus === 'success' && (
        <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 text-green-800 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Message sent successfully!</p>
            <p className="text-sm text-green-600">We&apos;ll get back to you shortly.</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {formStatus === 'error' && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 text-red-800 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Something went wrong</p>
            <p className="text-sm text-red-600">Please try again later.</p>
          </div>
        </div>
      )}
    </form>
  );
}
