import React, { useState, useEffect } from 'react';
import TestimonialCard from '../common/TestimonialCard';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  
  // Mock testimonial data with avatars
  const testimonials = [
    {
      quote: "JobPilot helped me find my dream job in less than 2 weeks. The AI matching was incredibly accurate and saved me hours of searching through irrelevant listings.",
      author: "Sarah Johnson",
      position: "Software Engineer",
      company: "TechCorp Inc.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "As a hiring manager, I've been amazed by the quality of candidates JobPilot connects us with. Their resume parsing technology really understands the skills we need.",
      author: "Michael Chen",
      position: "Technical Director",
      company: "InnovateSoft",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "The platform is intuitive and the job matching algorithm is spot on. I received interview requests from companies that were perfect matches for my skill set.",
      author: "Priya Patel",
      position: "UX Designer",
      company: "DesignHub",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      quote: "Switching careers seemed impossible until I used JobPilot. Their skill assessment tools helped me identify transferable skills I didn't know I had.",
      author: "James Wilson",
      position: "Marketing Director",
      company: "GrowthLabs",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/68.jpg" 
    }
  ];

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, testimonials.length]);

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setIsAutoplay(false);
    setActiveIndex(index);
  };

  return (
    <div> </div>
  );
};

export default TestimonialsSection;
