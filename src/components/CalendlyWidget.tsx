"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CONTACT } from '@/lib/constants';
import Script from 'next/script';

interface CalendlyWidgetProps {
  className?: string;
}

// Get API key from environment variable
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDLOii6uO3MQcIndVJiV5yhtR45o7mv4pE";

declare global {
  interface Window {
    initAutocomplete: () => void;
    google: any;
  }
}

// Valid service regions
const VALID_REGIONS = ['QLD', 'Queensland', 'Tweed Heads', 'Tweed', 'Northern Rivers', 'Byron Bay', 'Ballina', 'Lismore', 'Murwillumbah'];

// NSW regions that are coming soon
const COMING_SOON_REGIONS = ['Sydney', 'Newcastle', 'Central Coast', 'Wollongong', 'Coffs Harbour', 'Port Macquarie'];

export default function CalendlyWidget({ className }: CalendlyWidgetProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState('Mobile Diesel Mechanic');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [googleMapsError, setGoogleMapsError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isValidLocation, setIsValidLocation] = useState(true);

  const calendlyEmbedRef = useRef<HTMLDivElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  
  // Component mounted effect
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Handle Google Maps script loading
  const handleGoogleMapsLoaded = () => {
    console.log("Google Maps script loaded successfully");
    // Don't initialize here - wait for the input to be available
    // The visibility state change will trigger another useEffect
    setGoogleMapsLoaded(true);
  };
  
  const handleGoogleMapsError = () => {
    console.error("Failed to load Google Maps script");
    setGoogleMapsError("Failed to load Google Maps API");
  };

  // Check if the address is in a valid service region (QLD or Northern NSW)
  const isValidServiceRegion = (address: string): boolean => {
    const upperAddress = address.toUpperCase();
    return VALID_REGIONS.some(region => 
      upperAddress.includes(region.toUpperCase())
    );
  };
  
  // Check if address is in a region where service is coming soon
  const isComingSoonRegion = (address: string): boolean => {
    const upperAddress = address.toUpperCase();
    return COMING_SOON_REGIONS.some(region => 
      upperAddress.includes(region.toUpperCase())
    );
  };
  
  // Get custom message based on location
  const getLocationErrorMessage = (address: string): string => {
    if (isComingSoonRegion(address)) {
      // Extract the matched region for a more personalized message
      const matchedRegion = COMING_SOON_REGIONS.find(region => 
        address.toUpperCase().includes(region.toUpperCase())
      ) || 'this region';
      
      return `We're expanding to ${matchedRegion} soon! Currently servicing QLD and Northern NSW only.`;
    }
    
    // Default message for other areas
    return "Currently servicing QLD and Northern NSW (Tweed Heads to Byron Bay region) only.";
  };
  
  // Initialize Google Places autocomplete
  const initializeAutocomplete = () => {
    // Only run on client-side and when component is mounted
    if (typeof window === 'undefined' || !isMounted) {
      return;
    }
    
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API not available");
      setGoogleMapsError("Google Maps API not available");
      return;
    }
    
    // Check if input ref is available and visible
    if (!locationInputRef.current) {
      console.log("Location input ref not available yet");
      return; // Exit without error - we'll retry when the element is available
    }
    
    try {
      console.log("Initializing autocomplete on input element");
      
      // Check if autocomplete is already initialized on this input
      if (autocompleteRef.current) {
        console.log("Autocomplete already initialized");
        return;
      }
      
      // Create autocomplete object, restricting to Australia
      autocompleteRef.current = new window.google.maps.places.Autocomplete(locationInputRef.current, {
        componentRestrictions: { country: "au" },
        fields: ["formatted_address", "geometry", "name", "address_components"],
        types: ["address"]
      });
      
      // Add event listener for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.formatted_address) {
          console.log("Place selected:", place.formatted_address);
          
          // Check if the address is in Queensland or Northern NSW
          if (isValidServiceRegion(place.formatted_address)) {
            setLocation(place.formatted_address);
            setLocationError(null);
            setIsValidLocation(true);
          } else {
            // Set the location but mark it as invalid
            setLocation(place.formatted_address);
            setLocationError(getLocationErrorMessage(place.formatted_address));
            setIsValidLocation(false);
          }
        }
      });
      
      setGoogleMapsLoaded(true);
      setGoogleMapsError(null);
      console.log("Autocomplete successfully initialized");
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
      setGoogleMapsError("Error initializing autocomplete");
    }
  };
  
  // Set up the global callback for Maps API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.initAutocomplete = () => {
        console.log("Google Maps callback received");
        setGoogleMapsLoaded(true);
      };
    }
    
    return () => {
      // Clean up event listeners
      if (autocompleteRef.current) {
        // Google Maps doesn't provide a clean way to remove all listeners
        // but we can set the reference to null
        autocompleteRef.current = null;
      }
    };
  }, []);
  
  // Initialize autocomplete when the form step changes to 2 and input is available
  useEffect(() => {
    if (
      isMounted && 
      showBookingForm && 
      formStep === 2 && 
      googleMapsLoaded && 
      window.google && 
      window.google.maps && 
      window.google.maps.places
    ) {
      // Use setTimeout to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        if (locationInputRef.current) {
          initializeAutocomplete();
          // Focus on the input after initialization
          locationInputRef.current.focus();
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isMounted, showBookingForm, formStep, googleMapsLoaded]);

  // Handle location input changes - validate manually entered addresses
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    
    // Clear error if user is typing (they may be entering a valid address)
    if (locationError) {
      setLocationError(null);
      setIsValidLocation(true);
      
      // If Google is loaded and autocomplete was previously initialized
      // but not working after validation error, reinitialize it
      if (googleMapsLoaded && !autocompleteRef.current && locationInputRef.current) {
        initializeAutocomplete();
      }
    }
  };

  // Reinitialize autocomplete when input is focused after validation error
  const handleLocationFocus = () => {
    // If we have an error and Google is loaded but autocomplete not working
    if (locationError && googleMapsLoaded && !autocompleteRef.current && locationInputRef.current) {
      // Reset the autocomplete reference
      autocompleteRef.current = null;
      // Reinitialize autocomplete
      initializeAutocomplete();
    }
  };

  // Validate location on blur for manually entered addresses
  const handleLocationBlur = () => {
    if (location && !isValidServiceRegion(location)) {
      setLocationError(getLocationErrorMessage(location));
      setIsValidLocation(false);
    } else if (location) {
      setLocationError(null);
      setIsValidLocation(true);
    }
  };

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
      setBookingConfirmed(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setServiceType('Mobile Diesel Mechanic');
    setLocation('');
    setName('');
    setPhone('');
    setEmail('');
    setDetails('');
    setFormStep(1);
    setBookingConfirmed(false);
    setLocationError(null);
    setIsValidLocation(true);
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
  const handleSubmit = () => {
    // Don't submit if location is invalid
    if (locationError) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real implementation, this would call an API endpoint
      console.log({
        date: selectedDate ? formatDate(selectedDate) : '',
        time: selectedTime,
        service: serviceType,
        location: location,
        name: name,
        phone: phone,
        email: email,
        details: details
      });
      
      // Show success
      setBookingConfirmed(true);
      setIsSubmitting(false);
    }, 1500);
  };

  // Check if form can proceed to next step
  const canProceedToStep2 = selectedDate !== null && selectedTime !== null;
  const canProceedToStep3 = serviceType !== '' && location !== '' && isValidLocation;
  const canSubmit = name !== '' && phone !== '' && isValidLocation;

  // Function to check if a time is selected
  const isTimeSelected = (time: string): boolean => {
    return selectedTime === time;
  };

  return (
    <>
      {/* Google Maps API Script */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutocomplete`}
        strategy="lazyOnload"
        onLoad={handleGoogleMapsLoaded}
        onError={handleGoogleMapsError}
      />
      
      <div className={`${className} -mx-4 sm:mx-0`}>
        <div 
          ref={calendlyEmbedRef}
          className="rounded-md overflow-hidden"
        >
          {!showBookingForm ? (
            // Initial booking information view
            <div className="bg-gray-200 rounded-md p-6 border border-gray-300">
              <div className="mb-6 flex justify-center">
                <div className="bg-cyan-700/20 p-4 rounded-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 text-cyan-700" 
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
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">Schedule Your Service</h4>
              <p className="text-gray-700 mb-6">
                Book a mobile mechanic at your location in just a few steps.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-left">
                  <svg className="h-6 w-6 text-cyan-700 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Select your preferred date & time</span>
                </div>
                <div className="flex items-center text-left">
                  <svg className="h-6 w-6 text-cyan-700 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Tell us about your service needs</span>
                </div>
                <div className="flex items-center text-left">
                  <svg className="h-6 w-6 text-cyan-700 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Get instant confirmation</span>
                </div>
              </div>
              
              <button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-md transition-all duration-300 font-semibold text-lg shadow-md flex items-center justify-center gap-2"
                onClick={toggleBookingForm}
                aria-label="Start booking process"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Start Booking
              </button>
            </div>
          ) : bookingConfirmed ? (
            // Booking confirmation view
            <div className="bg-gray-200 rounded-md p-6 border border-gray-300">
              <div className="mb-6 flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
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
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">Booking Confirmed!</h4>
              <p className="text-gray-700 mb-6">
                Thank you for booking with us. We'll be at your location on <span className="font-semibold">{selectedDate ? formatDate(selectedDate) : ''}</span> at <span className="font-semibold">{selectedTime}</span>.
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-gray-300 mb-6">
                <h5 className="font-medium text-gray-800 mb-2">Booking Details</h5>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-500">Service:</span>
                    <span className="text-gray-800 font-medium">{serviceType}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className={`font-medium ${locationError ? 'text-red-500' : 'text-gray-800'}`}>{location}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-500">Date & Time:</span>
                    <span className="text-gray-800 font-medium">{selectedDate ? formatDate(selectedDate) : ''} at {selectedTime}</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-6">
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
                  className="flex-1 flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-md transition-all duration-300 text-lg font-medium shadow-md hover:-translate-y-1"
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
            <div className="bg-gray-200 rounded-md p-4 sm:p-6 border border-gray-300 mx-auto w-full">
              <div className="flex justify-between items-center mb-3 sm:mb-6">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {formStep === 1 && "Select Date & Time"}
                  {formStep === 2 && "Service Details"}
                  {formStep === 3 && "Contact Information"}
                </h4>
                <button 
                  onClick={toggleBookingForm}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-300"
                  aria-label="Close booking form"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="mb-3 sm:mb-6">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="flex">
                      <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${formStep >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-600'}`}>
                        1
                      </span>
                      <span className={`text-xs font-semibold inline-block ml-1 mr-2 py-1 px-2 uppercase rounded-full ${formStep >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-600'}`}>
                        2
                      </span>
                      <span className={`text-xs font-semibold inline-block ml-1 py-1 px-2 uppercase rounded-full ${formStep >= 3 ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-600'}`}>
                        3
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-orange-600">
                        Step {formStep} of 3
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
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
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3 text-left">
                      Select Date:
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
                      {availableDates.map((date, index) => {
                        const selected = isDateSelected(date);
                        return (
                          <button 
                            key={index} 
                            data-date-element
                            className={`cursor-pointer rounded-lg p-3 transition-all text-center border ${
                              selected
                                ? 'bg-cyan-700 text-white shadow-md border-cyan-800' 
                                : 'bg-gray-100 hover:bg-gray-300 text-gray-800 border-gray-300'
                            }`}
                            onClick={() => handleDateSelection(date)}
                            type="button"
                          >
                            <span className="block text-sm font-medium mb-1">
                              {new Intl.DateTimeFormat('en-AU', { weekday: 'short' }).format(date)}
                            </span>
                            <span className="block text-xl font-bold">
                              {new Intl.DateTimeFormat('en-AU', { day: 'numeric' }).format(date)}
                            </span>
                            <span className="block text-xs mt-1">
                              {new Intl.DateTimeFormat('en-AU', { month: 'short' }).format(date)}
                            </span>
                            {selected && (
                              <div className="mt-1">
                                <svg className="h-5 w-5 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Time selection */}
                  <div className="mb-4 sm:mb-8">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3 text-left">
                      Select Time:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
                      {timeSlots.map((time, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`cursor-pointer rounded-lg p-3 transition-all text-center ${
                            isTimeSelected(time)
                              ? 'bg-cyan-700 text-white shadow-md' 
                              : 'bg-gray-100 hover:bg-gray-300 text-gray-800'
                          }`}
                          onClick={() => handleTimeSelection(time)}
                        >
                          <span className="block text-lg font-medium">{time}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="button"
                      disabled={!canProceedToStep2}
                      className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                        canProceedToStep2 
                          ? 'bg-orange-500 hover:bg-orange-600 text-white' 
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
              
              {formStep === 2 && (
                <>
                  {/* Service details */}
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Service Type</label>
                    <select 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                  
                  {/* Location with Google Places autocomplete */}
                  <div className="mb-3 sm:mb-5 relative">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">
                      Service Location
                      <span className="ml-1 text-xs text-gray-500">(powered by Google Maps)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Enter your address" 
                        className={`w-full bg-gray-100 border ${locationError ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 pl-10 pr-4 text-gray-800 focus:outline-none focus:ring-2 ${locationError ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-orange-500 focus:border-orange-500'}`}
                        value={location}
                        onChange={handleLocationChange}
                        onBlur={handleLocationBlur}
                        onFocus={handleLocationFocus}
                        ref={locationInputRef}
                        aria-label="Service location address"
                        id="location-input"
                      />
                    </div>
                    {locationError ? (
                      <div className="mt-1 text-sm text-red-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {locationError}
                      </div>
                    ) : googleMapsError ? (
                      <div className="mt-1 text-sm text-red-500">
                        {googleMapsError}. Please enter your address manually.
                      </div>
                    ) : !googleMapsLoaded && (
                      <div className="mt-1 text-sm text-gray-500">
                        Loading Google Maps...
                      </div>
                    )}
                    <div className="mt-1 text-xs text-cyan-700">
                      We currently service Queensland and Northern NSW areas (Tweed Heads to Byron Bay region)
                    </div>
                  </div>
                  
                  {/* Service details/notes */}
                  <div className="mb-4 sm:mb-8">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Additional Details (Optional)</label>
                    <textarea 
                      placeholder="Describe your repair needs or specific issues" 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                          ? 'bg-orange-500 hover:bg-orange-600 text-white' 
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
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Your Name *</label>
                    <input 
                      type="text" 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(04xx) xxx xxx"
                      required
                    />
                  </div>
                  
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 text-left">Email (Optional)</label>
                    <input 
                      type="email" 
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 sm:py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-300">
                      <h5 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Booking Summary</h5>
                      <ul className="space-y-2 text-left">
                        <li className="flex justify-between">
                          <span className="text-gray-500">Date & Time:</span>
                          <span className="text-gray-800 font-medium">{selectedDate ? formatDate(selectedDate) : ''} at {selectedTime}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">Service:</span>
                          <span className="text-gray-800 font-medium">{serviceType}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-500">Location:</span>
                          <span className={`font-medium ${locationError ? 'text-red-500' : 'text-gray-800'}`}>{location}</span>
                        </li>
                      </ul>
                    </div>
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
                      disabled={!canSubmit || isSubmitting || locationError !== null}
                      className={`px-5 py-2 rounded-lg font-medium flex items-center gap-2 ${
                        canSubmit && !isSubmitting && locationError === null
                          ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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
          
          <p className="text-sm text-gray-500 mt-2 text-center">
            Available Monday to Saturday, 7:00 AM - 6:00 PM
          </p>
        </div>
      </div>
    </>
  );
} 