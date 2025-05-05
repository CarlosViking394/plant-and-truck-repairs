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
    
    // In a real application, you would submit the form data to your backend or an API
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demonstration purposes, we'll just log the form data and show success
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
      
      // Reset form status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600 text-gray-800"
          placeholder="John Smith"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600 text-gray-800"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600 text-gray-800"
            placeholder="(04) 1234 5678"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Service Required *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600 text-gray-800"
        >
          <option value="" disabled>Select a service</option>
          <option value="diesel-mechanic">Mobile Diesel Mechanic</option>
          <option value="plant-repairs">Mobile Plant Repairs</option>
          <option value="earthmoving-repairs">Earthmoving Repairs</option>
          <option value="truck-repairs">Truck Repairs</option>
          <option value="air-conditioning">Air-conditioning Service</option>
          <option value="auto-electrical">Auto Electrical</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600 text-gray-800"
          placeholder="Please provide details about the service you need..."
        ></textarea>
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-300 ${
            formStatus === 'submitting' 
              ? 'bg-cyan-700 cursor-not-allowed' 
              : 'bg-cyan-700 hover:bg-cyan-800'
          }`}
        >
          {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </div>
      
      {formStatus === 'success' && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
          Thank you! Your message has been sent. We&apos;ll get back to you shortly.
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md">
          There was a problem sending your message. Please try again later.
        </div>
      )}
    </form>
  );
} 