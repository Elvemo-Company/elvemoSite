import React, { useState, useEffect } from 'react';
import { Send, Calendar, CheckCircle, AlertCircle, Loader2, Phone, Mail, MapPin, ChevronDown, ChevronRight, Copy, Check, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with public key
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Constants for EmailJS configuration
const EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  AUTO_REPLY_TEMPLATE_ID: import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
} as const;

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = language === 'pl' ? 'Imię i nazwisko jest wymagane' : 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = language === 'pl' ? 'Email jest wymagany' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'pl' ? 'Nieprawidłowy format email' : 'Invalid email format';
    }
    
    if (formData.phone && !/^\+?[\d\s-]{9,}$/.test(formData.phone)) {
      newErrors.phone = language === 'pl' ? 'Nieprawidłowy format numeru telefonu' : 'Invalid phone number format';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = language === 'pl' ? 'Wiadomość jest wymagana' : 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = language === 'pl' ? 'Wiadomość musi mieć minimum 10 znaków' : 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Przygotowanie parametrów dla powiadomienia do zespołu
      const notificationParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: 'elvemo.contact@gmail.com', // Email zespołu
        phone: formData.phone || (language === 'pl' ? 'Nie podano' : 'Not provided'),
        company: formData.company || (language === 'pl' ? 'Nie podano' : 'Not provided'),
        subject: formData.subject || (language === 'pl' ? 'Nie określono' : 'Not specified'),
        message: formData.message,
        budget: formData.budget || (language === 'pl' ? 'Nie określono' : 'Not specified'),
        timeline: formData.timeline || (language === 'pl' ? 'Nie określono' : 'Not specified'),
        to_name: 'Vibbly Team',
        reply_to: formData.email,
      };

      // Przygotowanie parametrów dla auto-reply do klienta
      const autoReplyParams = {
        from_name: 'Vibbly Team',
        from_email: formData.email,
        to_email: formData.email,
        to_name: formData.name,
        phone: formData.phone || (language === 'pl' ? 'Nie podano' : 'Not provided'),
        company: formData.company || (language === 'pl' ? 'Nie podano' : 'Not provided'),
        subject: formData.subject || (language === 'pl' ? 'Nie określono' : 'Not specified'),
        message: formData.message,
        budget: formData.budget || (language === 'pl' ? 'Nie określono' : 'Not specified'),
        timeline: formData.timeline || (language === 'pl' ? 'Nie określono' : 'Not specified'),
        reply_to: 'elvemo.contact@gmail.com',
      };

      // Wysyłanie powiadomienia do zespołu
      const notificationResponse = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        notificationParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // Wysyłanie auto-reply do klienta
      const autoReplyResponse = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
        autoReplyParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      if (notificationResponse.status !== 200 || autoReplyResponse.status !== 200) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (err: unknown) {
      console.error('Error sending email:', err);
      setSubmitStatus('error');
      setErrorMessage(
        language === 'pl' 
          ? 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później lub skontaktuj się z nami telefonicznie.' 
          : 'An error occurred while sending the message. Please try again later or contact us by phone.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText('+48123456789');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Custom select component for better styling
  const CustomSelect: React.FC<{
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
    options: { value: string; label: { pl: string; en: string } }[];
    className?: string;
  }> = ({ id, name, value, onChange, placeholder, options, className = '' }) => (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-900/30 border border-gray-800/50 rounded-lg text-white 
          placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 
          focus:ring-violet-500/50 transition-colors duration-300 appearance-none
          ${value ? 'text-white' : 'text-gray-500'} ${className}`}
      >
        <option value="" className="bg-gray-900 text-gray-500">{placeholder}</option>
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-gray-900 text-white"
          >
            {language === 'pl' ? option.label.pl : option.label.en}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Gradient accents */}
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-900/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-fuchsia-900/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 text-transparent bg-clip-text"
          >
            {t.contact.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Desktop Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8"
          >
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="mb-6 p-3 rounded-full bg-green-500/20 text-green-400">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{t.contact.success.title}</h3>
                  <p className="text-gray-400">{t.contact.success.message}</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900/30 border ${
                          errors.name ? 'border-red-500/50' : 'border-gray-800/50'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300`}
                        placeholder={t.contact.form.namePlaceholder}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900/30 border ${
                          errors.email ? 'border-red-500/50' : 'border-gray-800/50'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300`}
                        placeholder={t.contact.form.emailPlaceholder}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        {t.contact.form.phone}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-gray-900/30 border ${
                          errors.phone ? 'border-red-500/50' : 'border-gray-800/50'
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300`}
                        placeholder={t.contact.form.phonePlaceholder}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                        {t.contact.form.company}
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-900/30 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300"
                        placeholder={t.contact.form.companyPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                      {t.contact.form.subject}
                    </label>
                    <CustomSelect
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.contact.form.subjectPlaceholder}
                      options={[
                        { value: 'website', label: { pl: 'Strona internetowa', en: 'Website' } },
                        { value: 'ecommerce', label: { pl: 'Sklep internetowy', en: 'E-commerce' } },
                        { value: 'app', label: { pl: 'Aplikacja webowa', en: 'Web application' } },
                        { value: 'other', label: { pl: 'Inne', en: 'Other' } }
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-400 mb-2">
                        {t.contact.form.budget}
                      </label>
                      <CustomSelect
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder={t.contact.form.budgetPlaceholder}
                        options={[
                          { value: 'small', label: { pl: 'Do 5 000 PLN', en: 'Up to 1 000 EUR' } },
                          { value: 'medium', label: { pl: '5 000 - 15 000 PLN', en: '1 000 - 3 000 EUR' } },
                          { value: 'large', label: { pl: '15 000 - 30 000 PLN', en: '3 000 - 6 000 EUR' } },
                          { value: 'enterprise', label: { pl: 'Powyżej 30 000 PLN', en: 'Above 6 000 EUR' } }
                        ]}
                      />
                    </div>

                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-400 mb-2">
                        {t.contact.form.timeline}
                      </label>
                      <CustomSelect
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        placeholder={t.contact.form.timelinePlaceholder}
                        options={[
                          { value: 'asap', label: { pl: 'Jak najszybciej', en: 'As soon as possible' } },
                          { value: '1-3', label: { pl: '1-3 miesiące', en: '1-3 months' } },
                          { value: '3-6', label: { pl: '3-6 miesięcy', en: '3-6 months' } },
                          { value: '6+', label: { pl: 'Powyżej 6 miesięcy', en: 'Above 6 months' } }
                        ]}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      maxLength={1000}
                      style={{ 
                        resize: 'vertical', 
                        minHeight: '120px', 
                        maxHeight: '400px',
                        overflowY: 'auto'
                      }}
                      className={`w-full px-4 py-3 bg-gray-900/30 border ${
                        errors.message ? 'border-red-500/50' : 'border-gray-800/50'
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300`}
                      placeholder={t.contact.form.messagePlaceholder}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {errorMessage}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3 px-6 rounded-lg font-medium 
                      ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-violet-500/25'} 
                      transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {language === 'pl' ? 'Wysyłanie...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t.contact.form.submit}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile Contact Layout - Phone First, Form Second */}
          <div className="md:hidden space-y-6">
            {/* Mobile Phone Section - Prominent */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 backdrop-blur-sm border border-violet-500/30 rounded-2xl p-6"
            >
              <div className="text-center mb-6">
                <div className="mb-4 p-3 rounded-full bg-violet-600/30 w-fit mx-auto">
                  <Phone className="w-8 h-8 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {language === 'pl' ? 'Zadzwoń teraz' : 'Call Now'}
                </h3>
                <p className="text-gray-300 text-sm">
                  {language === 'pl' 
                    ? 'Bezpłatna konsultacja w ciągu 5 minut' 
                    : 'Free consultation within 5 minutes'}
                </p>
              </div>
              
              <div className="space-y-4">
                <motion.a
                  href="tel:+48123456789"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-violet-500/25 transition-all duration-300"
                  style={{ minHeight: '56px' }}
                >
                  <Phone className="w-6 h-6" />
                  <span>+48 123 456 789</span>
                </motion.a>
                
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={handleCopyNumber}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg text-gray-300 hover:bg-gray-700/50 transition-colors duration-300"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {isCopied 
                        ? (language === 'pl' ? 'Skopiowano!' : 'Copied!') 
                        : (language === 'pl' ? 'Kopiuj' : 'Copy')
                      }
                    </span>
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-black/20 rounded-lg">
                <p className="text-xs text-gray-400 text-center">
                  {language === 'pl'
                    ? 'Dostępni pon-pt 9:00-17:00 • Pierwsza konsultacja gratis'
                    : 'Available Mon-Fri 9:00-17:00 • First consultation free'}
                </p>
              </div>
            </motion.div>

            {/* Mobile Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6"
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {language === 'pl' ? 'Wyślij wiadomość' : 'Send Message'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {language === 'pl' 
                    ? 'Lub wypełnij formularz poniżej' 
                    : 'Or fill out the form below'}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="mb-6 p-3 rounded-full bg-green-500/20 text-green-400">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{t.contact.success.title}</h3>
                    <p className="text-gray-400">{t.contact.success.message}</p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Essential Fields */}
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="mobile-name" className="block text-sm font-medium text-gray-400 mb-2">
                          {t.contact.form.name} *
                        </label>
                        <input
                          type="text"
                          id="mobile-name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-4 bg-gray-900/30 border ${
                            errors.name ? 'border-red-500/50' : 'border-gray-800/50'
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300 text-base`}
                          placeholder={t.contact.form.namePlaceholder}
                          style={{ minHeight: '50px' }}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="mobile-email" className="block text-sm font-medium text-gray-400 mb-2">
                          {t.contact.form.email} *
                        </label>
                        <input
                          type="email"
                          id="mobile-email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                          className={`w-full px-4 py-4 bg-gray-900/30 border ${
                            errors.email ? 'border-red-500/50' : 'border-gray-800/50'
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300 text-base`}
                          placeholder={t.contact.form.emailPlaceholder}
                          style={{ minHeight: '50px' }}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="mobile-message" className="block text-sm font-medium text-gray-400 mb-2">
                          {t.contact.form.message} *
                        </label>
                        <textarea
                          id="mobile-message"
                          name="message"
                          rows={4}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          maxLength={1000}
                          className={`w-full px-4 py-4 bg-gray-900/30 border ${
                            errors.message ? 'border-red-500/50' : 'border-gray-800/50'
                          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300 text-base`}
                          placeholder={t.contact.form.messagePlaceholder}
                          style={{ minHeight: '120px' }}
                        ></textarea>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Fields Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowAdditionalFields(!showAdditionalFields)}
                      className="w-full flex items-center justify-between p-4 bg-gray-800/20 rounded-lg hover:bg-gray-800/30 transition-colors duration-300"
                    >
                      <span className="text-gray-300 font-medium">
                        {language === 'pl' ? 'Więcej opcji' : 'More options'}
                      </span>
                      {showAdditionalFields ? (
                        <ChevronUp className="w-5 h-5 text-violet-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Additional Fields */}
                    <AnimatePresence>
                      {showAdditionalFields && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden space-y-4"
                        >
                          <div>
                            <label htmlFor="mobile-phone" className="block text-sm font-medium text-gray-400 mb-2">
                              {t.contact.form.phone}
                            </label>
                            <input
                              type="tel"
                              id="mobile-phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              autoComplete="tel"
                              className={`w-full px-4 py-4 bg-gray-900/30 border ${
                                errors.phone ? 'border-red-500/50' : 'border-gray-800/50'
                              } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300 text-base`}
                              placeholder={t.contact.form.phonePlaceholder}
                              style={{ minHeight: '50px' }}
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                {errors.phone}
                              </p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="mobile-company" className="block text-sm font-medium text-gray-400 mb-2">
                              {t.contact.form.company}
                            </label>
                            <input
                              type="text"
                              id="mobile-company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full px-4 py-4 bg-gray-900/30 border border-gray-800/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-colors duration-300 text-base"
                              placeholder={t.contact.form.companyPlaceholder}
                              style={{ minHeight: '50px' }}
                            />
                          </div>

                          <div>
                            <label htmlFor="mobile-subject" className="block text-sm font-medium text-gray-400 mb-2">
                              {t.contact.form.subject}
                            </label>
                            <CustomSelect
                              id="mobile-subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder={t.contact.form.subjectPlaceholder}
                              options={[
                                { value: 'website', label: { pl: 'Strona internetowa', en: 'Website' } },
                                { value: 'ecommerce', label: { pl: 'Sklep internetowy', en: 'E-commerce' } },
                                { value: 'app', label: { pl: 'Aplikacja webowa', en: 'Web application' } },
                                { value: 'other', label: { pl: 'Inne', en: 'Other' } }
                              ]}
                              className="py-4"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <label htmlFor="mobile-budget" className="block text-sm font-medium text-gray-400 mb-2">
                                {t.contact.form.budget}
                              </label>
                              <CustomSelect
                                id="mobile-budget"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                placeholder={t.contact.form.budgetPlaceholder}
                                options={[
                                  { value: 'small', label: { pl: 'Do 5 000 PLN', en: 'Up to 1 000 EUR' } },
                                  { value: 'medium', label: { pl: '5 000 - 15 000 PLN', en: '1 000 - 3 000 EUR' } },
                                  { value: 'large', label: { pl: '15 000 - 30 000 PLN', en: '3 000 - 6 000 EUR' } },
                                  { value: 'enterprise', label: { pl: 'Powyżej 30 000 PLN', en: 'Above 6 000 EUR' } }
                                ]}
                                className="py-4"
                              />
                            </div>

                            <div>
                              <label htmlFor="mobile-timeline" className="block text-sm font-medium text-gray-400 mb-2">
                                {t.contact.form.timeline}
                              </label>
                              <CustomSelect
                                id="mobile-timeline"
                                name="timeline"
                                value={formData.timeline}
                                onChange={handleChange}
                                placeholder={t.contact.form.timelinePlaceholder}
                                options={[
                                  { value: 'asap', label: { pl: 'Jak najszybciej', en: 'As soon as possible' } },
                                  { value: '1-3', label: { pl: '1-3 miesiące', en: '1-3 months' } },
                                  { value: '3-6', label: { pl: '3-6 miesięcy', en: '3-6 months' } },
                                  { value: '6+', label: { pl: 'Powyżej 6 miesięcy', en: 'Above 6 months' } }
                                ]}
                                className="py-4"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {submitStatus === 'error' && (
                      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        {errorMessage}
                      </div>
                    )}

                    {/* Sticky Submit Button */}
                    <div className="sticky bottom-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-4 px-6 rounded-lg font-medium text-lg
                          ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-violet-500/25'} 
                          transition-all duration-300 flex items-center justify-center gap-2`}
                        style={{ minHeight: '56px' }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {language === 'pl' ? 'Wysyłanie...' : 'Sending...'}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t.contact.form.submit}
                          </>
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Contact info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                {language === 'pl' ? 'Zapraszamy do Kontaktu' : 'Get in Touch'}
              </h3>
              <p className="text-gray-400 mb-6">
                {language === 'pl' 
                  ? 'Jesteśmy dostępni od poniedziałku do piątku w godzinach 9:00-17:00. Zadzwoń do nas, aby omówić Twój projekt lub zadać pytania. Nasz zespół jest gotowy, aby pomóc Ci w realizacji Twoich celów.'
                  : 'We are available Monday to Friday, 9:00 AM - 5:00 PM. Call us to discuss your project or ask any questions. Our team is ready to help you achieve your goals.'}
              </p>
              <div className="flex items-center justify-between bg-violet-600/20 border border-violet-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-600/30">
                    <Phone className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      {language === 'pl' ? 'Zadzwoń lub skopiuj numer' : 'Call or copy number'}
                    </p>
                    <div className="flex items-center gap-2">
                      <a 
                        href="tel:+48123456789" 
                        className="text-lg font-semibold text-violet-400 hover:text-violet-300 transition-colors duration-300"
                      >
                        +48 123 456 789
                      </a>
                      <motion.button
                        onClick={handleCopyNumber}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/40 transition-colors duration-300"
                        title={language === 'pl' ? 'Kopiuj numer' : 'Copy number'}
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-violet-400" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
                <motion.a
                  href="tel:+48123456789"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-violet-600/30 hover:bg-violet-600/40 rounded-lg text-violet-400 transition-colors duration-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>{language === 'pl' ? 'Zadzwoń' : 'Call'}</span>
                </motion.a>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                {language === 'pl'
                  ? 'Nie czekaj - pierwsza konsultacja jest bezpłatna i niezobowiązująca.'
                  : 'Don\'t wait - first consultation is free and non-binding.'}
              </p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-white mb-6">{t.contact.info.title}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t.contact.info.email}</p>
                    <a href="mailto:elvemo.contact@gmail.com" className="text-violet-400 hover:text-violet-300 transition-colors duration-300">
                      elvemo.contact@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t.contact.info.phone}</p>
                    <a href="tel:+48123456789" className="text-violet-400 hover:text-violet-300 transition-colors duration-300">
                      +48 123 456 789
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{t.contact.info.location}</p>
                    <p className="text-white">Warsaw, Poland</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;