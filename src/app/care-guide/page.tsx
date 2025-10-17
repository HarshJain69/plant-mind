import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Droplets, 
  Sun, 
  Thermometer, 
  Scissors, 
  Bug, 
  Leaf, 
  Heart,
  AlertTriangle,
  CheckCircle,
  Info,
  Calendar,
  Lightbulb,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Plant Care Guide | PlantMD',
  description: 'Comprehensive plant care guide with tips for watering, lighting, fertilizing, and more.',
};

const plantCategories = [
  {
    id: 'succulents',
    name: 'Succulents',
    description: 'Low-maintenance plants that store water in their leaves',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&h=300&fit=crop',
    difficulty: 'Beginner',
    watering: 'Every 2-3 weeks',
    light: 'Bright, indirect light',
    tips: [
      'Water deeply but infrequently',
      'Ensure good drainage to prevent root rot',
      'Rotate regularly for even growth',
      'Reduce watering in winter'
    ]
  },
  {
    id: 'tropical',
    name: 'Tropical Plants',
    description: 'Lush plants that love humidity and warmth',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop',
    difficulty: 'Intermediate',
    watering: 'Weekly',
    light: 'Bright, indirect light',
    tips: [
      'Maintain high humidity (40-60%)',
      'Keep soil consistently moist',
      'Mist leaves regularly',
      'Protect from cold drafts'
    ]
  },
  {
    id: 'flowering',
    name: 'Flowering Plants',
    description: 'Beautiful blooming plants that brighten any space',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    difficulty: 'Advanced',
    watering: '2-3 times per week',
    light: 'Bright light with some direct sun',
    tips: [
      'Deadhead spent blooms regularly',
      'Feed with bloom-boosting fertilizer',
      'Provide adequate air circulation',
      'Monitor for pests on flowers'
    ]
  },
  {
    id: 'herbs',
    name: 'Herbs',
    description: 'Edible plants perfect for cooking and aromatherapy',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    difficulty: 'Beginner',
    watering: 'When top inch is dry',
    light: 'Direct sunlight (6+ hours)',
    tips: [
      'Harvest regularly to encourage growth',
      'Pinch flowers to maintain flavor',
      'Well-draining soil is essential',
      'Most herbs prefer slightly dry conditions'
    ]
  }
];

const careSeasons = [
  {
    season: 'Spring',
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    tasks: [
      'Begin regular fertilizing',
      'Repot plants that have outgrown containers',
      'Increase watering frequency',
      'Start propagating cuttings',
      'Move plants to brighter locations'
    ]
  },
  {
    season: 'Summer',
    icon: Sun,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    tasks: [
      'Water more frequently',
      'Provide shade during hottest hours',
      'Increase humidity for tropical plants',
      'Monitor for pests and diseases',
      'Prune and deadhead regularly'
    ]
  },
  {
    season: 'Fall',
    icon: Calendar,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    tasks: [
      'Reduce watering frequency',
      'Stop fertilizing most plants',
      'Bring outdoor plants inside',
      'Prepare for dormancy period',
      'Check for pest issues before bringing plants indoors'
    ]
  },
  {
    season: 'Winter',
    icon: Thermometer,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    tasks: [
      'Minimal watering for most plants',
      'Provide supplemental lighting',
      'Maintain humidity indoors',
      'Avoid fertilizing dormant plants',
      'Monitor for cold damage'
    ]
  }
];

const commonProblems = [
  {
    problem: 'Overwatering',
    symptoms: ['Yellow leaves', 'Musty smell', 'Soft, brown roots'],
    solutions: ['Reduce watering frequency', 'Improve drainage', 'Repot if necessary'],
    prevention: 'Check soil moisture before watering',
    severity: 'high'
  },
  {
    problem: 'Insufficient Light',
    symptoms: ['Leggy growth', 'Small leaves', 'Loss of variegation'],
    solutions: ['Move to brighter location', 'Add grow lights', 'Rotate regularly'],
    prevention: 'Research light requirements for each plant',
    severity: 'medium'
  },
  {
    problem: 'Pest Infestation',
    symptoms: ['Sticky honeydew', 'Visible insects', 'Damaged leaves'],
    solutions: ['Isolate affected plant', 'Use insecticidal soap', 'Remove pests manually'],
    prevention: 'Regular inspection and quarantine new plants',
    severity: 'high'
  },
  {
    problem: 'Low Humidity',
    symptoms: ['Brown leaf tips', 'Crispy edges', 'Dropping leaves'],
    solutions: ['Use humidifier', 'Group plants together', 'Use pebble trays'],
    prevention: 'Monitor humidity levels, especially in winter',
    severity: 'low'
  }
];

