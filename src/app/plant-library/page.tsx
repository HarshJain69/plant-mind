'use client';

import { useState, useMemo } from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { 
  Droplets, 
  Sun, 
  Thermometer, 
  Leaf, 
  Heart,
  Search,
  Filter,
  Star,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  Camera,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

const plantDatabase = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    commonNames: ['Swiss Cheese Plant', 'Split-leaf Philodendron'],
    category: 'tropical',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    lightRequirement: 'bright-indirect',
    waterFrequency: 'weekly',
    humidity: 'high',
    temperature: '65-85°F',
    toxicity: 'toxic',
    description: 'A stunning tropical plant known for its large, fenestrated leaves that develop unique splits and holes as it matures.',
    careLevel: 4,
    popularityScore: 95,
    commonDiseases: ['Root rot', 'Spider mites', 'Scale insects'],
    careTips: [
      'Provide a moss pole for climbing support',
      'Wipe leaves regularly to maintain shine',
      'Rotate weekly for even growth',
      'Repot every 2-3 years'
    ],
    watering: {
      frequency: 'When top 1-2 inches of soil are dry',
      amount: 'Water thoroughly until drainage',
      seasonal: 'Reduce watering in winter'
    },
    light: {
      ideal: 'Bright, indirect light',
      tolerance: 'Can tolerate lower light but growth slows',
      avoid: 'Direct sunlight burns leaves'
    }
  },
  {
    id: 2,
    name: 'Sansevieria Trifasciata',
    commonNames: ['Snake Plant', 'Mother-in-Law\'s Tongue'],
    category: 'succulent',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop',
    lightRequirement: 'low-bright',
    waterFrequency: 'monthly',
    humidity: 'low',
    temperature: '60-80°F',
    toxicity: 'mildly-toxic',
    description: 'An extremely hardy and low-maintenance plant with upright, sword-like leaves. Perfect for beginners and low-light conditions.',
    careLevel: 1,
    popularityScore: 90,
    commonDiseases: ['Root rot', 'Leaf spots'],
    careTips: [
      'Extremely drought tolerant',
      'Excellent air purifier',
      'Can survive in very low light',
      'Propagates easily from leaf cuttings'
    ],
    watering: {
      frequency: 'Every 2-4 weeks, or when soil is completely dry',
      amount: 'Water sparingly, avoid overwatering',
      seasonal: 'Water even less in winter'
    },
    light: {
      ideal: 'Bright, indirect light',
      tolerance: 'Tolerates low light very well',
      avoid: 'Avoid prolonged direct sunlight'
    }
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    commonNames: ['Ficus Lyrata'],
    category: 'tropical',
    difficulty: 'advanced',
    image: 'https://images.unsplash.com/photo-1586083702768-190ae093d34d?w=400&h=400&fit=crop',
    lightRequirement: 'bright-indirect',
    waterFrequency: 'weekly',
    humidity: 'medium',
    temperature: '65-75°F',
    toxicity: 'toxic',
    description: 'A popular statement plant with large, violin-shaped leaves. Requires consistent care but rewards with impressive growth.',
    careLevel: 5,
    popularityScore: 85,
    commonDiseases: ['Root rot', 'Leaf drop', 'Brown spots', 'Scale insects'],
    careTips: [
      'Consistency is key - avoid moving frequently',
      'Clean leaves weekly for best photosynthesis',
      'Provide steady watering schedule',
      'May drop leaves when stressed'
    ],
    watering: {
      frequency: 'When top inch of soil is dry',
      amount: 'Water thoroughly but ensure drainage',
      seasonal: 'Reduce frequency in winter'
    },
    light: {
      ideal: 'Bright, indirect light near a window',
      tolerance: 'Needs consistent bright light',
      avoid: 'Direct sun and dark corners'
    }
  },
  {
    id: 4,
    name: 'Pothos',
    commonNames: ['Devil\'s Ivy', 'Golden Pothos'],
    category: 'tropical',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop',
    lightRequirement: 'medium',
    waterFrequency: 'weekly',
    humidity: 'medium',
    temperature: '65-85°F',
    toxicity: 'toxic',
    description: 'A versatile, fast-growing vine that\'s perfect for hanging baskets or climbing. Extremely forgiving and adaptable.',
    careLevel: 2,
    popularityScore: 92,
    commonDiseases: ['Root rot', 'Mealybugs', 'Scale insects'],
    careTips: [
      'Excellent for beginners',
      'Propagates easily in water',
      'Can trail or climb with support',
      'Tolerates various light conditions'
    ],
    watering: {
      frequency: 'When soil feels dry to touch',
      amount: 'Water thoroughly but allow drainage',
      seasonal: 'Slightly less in winter'
    },
    light: {
      ideal: 'Medium to bright, indirect light',
      tolerance: 'Adapts to lower light conditions',
      avoid: 'Direct sunlight'
    }
  },
  {
    id: 5,
    name: 'Peace Lily',
    commonNames: ['Spathiphyllum'],
    category: 'flowering',
    difficulty: 'intermediate',
    image: 'https://images.unsplash.com/photo-1583643280075-96bffc5c4d19?w=400&h=400&fit=crop',
    lightRequirement: 'low-medium',
    waterFrequency: 'bi-weekly',
    humidity: 'high',
    temperature: '65-80°F',
    toxicity: 'toxic',
    description: 'An elegant flowering plant with dark green foliage and white spathes. Excellent air purifier that tells you when it needs water.',
    careLevel: 3,
    popularityScore: 80,
    commonDiseases: ['Root rot', 'Leaf spots', 'Aphids', 'Scale insects'],
    careTips: [
      'Droops dramatically when thirsty',
      'Excellent natural air purifier',
      'Blooms periodically with white flowers',
      'Prefers consistently moist soil'
    ],
    watering: {
      frequency: 'When leaves start to droop slightly',
      amount: 'Keep soil consistently moist but not soggy',
      seasonal: 'Maintain consistent moisture year-round'
    },
    light: {
      ideal: 'Low to medium, indirect light',
      tolerance: 'Thrives in lower light conditions',
      avoid: 'Direct sunlight burns leaves'
    }
  },
  {
    id: 6,
    name: 'Rubber Plant',
    commonNames: ['Ficus Elastica', 'Rubber Tree'],
    category: 'tropical',
    difficulty: 'beginner',
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop',
    lightRequirement: 'bright-indirect',
    waterFrequency: 'weekly',
    humidity: 'medium',
    temperature: '60-80°F',
    toxicity: 'mildly-toxic',
    description: 'A robust plant with glossy, dark green leaves. Fast-growing and relatively easy to care for.',
    careLevel: 2,
    popularityScore: 88,
    commonDiseases: ['Root rot', 'Scale insects', 'Spider mites'],
    careTips: [
      'Wipe leaves regularly for shine',
      'Can grow quite tall indoors',
      'Prune to control size and shape',
      'Produces milky sap when cut'
    ],
    watering: {
      frequency: 'When top inch of soil is dry',
      amount: 'Water thoroughly until drainage',
      seasonal: 'Reduce watering in winter'
    },
    light: {
      ideal: 'Bright, indirect light',
      tolerance: 'Adapts to medium light',
      avoid: 'Direct hot sunlight'
    }
  }
];

