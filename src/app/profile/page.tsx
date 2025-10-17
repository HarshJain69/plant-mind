'use client';

import { useState, useEffect, useMemo } from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Leaf, 
  Award, 
  Calendar, 
  TrendingUp,
  Settings,
  Camera,
  Heart,
  Target,
  Trophy,
  Star,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  Share,
  Edit,
  Plus,
  AlertTriangle,
  Sparkles,
  Gift
} from 'lucide-react';
import Link from 'next/link';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: number;
  progress?: number;
  maxProgress?: number;
}

interface PlantCollection {
  id: string;
  name: string;
  species: string;
  image: string;
  dateAdded: number;
  lastDiagnosis: number;
  health: 'healthy' | 'warning' | 'critical';
  diagnosisCount: number;
}

interface Diagnosis {
  id: string;
  disease: string;
  confidence: number;
  timestamp: number;
  image: string;
}

// Helper functions moved outside component to avoid hoisting issues
const calculateStreak = (diagnoses: Diagnosis[]) => {
  // Calculate current streak of consecutive days with diagnoses
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    
    const hasActivity = diagnoses.some((d: Diagnosis) => {
      const diagnosisDate = new Date(d.timestamp);
      diagnosisDate.setHours(0, 0, 0, 0);
      return diagnosisDate.getTime() === checkDate.getTime();
    });
    
    if (hasActivity) {
      streak++;
    } else if (i > 0) { // Don't break on the first day if no activity today
      break;
    }
  }
  
  return streak;
};

const calculateLevel = (totalDiagnoses: number) => {
  if (totalDiagnoses >= 100) return { level: 5, name: 'Plant Expert', next: null };
  if (totalDiagnoses >= 50) return { level: 4, name: 'Plant Specialist', next: 100 };
  if (totalDiagnoses >= 20) return { level: 3, name: 'Plant Enthusiast', next: 50 };
  if (totalDiagnoses >= 5) return { level: 2, name: 'Plant Lover', next: 20 };
  return { level: 1, name: 'Plant Beginner', next: 5 };
};