export default function CareGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Complete Plant Care Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know to keep your plants healthy and thriving throughout the year
          </p>
        </div>

        <Tabs defaultValue="basics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="basics">Care Basics</TabsTrigger>
            <TabsTrigger value="plants">Plant Types</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal Care</TabsTrigger>
            <TabsTrigger value="problems">Troubleshooting</TabsTrigger>
          </TabsList>

          {/* Care Basics Tab */}
          <TabsContent value="basics" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Droplets className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle>Watering</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Check soil moisture before watering
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Water thoroughly until it drains
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Use room temperature water
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Water in the morning when possible
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sun className="w-8 h-8 text-yellow-600" />
                  </div>
                  <CardTitle>Lighting</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Know your plant's light requirements
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Rotate plants weekly for even growth
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Consider grow lights for dark spaces
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Protect from harsh direct sun
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle>Fertilizing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Feed during growing season
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Dilute fertilizer to half strength
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Stop feeding dormant plants
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Use balanced fertilizer for most plants
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scissors className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle>Pruning</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Remove dead or damaged growth
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Pinch back to encourage bushiness
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Use clean, sharp tools
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      Prune during active growth
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Tips Section */}
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Lightbulb className="w-6 h-6" />
                  Pro Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">🌱 Start Small</h4>
                    <p className="text-green-100">Begin with easy-care plants like pothos or snake plants to build confidence.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📱 Keep Records</h4>
                    <p className="text-green-100">Track watering dates and plant responses to develop a routine.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🔍 Observe Daily</h4>
                    <p className="text-green-100">Regular observation helps catch problems early before they become serious.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🏠 Know Your Environment</h4>
                    <p className="text-green-100">Understand your home's light, humidity, and temperature conditions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plant Types Tab */}
          <TabsContent value="plants">
            <div className="grid md:grid-cols-2 gap-8">
              {plantCategories.map((category) => (
                <Card key={category.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <Badge variant={category.difficulty === 'Beginner' ? 'default' : category.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {category.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Droplets className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium">Watering</span>
                        </div>
                        <p className="text-sm text-gray-600">{category.watering}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Sun className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">Light</span>
                        </div>
                        <p className="text-sm text-gray-600">{category.light}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        Care Tips
                      </h4>
                      <ul className="space-y-1">
                        {category.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Seasonal Care Tab */}
          <TabsContent value="seasonal">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {careSeasons.map((season) => {
                const IconComponent = season.icon;
                return (
                  <Card key={season.season} className={`${season.bgColor} border-none hover:shadow-lg transition-shadow`}>
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <IconComponent className={`w-8 h-8 ${season.color}`} />
                      </div>
                      <CardTitle className={season.color}>{season.season}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {season.tasks.map((task, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Troubleshooting Tab */}
          <TabsContent value="problems">
            <div className="space-y-6">
              {commonProblems.map((problem, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className={`w-5 h-5 ${
                          problem.severity === 'high' ? 'text-red-500' : 
                          problem.severity === 'medium' ? 'text-yellow-500' : 
                          'text-blue-500'
                        }`} />
                        {problem.problem}
                      </CardTitle>
                      <Badge variant={problem.severity === 'high' ? 'destructive' : problem.severity === 'medium' ? 'secondary' : 'default'}>
                        {problem.severity} priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Bug className="w-4 h-4 text-red-500" />
                          Symptoms
                        </h4>
                        <ul className="space-y-1">
                          {problem.symptoms.map((symptom, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-green-500" />
                          Solutions
                        </h4>
                        <ul className="space-y-1">
                          {problem.solutions.map((solution, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          Prevention
                        </h4>
                        <p className="text-sm text-gray-600 flex items-start gap-2">
                          <Info className="w-3 h-3 text-blue-500 mt-1 flex-shrink-0" />
                          {problem.prevention}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Personalized Plant Advice?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Use our AI-powered plant diagnosis tool to get instant, personalized care recommendations for your specific plants.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">
                  Diagnose My Plant
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                <Link href="/plant-library">
                  Browse Plant Library
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}