const categories = [
  { value: 'all', label: 'All Plants' },
  { value: 'tropical', label: 'Tropical Plants' },
  { value: 'succulent', label: 'Succulents' },
  { value: 'flowering', label: 'Flowering Plants' },
  { value: 'herbs', label: 'Herbs' }
];

const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

const lightRequirements = [
  { value: 'all', label: 'All Light Levels' },
  { value: 'low', label: 'Low Light' },
  { value: 'medium', label: 'Medium Light' },
  { value: 'bright-indirect', label: 'Bright Indirect' },
  { value: 'direct', label: 'Direct Sun' }
];

export default function PlantLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLight, setSelectedLight] = useState('all');
  const [selectedPlant, setSelectedPlant] = useState(null);

  const filteredPlants = useMemo(() => {
    return plantDatabase.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.commonNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || plant.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || plant.difficulty === selectedDifficulty;
      const matchesLight = selectedLight === 'all' || plant.lightRequirement.includes(selectedLight.replace('-', ''));
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesLight;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedLight]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getToxicityIcon = (toxicity) => {
    switch (toxicity) {
      case 'toxic': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'mildly-toxic': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  if (selectedPlant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedPlant(null)}>
              ← Back to Library
            </Button>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedPlant.image}
                alt={selectedPlant.name}
                className="w-full aspect-square object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{selectedPlant.name}</h1>
                <div className="flex gap-2 mb-4">
                  {selectedPlant.commonNames.map((name, index) => (
                    <Badge key={index} variant="outline">{name}</Badge>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{selectedPlant.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(selectedPlant.difficulty)}>
                    {selectedPlant.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {getToxicityIcon(selectedPlant.toxicity)}
                  <span className="text-sm capitalize">{selectedPlant.toxicity.replace('-', ' ')}</span>
                </div>
              </div>
              
              <Tabs defaultValue="care" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="care">Care Guide</TabsTrigger>
                  <TabsTrigger value="problems">Common Issues</TabsTrigger>
                  <TabsTrigger value="tips">Pro Tips</TabsTrigger>
                </TabsList>
                
                <TabsContent value="care" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        Watering
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>Frequency:</strong> {selectedPlant.watering.frequency}</p>
                        <p><strong>Amount:</strong> {selectedPlant.watering.amount}</p>
                        <p><strong>Seasonal:</strong> {selectedPlant.watering.seasonal}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sun className="w-5 h-5 text-yellow-500" />
                        Lighting
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>Ideal:</strong> {selectedPlant.light.ideal}</p>
                        <p><strong>Tolerance:</strong> {selectedPlant.light.tolerance}</p>
                        <p><strong>Avoid:</strong> {selectedPlant.light.avoid}</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Thermometer className="w-5 h-5 text-red-500" />
                        Environment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>Temperature:</strong> {selectedPlant.temperature}</p>
                        <p><strong>Humidity:</strong> {selectedPlant.humidity}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="problems">
                  <Card>
                    <CardHeader>
                      <CardTitle>Common Diseases & Pests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedPlant.commonDiseases.map((disease, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            {disease}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="tips">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500" />
                        Expert Care Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {selectedPlant.careTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/dashboard">
                    <Camera className="w-4 h-4 mr-2" />
                    Diagnose This Plant
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/care-guide">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Care Guide
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Plant Library
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover detailed care information for popular houseplants. Search by name, difficulty, or care requirements.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedLight} onValueChange={setSelectedLight}>
                  <SelectTrigger>
                    <SelectValue placeholder="Light Needs" />
                  </SelectTrigger>
                  <SelectContent>
                    {lightRequirements.map((light) => (
                      <SelectItem key={light.value} value={light.value}>
                        {light.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {filteredPlants.length} of {plantDatabase.length} plants
          </p>
        </div>

        {/* Plant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlants.map((plant) => (
            <Card 
              key={plant.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedPlant(plant)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{plant.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{(plant.popularityScore / 10).toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-3">
                  {plant.commonNames.slice(0, 2).map((name, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {name}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {plant.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Difficulty:</span>
                    <Badge className={getDifficultyColor(plant.difficulty)}>
                      {plant.difficulty}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Care Level:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2 h-2 rounded-full ${
                            level <= plant.careLevel ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Pet Safety:</span>
                    {getToxicityIcon(plant.toxicity)}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex gap-2">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-blue-500" />
                    <span className="text-xs text-gray-600">{plant.waterFrequency}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sun className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs text-gray-600">{plant.lightRequirement}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlants.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No plants found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-none">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Can't Find Your Plant?</h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Use our AI-powered diagnosis tool to identify and get care recommendations for any plant, 
              even if it's not in our library yet.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">
                  <Camera className="w-4 h-4 mr-2" />
                  Identify My Plant
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600">
                <Link href="/contact">
                  Request Plant Addition
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}