export default function ProfilePage() {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load diagnoses from localStorage
    try {
      const savedDiagnoses = localStorage.getItem('plant-md-diagnoses');
      if (savedDiagnoses) {
        setDiagnoses(JSON.parse(savedDiagnoses));
      }
    } catch (error) {
      console.error('Failed to load diagnoses:', error);
    }
  }, []);

  const userStats = useMemo(() => {
    const totalDiagnoses = diagnoses.length;
    const healthyPlants = diagnoses.filter((d: Diagnosis) => d.disease === 'Healthy').length;
    const problemsFound = totalDiagnoses - healthyPlants;
    const avgConfidence = diagnoses.length > 0 
      ? (diagnoses.reduce((sum: number, d: Diagnosis) => sum + d.confidence, 0) / diagnoses.length * 100)
      : 0;
    
    const thisWeek = diagnoses.filter((d: Diagnosis) => 
      Date.now() - d.timestamp < 7 * 24 * 60 * 60 * 1000
    ).length;
    
    const thisMonth = diagnoses.filter((d: Diagnosis) => 
      Date.now() - d.timestamp < 30 * 24 * 60 * 60 * 1000
    ).length;

    const streak = calculateStreak(diagnoses);
    const level = calculateLevel(totalDiagnoses);
    
    return {
      totalDiagnoses,
      healthyPlants,
      problemsFound,
      avgConfidence,
      thisWeek,
      thisMonth,
      streak,
      level
    };
  }, [diagnoses]);

  const achievements: Achievement[] = useMemo(() => [
    {
      id: 'first-diagnosis',
      name: 'First Steps',
      description: 'Complete your first plant diagnosis',
      icon: '🌱',
      unlocked: diagnoses.length >= 1,
      unlockedDate: diagnoses.length >= 1 ? diagnoses[diagnoses.length - 1]?.timestamp : undefined
    },
    {
      id: 'streak-7',
      name: 'Weekly Warrior',
      description: 'Check on your plants for 7 days straight',
      icon: '🔥',
      unlocked: userStats.streak >= 7,
      progress: Math.min(userStats.streak, 7),
      maxProgress: 7
    },
    {
      id: 'healthy-plants',
      name: 'Green Thumb',
      description: 'Have 5 healthy plant diagnoses',
      icon: '💚',
      unlocked: userStats.healthyPlants >= 5,
      progress: Math.min(userStats.healthyPlants, 5),
      maxProgress: 5
    },
    {
      id: 'plant-doctor',
      name: 'Plant Doctor',
      description: 'Complete 25 plant diagnoses',
      icon: '🩺',
      unlocked: userStats.totalDiagnoses >= 25,
      progress: Math.min(userStats.totalDiagnoses, 25),
      maxProgress: 25
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      description: 'Identify and treat 10 plant issues',
      icon: '🔍',
      unlocked: userStats.problemsFound >= 10,
      progress: Math.min(userStats.problemsFound, 10),
      maxProgress: 10
    },
    {
      id: 'accuracy-master',
      name: 'Accuracy Master',
      description: 'Maintain 95%+ average diagnosis accuracy',
      icon: '🎯',
      unlocked: userStats.avgConfidence >= 95,
      progress: Math.min(userStats.avgConfidence, 95),
      maxProgress: 95
    }
  ], [diagnoses, userStats]);

  const plantCollection: PlantCollection[] = useMemo(() => {
    // Group diagnoses by similar plants and create a collection
    const plantMap = new Map<string, PlantCollection>();
    
    diagnoses.forEach((diagnosis: Diagnosis) => {
      const key = diagnosis.disease === 'Healthy' ? 'healthy-plant' : diagnosis.disease;
      if (!plantMap.has(key)) {
        plantMap.set(key, {
          id: key,
          name: diagnosis.disease === 'Healthy' ? 'Healthy Plant' : `Plant with ${diagnosis.disease}`,
          species: diagnosis.disease,
          image: diagnosis.image,
          dateAdded: diagnosis.timestamp,
          lastDiagnosis: diagnosis.timestamp,
          health: diagnosis.disease === 'Healthy' ? 'healthy' : 'warning',
          diagnosisCount: 1
        });
      } else {
        const existing = plantMap.get(key);
        existing.diagnosisCount += 1;
        existing.lastDiagnosis = Math.max(existing.lastDiagnosis, diagnosis.timestamp);
        if (diagnosis.timestamp > existing.lastDiagnosis) {
          existing.image = diagnosis.image;
          existing.health = diagnosis.disease === 'Healthy' ? 'healthy' : 'warning';
        }
      }
    });
    
    return Array.from(plantMap.values()).sort((a, b) => b.lastDiagnosis - a.lastDiagnosis);
  }, [diagnoses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-none">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-white/20 text-white text-2xl">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">Plant Parent</h1>
                <p className="text-green-100 mb-4">
                  {userStats.level.name} • Level {userStats.level.level}
                </p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.totalDiagnoses}</div>
                    <div className="text-green-100 text-sm">Diagnoses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{userStats.streak}</div>
                    <div className="text-green-100 text-sm">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{plantCollection.length}</div>
                    <div className="text-green-100 text-sm">Plants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}</div>
                    <div className="text-green-100 text-sm">Achievements</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Button variant="secondary" size="lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        {userStats.level.next && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Progress to Next Level</h3>
                <span className="text-sm text-gray-600">
                  {userStats.totalDiagnoses} / {userStats.level.next}
                </span>
              </div>
              <Progress 
                value={(userStats.totalDiagnoses / userStats.level.next) * 100} 
                className="h-3"
              />
              <p className="text-sm text-gray-600 mt-2">
                {userStats.level.next - userStats.totalDiagnoses} more diagnoses to reach {userStats.level.next > 50 ? 'Plant Expert' : userStats.level.next > 20 ? 'Plant Specialist' : userStats.level.next > 5 ? 'Plant Enthusiast' : 'Plant Lover'}
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collection">My Plants</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-green-600">{userStats.thisMonth}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Plant check-ups</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Healthy Plants</p>
                      <p className="text-2xl font-bold text-blue-600">{userStats.healthyPlants}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">No issues detected</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Accuracy</p>
                      <p className="text-2xl font-bold text-purple-600">{userStats.avgConfidence.toFixed(1)}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Average confidence</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Streak</p>
                      <p className="text-2xl font-bold text-orange-600">{userStats.streak}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Days active</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {diagnoses.length > 0 ? (
                  <div className="space-y-4">
                    {diagnoses.slice(0, 5).map((diagnosis, index) => (
                      <div key={diagnosis.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={diagnosis.image} 
                          alt="Plant" 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{diagnosis.disease}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(diagnosis.timestamp).toLocaleDateString()} • 
                            {Math.round(diagnosis.confidence * 100)}% confidence
                          </p>
                        </div>
                        <Badge variant={diagnosis.disease === 'Healthy' ? 'default' : 'secondary'}>
                          {diagnosis.disease === 'Healthy' ? 'Healthy' : 'Issue'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-600 mb-2">No diagnoses yet</h3>
                    <p className="text-gray-500 mb-4">Upload your first plant photo to get started!</p>
                    <Button asChild>
                      <Link href="/dashboard">
                        <Camera className="w-4 h-4 mr-2" />
                        Start Diagnosis
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plant Collection Tab */}
          <TabsContent value="collection">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantCollection.map((plant) => (
                <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{plant.name}</h3>
                      <Badge 
                        variant={plant.health === 'healthy' ? 'default' : 'secondary'}
                        className={plant.health === 'healthy' ? 'bg-green-100 text-green-700' : ''}
                      >
                        {plant.health === 'healthy' ? 'Healthy' : 'Needs Attention'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{plant.species}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{plant.diagnosisCount} check-ups</span>
                      <span>Last seen {new Date(plant.lastDiagnosis).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {plantCollection.length === 0 && (
                <Card className="col-span-full">
                  <CardContent className="p-12 text-center">
                    <Leaf className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No plants in your collection yet</h3>
                    <p className="text-gray-500 mb-6">Start diagnosing plants to build your collection</p>
                    <Button asChild>
                      <Link href="/dashboard">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Plant
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`${achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                  } hover:shadow-lg transition-shadow`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="font-semibold mb-2 flex items-center justify-center gap-2">
                      {achievement.name}
                      {achievement.unlocked && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{achievement.description}</p>
                    
                    {achievement.progress !== undefined && (
                      <div className="space-y-2">
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500">
                          {achievement.progress} / {achievement.maxProgress}
                        </p>
                      </div>
                    )}
                    
                    {achievement.unlocked && achievement.unlockedDate && (
                      <p className="text-xs text-gray-500 mt-2">
                        Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Diagnosis Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{userStats.healthyPlants}</div>
                      <div className="text-sm text-gray-600">Healthy Plants</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {userStats.totalDiagnoses > 0 ? Math.round((userStats.healthyPlants / userStats.totalDiagnoses) * 100) : 0}% of total
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">{userStats.problemsFound}</div>
                      <div className="text-sm text-gray-600">Issues Detected</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {userStats.totalDiagnoses > 0 ? Math.round((userStats.problemsFound / userStats.totalDiagnoses) * 100) : 0}% of total
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.totalDiagnoses}</div>
                      <div className="text-sm text-gray-600">Total Diagnoses</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {userStats.avgConfidence.toFixed(1)}% avg. confidence
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This week</span>
                      <span className="font-semibold">{userStats.thisWeek} diagnoses</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This month</span>
                      <span className="font-semibold">{userStats.thisMonth} diagnoses</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current streak</span>
                      <span className="font-semibold">{userStats.streak} days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Plants in collection</span>
                      <span className="font-semibold">{plantCollection.length} plants</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}