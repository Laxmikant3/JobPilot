import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  faSearch,
  faFilter,
  faMapMarkerAlt,
  faBriefcase,
  faDollarSign,
  faUsers,
  faBuilding,
  faChartLine,
  faRocket,
  faGraduationCap,
  faHandshake,
  faCheck,
  faArrowRight,
  faChevronDown,
  faEnvelope,
  faPhone,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { listJobs } from '../actions/jobActions';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import PageHeader from '../components/common/PageHeader';
import { FeatureShowcase } from '../components/common/FeatureShowcase';
import JobCategoriesSection from '../components/home/JobCategoriesSection';
import CompaniesSection from '../components/home/CompaniesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaSection from '../components/common/CtaSection';
import JobCard from '../components/job/JobCard';
import SectionContainer from '../components/common/SectionContainer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    profile: '',
    stipend: '',
  });

  const jobList = useSelector((state) => state.jobList);
  const { loading, error, jobs } = jobList;

  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    dispatch(listJobs());
    
    // Welcome toast notification with professional styling
    toast.info('Welcome to JobPilot! Find your dream job with our AI-powered matching.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      icon: <FontAwesomeIcon icon={faRocket} className="text-blue-600" />,
      style: { 
        borderLeft: '4px solid #2563EB', 
        background: 'linear-gradient(to right, #F9FAFB, #F3F4F6)',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
    });
  }, [dispatch]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would filter jobs or trigger a new API call
    const searchTerm = filters.search || 'all jobs';
    const location = filters.location ? ` in ${filters.location}` : '';
    const profile = filters.profile ? ` matching "${filters.profile}" profile` : '';
    const salary = filters.stipend ? ` with salary range ${filters.stipend}` : '';
    
    toast.success(
      <div className="flex items-start">
        <FontAwesomeIcon icon={faSearch} className="text-lg mr-3 mt-1 text-blue-600" />
        <div>
          <p className="font-medium">Searching for jobs</p>
          <p className="text-sm text-gray-600 mt-1">
            {searchTerm}{location}{profile}{salary}
          </p>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        style: {
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          borderLeft: '4px solid #059669'
        }
      }
    );
    // Implementation would go here
  };

  // Stats data (you can replace with real data from backend)
  const stats = [
    { icon: faUsers, count: '10,000+', label: 'Active Candidates' },
    { icon: faBuilding, count: '500+', label: 'Partner Companies' },
    { icon: faBriefcase, count: '1,000+', label: 'Jobs Posted' },
    { icon: faHandshake, count: '5,000+', label: 'Successful Placements' },
  ];

  // Feature data for the showcase section
  const features = [
    {
      icon: faRocket,
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithm ensures perfect matches between candidates and job opportunities, maximizing your chances of finding the right fit.",
      color: "blue"
    },
    {
      icon: faGraduationCap,
      title: "Smart Resume Parsing",
      description: "Automated resume analysis and skill extraction ensures your qualifications are properly recognized and matched to the right opportunities.",
      color: "indigo"
    },
    {
      icon: faChartLine,
      title: "Real-time Analytics",
      description: "Comprehensive insights and tracking for your job applications help you make informed decisions and improve your job search strategy.",
      color: "teal"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 overflow-hidden opacity-30"
        >
          <div className="absolute top-1/4 -left-1/4 w-[40rem] h-[40rem] bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent via-blue-900/20 to-gray-900/40"></div>
        </motion.div>
        
        {/* Content */}
        <div className="w-full flex flex-col items-center justify-center relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                Your Career Journey{' '}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Starts Here</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect with top employers and find your dream job with our
                <span className="text-blue-400 font-semibold"> AI-powered </span>
                matching technology
              </p>
            </motion.div>
          </motion.div>
          
          {/* Enhanced Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`w-full max-w-2xl mx-auto transition-all duration-300 transform ${searchFocused ? 'scale-105' : ''}`}
          >
            <div className="relative bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 z-10" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Job title or keyword"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/30 backdrop-blur-sm"
                  />
                </div>
                <div className="flex-1 relative group">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-300 z-10" />
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Location"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:bg-white/30 backdrop-blur-sm"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="md:w-auto w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center group shadow-lg shadow-blue-900/20 hover:shadow-blue-900/30"
                >
                  Search Jobs
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </form>
            </div>
          </motion.div>
          
          {/* Stats Section - horizontally distributed */}
          <div className="w-full flex justify-center mt-16 px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl w-full">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group p-6 md:p-8 bg-gradient-to-b from-white/10 to-gray-900/10 rounded-xl shadow-soft border border-white/10 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="bg-blue-50/20 group-hover:bg-blue-100/30 transition-colors duration-300 w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0, -5, 0] }} 
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <FontAwesomeIcon icon={stat.icon} className="text-2xl md:text-3xl text-blue-200" />
                    </motion.div>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: index * 0.2 }} 
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-200 to-blue-400 bg-clip-text text-transparent">
                      {stat.count}
                    </div>
                    <div className="text-gray-200 font-medium group-hover:text-blue-100 transition-colors duration-300 text-sm md:text-base">
                      {stat.label}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - horizontally distributed */}
      <SectionContainer background="light" spacing="default" maxWidth="7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -100px 0px" }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Why Choose JobPilot?</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">Our platform offers cutting-edge features designed to make your job search smarter and more efficient</p>
          </motion.div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 max-w-7xl mx-auto px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group flex-1 min-w-[260px] max-w-sm mx-auto"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }} 
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-blue-50 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-100 transition-colors duration-300 mx-auto"
              >
                <FontAwesomeIcon icon={feature.icon} className="text-xl md:text-2xl text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 md:mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-center">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </SectionContainer>

      {/* Job Categories Section - centered */}
      <SectionContainer background="white" spacing="default" maxWidth="7xl" hasDivider>
        <div className="flex flex-col items-center justify-center">
          <JobCategoriesSection />
        </div>
      </SectionContainer>

      {/* Job Search Section - centered */}
      <SectionContainer background="blue" spacing="default" maxWidth="7xl">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-center mb-12 md:mb-16 px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
              className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white"
            >
              Find Your Perfect Job
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto"
            >
              Search our extensive database of opportunities tailored to your skills and experience
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
            transition={{ delay: 0.4 }} 
            className="w-full max-w-4xl mx-auto px-4"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md p-6 md:p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Search</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="search"
                      value={filters.search}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                      placeholder="Job title or keyword"
                    />
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                      placeholder="City or zip code"
                    />
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Job Profile</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="profile"
                      value={filters.profile}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                      placeholder="e.g. Software Engineer"
                    />
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <div className="relative group">
                    <input
                      type="text"
                      name="stipend"
                      value={filters.stipend}
                      onChange={handleFilterChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-300"
                      placeholder="e.g. $50,000-$75,000"
                    />
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              <motion.div 
                className="mt-6 md:mt-8 flex justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={handleSearch}
                  className="w-full md:w-auto px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg transition-all flex items-center justify-center hover:from-blue-500 hover:to-blue-600 shadow-md hover:shadow-lg"
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" />
                  Search Jobs
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </SectionContainer>

      {/* Featured Jobs Section - grid, centered */}
      <SectionContainer background="light" spacing="default" maxWidth="7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
            className="text-center md:text-left mb-6 md:mb-0"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Featured Opportunities</h3>
            <p className="text-lg text-gray-600 max-w-2xl">Discover top-rated positions from leading companies</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "0px 0px -100px 0px" }} 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/jobs" 
              className="group flex items-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200"
            >
              View All Jobs
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center px-4">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 md:py-16">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mb-4"
              >
                <Loader />
              </motion.div>
              <p className="text-lg text-gray-600 animate-pulse">Finding the perfect opportunities...</p>
            </div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full"
            >
              <Message variant="error">{error}</Message>
            </motion.div>
          ) : !jobs || jobs.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-2xl mx-auto"
            >
              <motion.div 
                className="w-16 h-16 md:w-20 md:h-20 bg-blue-50 rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FontAwesomeIcon icon={faBriefcase} className="text-2xl md:text-3xl text-blue-600" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">No jobs found</h3>
              <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">Check back later for new opportunities or adjust your search criteria.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                >
                  Get job alerts
                  <FontAwesomeIcon 
                    icon={faArrowRight} 
                    className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <>
              {jobs.slice(0, 6).map((job, index) => {
                // Safely extract company name with fallback
                const companyName = job.admin?.companyName || job.company?.name || job.companyName || "Company";
                
                // Ensure requiredSkills exists and is an array
                const skills = Array.isArray(job.requiredSkills) ? job.requiredSkills : [];
                
                return (
                  <motion.div 
                    key={job._id || index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="flex justify-center"
                  >
                    <JobCard 
                      job={{
                        _id: job._id,
                        title: job.title,
                        company: companyName,
                        location: job.location,
                        salary: job.salary,
                        jobType: job.jobType,
                        experienceLevel: job.experienceLevel,
                        description: job.description,
                        createdAt: job.createdAt,
                        skills: skills
                      }}
                    />
                  </motion.div>
                );
              })}
            </>
          )}
        </div>
      </SectionContainer>

      {/* Companies Section - centered logos */}
      <SectionContainer background="white" spacing="default" maxWidth="7xl" hasDivider>
        <div className="flex flex-col items-center justify-center">
          <CompaniesSection />
        </div>
      </SectionContainer>

    

      {/* Call to Action Section - centered */}
      <SectionContainer background="blue" spacing="default" maxWidth="7xl">
        <div className="flex flex-col items-center justify-center">
          <CtaSection userType="jobseeker" />
        </div>
      </SectionContainer>
    </div>
  );
};

export default HomeScreen;