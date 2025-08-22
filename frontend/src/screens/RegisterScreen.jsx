import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faLock, 
  faEye, 
  faEyeSlash, 
  faUserPlus,
  faArrowRight,
  faCheckCircle,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';
import { register } from '../actions/userActions';
import FormContainer from '../components/common/FormContainer';
import Loader from '../components/common/Loader';
import Message from '../components/common/Message';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [formValid, setFormValid] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  // Validate form fields
  useEffect(() => {
    setFormValid({
      name: name.length >= 2,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.length >= 6,
      confirmPassword: password === confirmPassword && confirmPassword.length > 0
    });
  }, [name, email, password, confirmPassword]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
    } else {
      setMessage(null);
      dispatch(register(name, email, password));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, text: '', color: 'bg-gray-200' };
    if (password.length < 6) return { strength: 33, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 66, text: 'Medium', color: 'bg-yellow-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 flex items-center justify-center py-8 px-4">
      <FormContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Join JobPilot</h1>
            <p className="text-primary-100">Create your account and start your career journey</p>
          </div>
          
          <div className="p-8">
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <Message variant="error">{message}</Message>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6"
                >
                  <Message variant="error">{error}</Message>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-primary-600" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      name && (formValid.name ? 'border-green-500' : 'border-red-500')
                    }`}
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {name && (
                    <div className="absolute right-3 top-3.5">
                      <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        className={formValid.name ? 'text-green-500' : 'text-red-500'} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-primary-600" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      email && (formValid.email ? 'border-green-500' : 'border-red-500')
                    }`}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {email && (
                    <div className="absolute right-3 top-3.5">
                      <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        className={formValid.email ? 'text-green-500' : 'text-red-500'} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faLock} className="mr-2 text-primary-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 pr-12 ${
                      password && (formValid.password ? 'border-green-500' : 'border-red-500')
                    }`}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-primary-600 transition-colors"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Strength: <span className={`font-medium ${
                        passwordStrength.strength < 33 ? 'text-red-500' :
                        passwordStrength.strength < 66 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {passwordStrength.text}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faLock} className="mr-2 text-primary-600" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                      confirmPassword && (formValid.confirmPassword ? 'border-green-500' : 'border-red-500')
                    }`}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  {confirmPassword && (
                    <div className="absolute right-3 top-3.5">
                      <FontAwesomeIcon 
                        icon={faCheckCircle} 
                        className={formValid.confirmPassword ? 'text-green-500' : 'text-red-500'} 
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 px-4 rounded-lg font-semibold hover:from-primary-500 hover:to-primary-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center"
                disabled={loading || !formValid.name || !formValid.email || !formValid.password || !formValid.confirmPassword}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <>
                    <Loader size="sm" />
                    <span className="ml-2">Creating Account...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    Create Account
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Additional Links */}
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : '/login'}
                  className="text-primary-600 font-semibold hover:text-primary-700 transition-colors hover:underline"
                >
                  Sign in here
                </Link>
              </p>
              
              <p className="text-gray-600">
                Looking to hire?{' '}
                <Link
                  to="/register-company"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors hover:underline group"
                >
                  <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                  Register as a company
                  <FontAwesomeIcon icon={faArrowRight} className="ml-1 text-xs transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </p>
            </div>

            {/* Terms Notice */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-primary-600 hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </FormContainer>
    </div>
  );
};

export default RegisterScreen;