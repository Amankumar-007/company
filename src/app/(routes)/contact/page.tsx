"use client"
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Pattern Component for Contact
const ContactPattern = () => (
  <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.12] pointer-events-none text-black translate-x-20 -translate-y-10">
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M-10 50 Q 25 10 60 50 T 130 50" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M-10 40 Q 25 0 60 40 T 130 40" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M-10 60 Q 25 20 60 60 T 130 60" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M-10 30 Q 25 -10 60 30 T 130 30" stroke="currentColor" strokeWidth="0.25"/>
      <path d="M-10 70 Q 25 30 60 70 T 130 70" stroke="currentColor" strokeWidth="0.25"/>
    </svg>
  </div>
);

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectDescription: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    url: string;
    publicId: string;
    format: string;
    resourceType: string;
    size: number;
    name: string;
    type: string;
  }>>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      const tl = gsap.timeline({ delay: 0.15 })
      tl.fromTo('.contact-hero-title-line',
        { opacity: 0, y: '110%' },
        { opacity: 1, y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.12 }
      )
      tl.fromTo('.contact-hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.7'
      )
    }
  }, []);

  const services = [
    'Site from scratch',
    'UX/UI design',
    'Product design',
    'Webflow site',
    'Motion design',
    'Branding',
    'Mobile development'
  ];

  const budgetRanges = [
    '10-20k',
    '30-40k',
    '40-50k',
    '50-100k',
    '> 100k'
  ];

  const formatBudget = (budgetRange: string) => {
    if (currency === 'USD') return budgetRange + ' USD';
    if (currency === 'INR') {
        const ranges: Record<string, string> = {
            '10-20k': '1L - 3L INR',
            '30-40k': '3L - 5L INR',
            '40-50k': '5L - 10L INR',
            '50-100k': '10L - 25L INR',
            '> 100k': '> 25L INR'
        };
        return ranges[budgetRange] || budgetRange;
    }
    if (currency === 'EUR') {
        const ranges: Record<string, string> = {
            '10-20k': '9k - 18k EUR',
            '30-40k': '27k - 37k EUR',
            '40-50k': '37k - 46k EUR',
            '50-100k': '46k - 92k EUR',
            '> 100k': '> 92k EUR'
        };
        return ranges[budgetRange] || budgetRange;
    }
    if (currency === 'GBP') {
        const ranges: Record<string, string> = {
            '10-20k': '8k - 16k GBP',
            '30-40k': '24k - 32k GBP',
            '40-50k': '32k - 40k GBP',
            '50-100k': '40k - 80k GBP',
            '> 100k': '> 80k GBP'
        };
        return ranges[budgetRange] || budgetRange;
    }
    if (currency === 'AUD') {
        const ranges: Record<string, string> = {
            '10-20k': '15k - 30k AUD',
            '30-40k': '45k - 60k AUD',
            '40-50k': '60k - 75k AUD',
            '50-100k': '75k - 150k AUD',
            '> 100k': '> 150k AUD'
        };
        return ranges[budgetRange] || budgetRange;
    }
    return budgetRange;
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => {
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf', 'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain', 'application/zip', 'application/x-zip-compressed'
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!allowedTypes.includes(file.type)) {
        setUploadError(`File type not supported: ${file.name}`);
        return false;
      }
      
      if (file.size > maxSize) {
        setUploadError(`File too large: ${file.name} (max 10MB)`);
        return false;
      }
      
      return true;
    });

    setFiles(prev => [...prev, ...validFiles]);
    setUploadError('');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadError('');
    
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Upload failed');
        }
        
        const result = await response.json();
        return result.file;
      });
      
      const uploadedResults = await Promise.all(uploadPromises);
      setUploadedFiles(prev => [...prev, ...uploadedResults]);
      setFiles([]);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formDataToSend = {
        ...formData,
        services: selectedServices,
        budget: formatBudget(selectedBudget),
        currency: currency,
        attachments: uploadedFiles
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! We\'ll get back to you soon.');
        // Reset form
        setFormData({ name: '', email: '', projectDescription: '' });
        setSelectedServices([]);
        setSelectedBudget('');
        setUploadedFiles([]);
        setFiles([]);
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative">
      <ContactPattern />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div ref={heroRef} className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="contact-hero-title-line inline-block opacity-0 translate-y-[110%]">Hey! Tell us all</div>
            </div>
            <div className="overflow-hidden pb-2 -mb-2">
              <div className="contact-hero-title-line inline-block opacity-0 translate-y-[110%]">the things</div>
            </div>
          </h1>
          <p className="contact-hero-sub text-lg text-gray-600 max-w-2xl mx-auto opacity-0">
            Let&apos;s create something amazing together. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Services Selection */}
          <div>
            <p className="text-xl mb-8 font-medium">I&apos;m interested in...</p>
            <div className="flex flex-wrap gap-4">
              {services.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    selectedServices.includes(service)
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Name Field */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full text-xl py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none placeholder-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full text-xl py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none placeholder-gray-400 transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Project Description */}
          <div>
            <textarea
              name="projectDescription"
              placeholder="Tell us about your project"
              value={formData.projectDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full text-xl py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:border-black focus:outline-none placeholder-gray-400 resize-none transition-all duration-200 hover:border-gray-400"
            />
          </div>

          {/* Budget Selection */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Project budget</h2>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-2 sm:mt-0 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none bg-white text-lg font-medium"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              {budgetRanges.map((budget) => (
                <button
                  key={budget}
                  type="button"
                  onClick={() => setSelectedBudget(budget)}
                  className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    selectedBudget === budget
                      ? 'bg-black text-white border-black shadow-lg'
                      : 'bg-white text-black border-gray-300 hover:border-gray-400 hover:shadow-md'
                  }`}
                >
                  {formatBudget(budget)}
                </button>
              ))}
            </div>
          </div>

          {/* File Attachment */}
          <div>
            <h2 className="text-xl mb-6">Attachments</h2>
            
            {/* File Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                isDragging 
                  ? 'border-black bg-gray-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p className="text-lg font-medium text-gray-900">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Support for images, PDFs, documents (max 10MB each)
                  </p>
                </div>
                <label className="cursor-pointer">
                  <span className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200 inline-block">
                    Choose Files
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx,.txt,.zip"
                  />
                </label>
              </div>
            </div>
            
            {/* Upload Error */}
            {uploadError && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg text-red-700">
                <p className="text-sm">{uploadError}</p>
              </div>
            )}
            
            {/* Selected Files (not yet uploaded) */}
            {files.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Files to Upload ({files.length})</h4>
                  <button
                    onClick={uploadFiles}
                    disabled={isUploading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Files'}
                  </button>
                </div>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          ) : (
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-4">Uploaded Files ({uploadedFiles.length})</h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Uploaded
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeUploadedFile(index)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          {/* Status Messages */}
          {submitStatus !== 'idle' && (
            <div className={`mb-6 p-4 rounded-lg text-center ${
              submitStatus === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              <p className="font-medium">{submitMessage}</p>
            </div>
          )}

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative px-12 py-4 bg-black text-white rounded-full text-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="relative z-10">
                {isSubmitting ? 'Sending...' : 'Send request'}
              </span>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-0 transition-opacity duration-300 ease-in-out"
                style={{
                  opacity: isHovered ? 1 : 0,
                  background: isHovered ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,1) 100%)' : 'transparent'
                }}
              />
              <div 
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  boxShadow: isHovered ? 'inset 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(0,0,0,0.3)' : 'none',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-sm text-gray-500 pt-8">
            <p>
              This site is protected by reCAPTCHA and the Google{' '}
              <a href="/" className="underline hover:text-black">Privacy Policy</a>{' '}
              and{' '}
              <a href="/" className="underline hover:text-black">Terms of Service</a>{' '}
              apply.
            </p>
          </div>
        </form>

        {/* Avatar in corner */}
        <div className="fixed bottom-8 right-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-orange-300 rounded-full flex items-center justify-center">
              👤
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}