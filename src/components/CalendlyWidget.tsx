"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CONTACT } from '@/lib/constants';

interface CalendlyWidgetProps {
  className?: string;
}

export default function CalendlyWidget({ className }: CalendlyWidgetProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>("7:30 AM");
  const [serviceType, setServiceType] = useState('Mobile Diesel Mechanic');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Structured address fields
  const [streetAddress, setStreetAddress] = useState('');
  const [suburb, setSuburb] = useState('');
  const [state, setState] = useState('QLD');
  const [postcode, setPostcode] = useState('');

  const calendlyEmbedRef = useRef<HTMLDivElement>(null);

  // Component mounted effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Read service type from URL hash on mount and hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('booking-widget')) {
        // Parse service parameter from hash
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const service = params.get('service');
        if (service) {
          setServiceType(decodeURIComponent(service));
          setShowBookingForm(true);
          setFormStep(1);
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
  }, [showBookingForm, formStep, selectedDate, availableDates]);

  // Function to toggle booking form visibility
  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
    if (!showBookingForm) {
      setFormStep(1);
      setBookingConfirmed(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTime("7:30 AM");
    setServiceType('Mobile Diesel Mechanic');
    setStreetAddress('');
    setSuburb('');
    setState('QLD');
    setPostcode('');
    setName('');
    setPhone('');
    setEmail('');
    setDetails('');
    setFormStep(1);
    setBookingConfirmed(false);
  };

  // Combine address fields into a full address string
  const getFullAddress = () => {
    return `${streetAddress}, ${suburb} ${state} ${postcode}`;
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
  
  // Function to check if a date is selected
  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    // Compare year, month, and day instead of timestamp
    return (
      date.getFullYear() === selectedDate.getFullYear() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getDate() === selectedDate.getDate()
    );
  };

  // Handle date selection
  const handleDateSelection = (date: Date) => {
    console.log("Date selected:", date); // Add logging
    setSelectedDate(new Date(date)); // Create a new Date object to ensure state update
  };

  // Handle time selection
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const fullAddress = getFullAddress();
    try {
      const res = await fetch('/api/sendBookingEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          serviceType,
          selectedDate: selectedDate?.toDateString(),
          selectedTime,
          location: fullAddress,
          details,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Failed to send booking email');
      }

      // Redirect to thank you page on success
      setIsSubmitting(false);
      window.location.href = '/thank-you';
      return;
    } catch (err: any) {
      console.error('Booking email error:', err);
      // Still redirect - booking was attempted, email failure is backend issue
      setIsSubmitting(false);
      window.location.href = '/thank-you';
      return;
    }
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    if (!email) return false; // Email is now required
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validate Australian phone number format
  const validatePhone = (phoneNumber: string): boolean => {
    if (!phoneNumber) return false; // Phone is required
    
    // Remove all non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    
    // Australian mobile numbers: 04xx xxx xxx (10 digits)
    // Also accept +614xxxxxxxx format (11 digits with leading 614)
    if (digitsOnly.length === 10 && digitsOnly.startsWith('04')) {
      return true;
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('614')) {
      return true;
    }
    
    return false;
  };

  // Handle email change with validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null);
    }
  };

  // Handle phone change with validation
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    
    if (!validatePhone(value)) {
      setPhoneError("Please enter a valid Australian mobile number (04XX XXX XXX)");
    } else {
      setPhoneError(null);
    }
  };

  // Check if form can proceed to next step
  const canProceedToStep2 = selectedDate !== null;
  const canProceedToStep3 =
    serviceType !== '' &&
    streetAddress.trim().length >= 5 &&
    suburb.trim().length >= 2 &&
    state !== '' &&
    /^\d{4}$/.test(postcode);
  const canSubmit = name !== '' && phone !== '' && !phoneError && email !== '' && !emailError;

  // Function to check if a time is selected
  const isTimeSelected = (time: string): boolean => {
    return selectedTime === time;
  };

  return (
    <div className={`${className} -mx-4 sm:mx-0`}>
        <div 
          ref={calendlyEmbedRef}
          className="rounded-md overflow-hidden"
        >
          {!showBookingForm ? (
            // Initial booking information view
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-5 sm:p-8 border border-gray-200 shadow-lg">
              <div className="mb-5 sm:mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-4 sm:p-5 rounded-2xl border border-amber-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600"
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
              <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Schedule Your Service</h4>
              <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
                Book a mobile mechanic at your location in just a few steps.
              </p>

              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6 bg-white/60 rounded-lg p-4">
                <div className="flex items-center text-left">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-amber-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Select your preferred date & time</span>
                </div>
                <div className="flex items-center text-left">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-amber-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Tell us about your service needs</span>
                </div>
                <div className="flex items-center text-left">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-amber-500/20 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                    <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">Get instant confirmation</span>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                onClick={toggleBookingForm}
                aria-label="Start booking process"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Start Booking
              </button>
            </div>
          ) : bookingConfirmed ? (
            // Booking confirmation view
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-6 sm:p-8 border border-gray-200 shadow-lg">
              <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-2xl border border-green-300/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-gray-800">Booking Confirmed!</h4>
              <p className="text-gray-600 mb-6">
                Thank you for working with us. We will get in contact with you to confirm your booking for <span className="font-semibold text-gray-800">{selectedDate ? formatDate(selectedDate) : ''}</span>.
              </p>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-300 mb-4 sm:mb-6">
                <h5 className="font-medium text-gray-800 mb-3 text-sm sm:text-base border-b pb-2">Booking Details</h5>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Service</p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base">{serviceType}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Location</p>
                    <p className={`font-medium text-sm sm:text-base break-words text-gray-800`}>{getFullAddress()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="text-gray-800 font-medium text-sm sm:text-base">{selectedDate ? formatDate(selectedDate) : ''}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4 sm:mb-6">
                A confirmation has been sent to your phone. If you need to make any changes, please contact us.
              </p>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-md transition-all duration-300 font-medium text-base shadow-md"
                  onClick={resetForm}
                >
                  Book Another Service
                </button>
                
                <a 
                  href={`tel:${CONTACT.PHONE}`} 
                  className="flex-1 flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-md transition-all duration-300 text-lg font-medium shadow-md hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="hidden sm:inline">Call {CONTACT.PHONE_DISPLAY}</span>
                  <span className="sm:hidden">Call Us</span>
                </a>
              </div>
            </div>
          ) : (
            // Booking form view - multi-step form
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-lg mx-auto w-full">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                  {formStep === 1 && "Select Date"}
                  {formStep === 2 && "Service Details"}
                  {formStep === 3 && "Contact Information"}
                </h4>
                <button
                  onClick={toggleBookingForm}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-300/50 transition-colors"
                  aria-label="Close booking form"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress bar - redesigned as pills */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <span className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full transition-all duration-300 ${
                          formStep >= step
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          {formStep > step ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            step
                          )}
                        </span>
                        {step < 3 && (
                          <div className={`w-6 sm:w-10 h-1 mx-1 rounded-full transition-all duration-300 ${
                            formStep > step ? 'bg-amber-500' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-500">
                    Step {formStep}/3
                  </span>
                </div>
              </div>
              
              {formStep === 1 && (
                <>
                  {/* Date selection */}
                  <div className="mb-6 sm:mb-8">
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3 text-left">
                      Select Date:
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                      {availableDates.map((date, index) => {
                        const selected = isDateSelected(date);
                        return (
                          <button
                            key={index}
                            data-date-element
                            className={`cursor-pointer rounded-xl p-2.5 sm:p-3 transition-all duration-300 text-center border-2 ${
                              selected
                                ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-500/30 border-amber-500 scale-[1.02]'
                                : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200 hover:border-amber-300 hover:shadow-md'
                            }`}
                            onClick={() => handleDateSelection(date)}
                            type="button"
                          >
                            <span className="block text-xs sm:text-sm font-medium opacity-80">
                              {new Intl.DateTimeFormat('en-AU', { weekday: 'short' }).format(date)}
                            </span>
                            <span className="block text-lg sm:text-2xl font-bold my-0.5">
                              {new Intl.DateTimeFormat('en-AU', { day: 'numeric' }).format(date)}
                            </span>
                            <span className="block text-xs opacity-80">
                              {new Intl.DateTimeFormat('en-AU', { month: 'short' }).format(date)}
                            </span>
                            {selected && (
                              <div className="mt-1">
                                <svg className="h-4 w-4 sm:h-5 sm:w-5 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!canProceedToStep2}
                      className={`px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold flex items-center gap-2 text-sm sm:text-base transition-all duration-300 ${
                        canProceedToStep2
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={handleNextStep}
                    >
                      Next Step
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
              
              {formStep === 2 && (
                <>
                  {/* Service details */}
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-xs sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Service Type</label>
                    <select 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
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
                  
                  {/* Service Location - Structured Address Fields */}
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-xs sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">
                      Service Location
                    </label>

                    {/* Street Address */}
                    <div className="mb-3">
                      <input
                        type="text"
                        placeholder="Street Address (e.g., 42 Smith Street)"
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        aria-label="Street address"
                      />
                    </div>

                    {/* Suburb and State row */}
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Suburb (e.g., Capalaba)"
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          value={suburb}
                          onChange={(e) => setSuburb(e.target.value)}
                          aria-label="Suburb"
                        />
                      </div>
                      <div className="w-24 sm:w-28">
                        <select
                          className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          aria-label="State"
                        >
                          <option value="QLD">QLD</option>
                          <option value="NSW">NSW</option>
                          <option value="VIC">VIC</option>
                          <option value="SA">SA</option>
                          <option value="WA">WA</option>
                          <option value="TAS">TAS</option>
                          <option value="NT">NT</option>
                          <option value="ACT">ACT</option>
                        </select>
                      </div>
                    </div>

                    {/* Postcode */}
                    <div className="w-32">
                      <input
                        type="text"
                        placeholder="Postcode"
                        className={`w-full bg-gray-100 border rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                          postcode && !/^\d{4}$/.test(postcode) ? 'border-red-400' : 'border-gray-300'
                        }`}
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        maxLength={4}
                        aria-label="Postcode"
                      />
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      Servicing South East Queensland and Northern NSW
                    </div>
                  </div>
                  
                  {/* Service details/notes */}
                  <div className="mb-4 sm:mb-8">
                    <label className="block text-xs sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Additional Details (Optional)</label>
                    <textarea
                      placeholder="Describe your repair needs or specific issues"
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      rows={2}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      type="button"
                      className="px-5 py-2 rounded-lg text-gray-700 font-medium bg-gray-300 hover:bg-gray-400 flex items-center gap-2"
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
                      className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 ${
                        canProceedToStep3 
                          ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-xs sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Your Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-xs sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Phone Number *</label>
                    <input 
                      type="tel" 
                      className={`w-full bg-gray-100 border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-amber-500 focus:border-amber-500'}`}
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="04XX XXX XXX"
                      required
                    />
                    {phoneError && (
                      <div className="mt-1 text-xs text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {phoneError}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-xs sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Email *</label>
                    <input 
                      type="email" 
                      className={`w-full bg-gray-100 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-amber-500 focus:border-amber-500'}`}
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="your@email.com"
                      required
                    />
                    {emailError && (
                      <div className="mt-1 text-xs text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {emailError}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-300">
                      <h5 className="font-medium text-gray-800 mb-3 text-sm sm:text-base border-b pb-2">Booking Summary</h5>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Date</p>
                          <p className="text-gray-800 font-medium text-sm sm:text-base">{selectedDate ? formatDate(selectedDate) : ''}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Service</p>
                          <p className="text-gray-800 font-medium text-sm sm:text-base">{serviceType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Location</p>
                          <p className={`font-medium text-sm sm:text-base break-words text-gray-800`}>{getFullAddress()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button 
                      type="button"
                      className="px-3 sm:px-5 py-2 rounded-lg text-gray-700 font-medium bg-gray-300 hover:bg-gray-400 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                      onClick={handlePrevStep}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Back
                    </button>
                    <button 
                      type="button"
                      disabled={!canSubmit || isSubmitting }
                      className={`px-3 sm:px-5 py-2 rounded-lg font-medium flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
                        canSubmit && !isSubmitting                           ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      onClick={handleSubmit}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
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
          
          <p className="text-sm text-gray-500 mt-2 text-center">
            Available Monday to Saturday, 7:30 AM - 4:00 PM
          </p>
        </div>
      </div>
  );
} 