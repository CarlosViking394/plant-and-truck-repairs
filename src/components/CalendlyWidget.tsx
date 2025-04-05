"use client";

import React, { useState, useEffect, useRef } from 'react';

interface CalendlyWidgetProps {
  className?: string;
}

export default function CalendlyWidget({ className }: CalendlyWidgetProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState('Mobile Diesel Mechanic');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);

  const calendlyEmbedRef = useRef<HTMLDivElement>(null);

  // Generate next 7 available dates (excluding Sundays)
  const getAvailableDates = () => {
    const dates = [];
    let currentDate = new Date();
    
    while (dates.length < 7) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip Sundays (0 is Sunday in JavaScript's getDay)
      if (currentDate.getDay() !== 0) {
        dates.push(new Date(currentDate));
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();
  const timeSlots = ["7:00 AM", "8:30 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

  // Load Calendly script when component mounts
  useEffect(() => {
    if (showBookingForm && formStep === 1) {
      // Focus on first date option when form opens
      const dateElements = document.querySelectorAll('[data-date-element]');
      if (dateElements.length > 0) {
        // Set focus to the container
        (dateElements[0] as HTMLElement).focus();
        // If no date is selected, auto-select the first date
        if (!selectedDate && availableDates.length > 0) {
          handleDateSelection(availableDates[0]);
        }
      }
    }
  }, [showBookingForm, formStep, selectedDate]);

  // Function to toggle booking form visibility
  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
    if (!showBookingForm) {
      setFormStep(1);
    }
  };

  // Function to handle form step navigation
  const handleNextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  // Simple date formatter
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-AU', { 
      weekday: 'short',
      day: 'numeric', 
      month: 'short'
    });
  };

  // Handle date selection
  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
  };

  // Handle time selection
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate Calendly API call
    setTimeout(() => {
      // Construct Calendly URL with parameters
      // In a real implementation, this would properly integrate with Calendly's API
      // For demonstration, we're just showing a success message
      const calendlyParams = new URLSearchParams({
        name: name,
        email: 'customer@example.com', // Would come from form in real implementation
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
        time: selectedTime || '',
        service: serviceType,
        location: location,
        phone: phone
      });
      
      console.log(`Calendly booking parameters: ${calendlyParams.toString()}`);
      
      // Show success message
      alert('Your booking has been confirmed! We will contact you shortly to finalize the details.');
      
      // Reset form and close
      setIsSubmitting(false);
      toggleBookingForm();
    }, 1500);
  };

  // Check if form can proceed to next step
  const canProceedToStep2 = selectedDate !== null && selectedTime !== null;
  const canProceedToStep3 = serviceType !== '' && location !== '';
  const canSubmit = name !== '' && phone !== '';

  // Function to check if a date is selected
  const isDateSelected = (date: Date): boolean => {
    return selectedDate !== null && selectedDate.getTime() === date.getTime();
  };

  // Function to check if a time is selected
  const isTimeSelected = (time: string): boolean => {
    return selectedTime === time;
  };

  return (
    <div className={className}>
      <div 
        ref={calendlyEmbedRef}
        className="rounded-md bg-gradient-to-br from-gray-700 to-gray-800 text-center p-1"
      >
        {!showBookingForm ? (
          // Initial booking information view
          <div className="bg-gray-800 rounded-md p-6">
            <div className="mb-6 flex justify-center">
              <div className="bg-orange-500/20 p-4 rounded-full">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-orange-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-semibold mb-4 text-white">Quick Online Booking</h4>
            <p className="text-gray-300 mb-6 text-lg">
              Schedule a mobile mechanic service at your preferred location and time.
            </p>
            
            <div className="space-y-5 mb-6">
              <div className="flex items-center text-left">
                <svg className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-lg">Choose your preferred date & time</span>
              </div>
              <div className="flex items-center text-left">
                <svg className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-lg">Provide service details</span>
              </div>
              <div className="flex items-center text-left">
                <svg className="h-6 w-6 text-green-400 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-300 text-lg">Get confirmation instantly</span>
              </div>
            </div>
            
            <button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-md transition-colors duration-300 font-semibold text-xl shadow-lg flex items-center justify-center gap-3"
              onClick={toggleBookingForm}
              aria-label="Start booking process"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Book Now
            </button>
          </div>
        ) : (
          // Booking form view - multi-step form
          <div className="bg-gray-800 rounded-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-2xl font-semibold text-white">
                {formStep === 1 && "Select Date & Time"}
                {formStep === 2 && "Service Details"}
                {formStep === 3 && "Contact Information"}
              </h4>
              <button 
                onClick={toggleBookingForm}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
                aria-label="Close booking form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress bar */}
            <div className="mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="flex">
                    <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${formStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                      1
                    </span>
                    <span className={`text-xs font-semibold inline-block ml-1 mr-2 py-1 px-2 uppercase rounded-full ${formStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                      2
                    </span>
                    <span className={`text-xs font-semibold inline-block ml-1 py-1 px-2 uppercase rounded-full ${formStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-600 text-gray-300'}`}>
                      3
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-orange-500">
                      Step {formStep} of 3
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
                  <div
                    style={{ width: `${(formStep / 3) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                  ></div>
                </div>
              </div>
            </div>
            
            {formStep === 1 && (
              <>
                {/* Date selection */}
                <div className="mb-8">
                  <label className="block text-lg font-medium text-gray-300 mb-3 text-left">
                    <span className="text-yellow-400">Select</span> Date
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableDates.map((date, index) => (
                      <button 
                        key={index} 
                        data-date-element
                        className={`cursor-pointer rounded-lg p-4 transition-all text-center bg-[#1e2b3d] ${
                          isDateSelected(date)
                            ? 'ring-2 ring-orange-400 shadow-lg scale-105 bg-[#29384e]'
                            : 'hover:bg-[#29384e] hover:shadow-md'
                        }`}
                        onClick={() => handleDateSelection(date)}
                        type="button"
                      >
                        <span className="block text-sm font-bold mb-1 text-white">
                          {new Intl.DateTimeFormat('en-AU', { weekday: 'short' }).format(date)}
                        </span>
                        <span className="block text-3xl font-bold text-white">
                          {new Intl.DateTimeFormat('en-AU', { day: 'numeric' }).format(date)}
                        </span>
                        <span className="block text-sm mt-1 text-white">
                          {new Intl.DateTimeFormat('en-AU', { month: 'short' }).format(date)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Time selection */}
                <div className="mb-8">
                  <label className="block text-lg font-medium text-gray-300 mb-3 text-left">
                    <span className="text-yellow-400">Select</span> Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`cursor-pointer rounded-lg p-4 transition-all text-center bg-[#1e2b3d] ${
                          isTimeSelected(time)
                            ? 'ring-2 ring-orange-400 shadow-lg scale-105 bg-[#29384e]' 
                            : 'hover:bg-[#29384e] hover:shadow-md'
                        }`}
                        onClick={() => handleTimeSelection(time)}
                      >
                        <span className="block text-lg font-bold text-white">{time.split(' ')[0]}</span>
                        <span className="block text-sm font-medium text-gray-300">{time.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="button"
                    disabled={!canProceedToStep2}
                    className={`px-8 py-4 rounded-lg text-white font-semibold flex items-center gap-2 ${
                      canProceedToStep2 
                        ? 'bg-gray-600 hover:bg-gray-500' 
                        : 'bg-gray-700 cursor-not-allowed opacity-60'
                    }`}
                    onClick={handleNextStep}
                  >
                    Next Step
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </>
            )}
            
            {formStep === 2 && (
              <>
                {/* Service details */}
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-300 mb-3 text-left">Service Type</label>
                  <select 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                  >
                    <option value="Mobile Diesel Mechanic">Mobile Diesel Mechanic</option>
                    <option value="Plant Repairs">Plant Repairs</option>
                    <option value="Truck Servicing">Truck Servicing</option>
                    <option value="Auto Electrical">Auto Electrical</option>
                    <option value="Air Conditioning">Air Conditioning</option>
                  </select>
                </div>
                
                {/* Location */}
                <div className="mb-10">
                  <label className="block text-lg font-medium text-gray-300 mb-3 text-left">Service Location</label>
                  <input 
                    type="text" 
                    placeholder="Enter your address" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    className="px-6 py-3 rounded-lg text-white font-semibold bg-gray-700 hover:bg-gray-600 flex items-center gap-2"
                    onClick={handlePrevStep}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>
                  <button 
                    type="button"
                    disabled={!canProceedToStep3}
                    className={`px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 ${
                      canProceedToStep3 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'bg-gray-600 cursor-not-allowed opacity-60'
                    }`}
                    onClick={handleNextStep}
                  >
                    Next Step
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </>
            )}
            
            {formStep === 3 && (
              <>
                {/* Contact details */}
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-300 mb-3 text-left">Your Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-300 mb-3 text-left">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="mb-8">
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                    <h5 className="font-medium text-white mb-2">Booking Summary</h5>
                    <ul className="space-y-2 text-left">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Date:</span>
                        <span className="text-white">{selectedDate ? formatDate(selectedDate) : ''}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Time:</span>
                        <span className="text-white">{selectedTime}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Service:</span>
                        <span className="text-white">{serviceType}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Location:</span>
                        <span className="text-white">{location}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    type="button"
                    className="px-6 py-3 rounded-lg text-white font-semibold bg-gray-700 hover:bg-gray-600 flex items-center gap-2"
                    onClick={handlePrevStep}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back
                  </button>
                  <button 
                    type="button"
                    disabled={!canSubmit || isSubmitting}
                    className={`px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 ${
                      canSubmit && !isSubmitting
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'bg-gray-600 cursor-not-allowed opacity-60'
                    }`}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-400 mt-4">
          Available Monday to Saturday, 7:00 AM - 6:00 PM
        </p>
      </div>
    </div>
  );
} 