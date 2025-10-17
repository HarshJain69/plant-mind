import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Heart, 
  Users, 
  Target, 
  Award, 
  Globe,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Calendar,
  TrendingUp,
  Shield,
  Lightbulb,
  Zap,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | PlantMD',
  description: 'Learn about PlantMD\'s mission to revolutionize plant care with AI technology.',
};

const teamMembers = [
  {
    name: 'Dr. Sarah Green',
    role: 'CEO & Co-Founder',
    bio: 'Plant pathologist with 15+ years of experience in botanical research and AI applications.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    education: 'PhD in Plant Pathology, Stanford University',
    linkedin: '#',
    email: 'sarah@plantmd.com'
  },
  {
    name: 'Alex Chen',
    role: 'CTO & Co-Founder',
    bio: 'Machine learning engineer specializing in computer vision and agricultural technology.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    education: 'MS Computer Science, MIT',
    linkedin: '#',
    email: 'alex@plantmd.com'
  },
  {
    name: 'Dr. Maria Rodriguez',
    role: 'Head of Botany',
    bio: 'Botanist and plant care expert with expertise in tropical and houseplant cultivation.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    education: 'PhD in Botany, UC Davis',
    linkedin: '#',
    email: 'maria@plantmd.com'
  },
  {
    name: 'James Park',
    role: 'Lead AI Engineer',
    bio: 'AI researcher focused on developing cutting-edge plant disease detection algorithms.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    education: 'MS AI & Machine Learning, Carnegie Mellon',
    linkedin: '#',
    email: 'james@plantmd.com'
  }
];

const milestones = [
  { year: '2022', event: 'PlantMD Founded', description: 'Two passionate plant lovers decided to revolutionize plant care with AI' },
  { year: '2023', event: 'First AI Model', description: 'Launched our first plant disease detection model with 85% accuracy' },
  { year: '2023', event: '1,000 Users', description: 'Reached our first thousand happy plant parents' },
  { year: '2024', event: 'Series A Funding', description: 'Raised $5M to expand our AI capabilities and team' },
  { year: '2024', event: '98% Accuracy', description: 'Achieved industry-leading 98% accuracy in plant disease detection' },
  { year: '2024', event: '10,000+ Users', description: 'Growing community of plant enthusiasts worldwide' }
];

const values = [
  {
    icon: Leaf,
    title: 'Plant-First Approach',
    description: 'Every decision we make prioritizes the health and well-being of plants and their human companions.',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We continuously push the boundaries of AI and botanical science to create better solutions.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100'
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'Building a supportive community where plant parents can learn, share, and grow together.',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Providing accurate, trustworthy information that plant parents can depend on.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  }
];

const stats = [
  { number: '10,000+', label: 'Happy Users', icon: Users },
  { number: '50,000+', label: 'Plants Diagnosed', icon: Leaf },
  { number: '98%', label: 'Accuracy Rate', icon: Target },
  { number: '24/7', label: 'AI Support', icon: Zap }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-green-200 text-green-700">
              About PlantMD
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Revolutionizing Plant Care with AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              We're on a mission to help every plant parent succeed by combining cutting-edge AI technology 
              with decades of botanical expertise to provide instant, accurate plant care guidance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/dashboard">Try PlantMD</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                To democratize plant care expertise by making professional-level botanical knowledge 
                accessible to everyone through AI technology. We believe every plant deserves the 
                best care, and every plant parent deserves to succeed.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Instant, accurate plant diagnosis</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Personalized care recommendations</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Educational resources and community</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop"
                alt="Our Mission"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at PlantMD
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate experts combining botanical knowledge with cutting-edge technology
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{member.bio}</p>
                  <p className="text-xs text-gray-500 mb-4">{member.education}</p>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`mailto:${member.email}`}>
                        <Mail className="w-3 h-3" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={member.linkedin}>
                        <Linkedin className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Our Journey</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              From a simple idea to revolutionizing plant care worldwide
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-6 bg-white/10 backdrop-blur rounded-lg p-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-green-200 text-sm font-medium mb-1">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{milestone.event}</h3>
                    <p className="text-green-100">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="w-6 h-6 text-green-600" />
                  Our Headquarters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">PlantMD Inc.</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Innovation Drive<br />
                      Silicon Valley, CA 94025<br />
                      United States
                    </p>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Email:</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">hello@plantmd.com</p>
                  </div>
                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600">
              <CardHeader>
                <CardTitle className="text-2xl">Join Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We're always looking for passionate individuals who share our vision 
                  of making plant care accessible to everyone. Check out our open positions 
                  and become part of our growing team.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-600" />
                    <span>Competitive compensation & equity</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-green-600" />
                    <span>Passionate, mission-driven team</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Opportunity for growth & impact</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>Remote-friendly culture</span>
                  </div>
                </div>
                <Button className="mt-6" asChild>
                  <Link href="/careers">View Open Positions</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}