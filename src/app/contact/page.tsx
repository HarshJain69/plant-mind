'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle,
  HelpCircle,
  Leaf,
  Bug,
  Lightbulb,
  Heart,
  Globe,
  Twitter,
  Github,
  Linkedin
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactReasons = [
  { value: 'support', label: 'Technical Support' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'bug', label: 'Bug Report' },
  { value: 'partnership', label: 'Partnership Inquiry' },
  { value: 'feedback', label: 'General Feedback' },
  { value: 'press', label: 'Press & Media' },
  { value: 'other', label: 'Other' }
];

const faqs = [
  {
    question: 'How accurate is PlantMD\'s plant diagnosis?',
    answer: 'Our AI model achieves 98% accuracy in plant disease detection, trained on over 100,000 plant images and validated by botanical experts. However, we always recommend consulting with a local horticulturist for severe cases.'
  },
  {
    question: 'Is PlantMD free to use?',
    answer: 'Yes! PlantMD is completely free to use. We believe everyone should have access to quality plant care information. We may introduce premium features in the future, but core diagnosis will always remain free.'
  },
  {
    question: 'What types of plants can PlantMD diagnose?',
    answer: 'PlantMD can diagnose a wide variety of houseplants, garden plants, and crops. Our database includes over 1,000 plant species and can identify common diseases, pests, and nutrient deficiencies.'
  },
  {
    question: 'How do I take the best photo for diagnosis?',
    answer: 'For best results: 1) Use natural lighting, 2) Focus on affected areas, 3) Include multiple angles if possible, 4) Ensure the image is clear and in focus, 5) Fill the frame with the plant part you want diagnosed.'
  },
  {
    question: 'Can PlantMD help with plant care beyond diagnosis?',
    answer: 'Absolutely! Beyond diagnosis, PlantMD provides detailed care guides, watering schedules, fertilizer recommendations, and preventive care tips. Check out our Plant Library and Care Guide sections.'
  },
  {
    question: 'Is my plant data private and secure?',
    answer: 'Yes, we take privacy seriously. Your plant photos are processed securely and are not shared with third parties. You can delete your data at any time from your profile settings.'
  },
  {
    question: 'Does PlantMD work offline?',
    answer: 'Currently, PlantMD requires an internet connection for AI diagnosis. However, you can access previously saved diagnoses and care guides offline. We\'re working on offline capabilities for future versions.'
  },
  {
    question: 'How can I contribute to PlantMD\'s database?',
    answer: 'We welcome contributions! You can submit high-quality plant photos with confirmed diagnoses through our feedback form. Expert botanists and experienced gardeners can also apply to join our validation team.'
  }
];

const supportChannels = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    contact: 'support@plantmd.com',
    availability: 'Response within 24 hours'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our plant experts',
    contact: 'Available on dashboard',
    availability: 'Mon-Fri, 9 AM - 6 PM PST'
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our team',
    contact: '+1 (555) PLANT-MD',
    availability: 'Mon-Fri, 9 AM - 6 PM PST'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: 'Message sent successfully!',
        description: 'We\'ll get back to you within 24 hours.',
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          reason: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-green-200 text-green-700">
            Get in Touch
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            We're Here to Help
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a question about plant care? Need technical support? Want to share feedback? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Average response time: 4-6 hours</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">How can we help? *</Label>
                      <Select value={formData.reason} onValueChange={(value) => handleInputChange('reason', value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reason for contacting us" />
                        </SelectTrigger>
                        <SelectContent>
                          {contactReasons.map((reason) => (
                            <SelectItem key={reason.value} value={reason.value}>
                              {reason.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Brief description of your inquiry"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please provide as much detail as possible..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supportChannels.map((channel, index) => {
                  const IconComponent = channel.icon;
                  return (
                    <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{channel.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{channel.description}</p>
                        <p className="text-sm font-medium text-green-600">{channel.contact}</p>
                        <p className="text-xs text-gray-500">{channel.availability}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Our Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">PlantMD Headquarters</h4>
                    <p className="text-sm text-gray-600">
                      123 Innovation Drive<br />
                      Silicon Valley, CA 94025<br />
                      United States
                    </p>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Office Hours</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                      Saturday: 10:00 AM - 2:00 PM PST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Leaf className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-700 mb-2">Follow Us</h3>
                  <p className="text-sm text-green-600 mb-4">Stay updated with the latest plant care tips</p>
                  <div className="flex justify-center gap-3">
                    <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-100">
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Additional Help Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bug className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Found a Bug?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Help us improve PlantMD by reporting any issues you encounter.
              </p>
              <Button variant="outline" size="sm">
                Report Bug
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Feature Request</h3>
              <p className="text-sm text-gray-600 mb-4">
                Have an idea for a new feature? We'd love to hear your suggestions!
              </p>
              <Button variant="outline" size="sm">
                Suggest Feature
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="font-semibold mb-2">Love PlantMD?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Share your experience and help other plant parents discover us!
              </p>
              <Button variant="outline" size="sm">
                Leave Review
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Plant Care */}
        <Card className="mt-12 bg-gradient-to-r from-red-500 to-pink-600 text-white border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">🚨 Emergency Plant Care</h2>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Is your plant in critical condition? While PlantMD provides great diagnostic tools, 
              for emergency situations, consult with a local plant expert or nursery immediately.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <a href="tel:+1555PLANTMD">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Hotline
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
                <a href="https://www.google.com/maps/search/plant+nursery+near+me" target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Local Expert
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}