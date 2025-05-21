import React, { useState } from 'react';
import Hero from '../components/Hero';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interest: 'general' // general, playing, sponsorship
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        interest: 'general'
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Hero 
        title="Contact Us" 
        subtitle="Get in touch with our volleyball league"
        backgroundImage="https://images.pexels.com/photos/6551096/pexels-photo-6551096.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/5">
                <h2 className="text-3xl font-bold text-navy mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  Have questions about our volleyball league? Want to join as a player or become a sponsor? We'd love to hear from you!
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="text-orange mr-4 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-navy">Email Us</h3>
                      <p className="text-gray-600">insert(email)here</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-orange mr-4 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-navy">Call Us</h3>
                      <p className="text-gray-600">insert(phone)here</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-orange mr-4 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h3 className="font-semibold text-navy">Visit Us</h3>
                      <p className="text-gray-600">
                        insert(league location)here<br />
                        insert(city, state, zip)here
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-navy mb-3">League Schedule</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Men's A Division: Mondays, 7-10pm</p>
                    <p>Men's B Division: Wednesdays, 7-10pm</p>
                    <p>Women's A Division: Fridays, 7-10pm</p>
                  </div>
                </div>
              </div>

              <div className="md:w-3/5">
                {formStatus === 'success' ? (
                  <div className="bg-green-50 p-8 rounded-lg text-center">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-4">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-navy mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-colors"
                            placeholder="(123) 456-7890"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="interest" className="block text-gray-700 mb-1">I'm Interested In</label>
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-colors"
                        >
                          <option value="general">General Information</option>
                          <option value="playing">Joining as a Player</option>
                          <option value="sponsorship">Becoming a Sponsor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-gray-700 mb-1">Your Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-colors"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className={`flex items-center justify-center w-full md:w-auto px-6 py-3 bg-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors ${
                          formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                      >
                        {formStatus === 'submitting' ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" /> Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;