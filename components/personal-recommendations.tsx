"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart, TreePine, Waves, Flame, Camera, Book, Music, Star, Clock, MapPin } from "lucide-react"

interface Activity {
  id: string
  name: string
  description: string
  category: "relaxation" | "adventure" | "wellness" | "creative" | "spiritual"
  duration: string
  difficulty: "easy" | "medium" | "hard"
  bestTime: string
  location: string
  icon: React.ReactNode
  personalityMatch: string[]
  benefits: string[]
  equipment?: string[]
}

interface ScoredActivity extends Activity {
  score: number
}

interface PersonalityProfile {
  type: string
  preferences: string[]
  energyLevel: "low" | "medium" | "high"
  socialPreference: "solo" | "small-group" | "group"
}

const activities: Activity[] = [
  {
    id: "forest-meditation",
    name: "Лесная медитация",
    description: "Глубокая медитация среди вековых сосен с практиками осознанности",
    category: "spiritual",
    duration: "45-60 мин",
    difficulty: "easy",
    bestTime: "Раннее утро (6:00-8:00)",
    location: "Сосновая роща, 10 мин от дома",
    icon: <TreePine className="h-5 w-5" />,
    personalityMatch: ["introvert", "spiritual", "nature-lover"],
    benefits: ["Снижение стресса", "Улучшение концентрации", "Связь с природой"],
    equipment: ["Коврик для медитации", "Плед"],
  },
  {
    id: "sunrise-yoga",
    name: "Йога на рассвете",
    description: "Приветствие солнца на берегу озера с видом на карельские пейзажи",
    category: "wellness",
    duration: "60-90 мин",
    difficulty: "medium",
    bestTime: "Рассвет (5:30-7:00)",
    location: "Берег озера",
    icon: <Heart className="h-5 w-5" />,
    personalityMatch: ["active", "spiritual", "early-bird"],
    benefits: ["Гибкость", "Энергия на весь день", "Внутренний баланс"],
    equipment: ["Коврик для йоги", "Удобная одежда"],
  },
  {
    id: "kayak-meditation",
    name: "Медитативная прогулка на байдарке",
    description: "Тихое скольжение по водной глади с элементами водной медитации",
    category: "adventure",
    duration: "2-3 часа",
    difficulty: "medium",
    bestTime: "Утро или вечер",
    location: "Озеро Сямозеро",
    icon: <Waves className="h-5 w-5" />,
    personalityMatch: ["adventurous", "nature-lover", "active"],
    benefits: ["Физическая активность", "Единение с водой", "Новый опыт"],
    equipment: ["Спасательный жилет", "Водонепроницаемая одежда"],
  },
  {
    id: "fire-ceremony",
    name: "Церемония у костра",
    description: "Вечерний ритуал с огнем, историями и глубокими размышлениями",
    category: "spiritual",
    duration: "2-3 часа",
    difficulty: "easy",
    bestTime: "Вечер (19:00-22:00)",
    location: "Место для костра у дома",
    icon: <Flame className="h-5 w-5" />,
    personalityMatch: ["social", "spiritual", "storyteller"],
    benefits: ["Общение", "Рефлексия", "Расслабление"],
    equipment: ["Теплая одежда", "Блокнот для записей"],
  },
  {
    id: "nature-photography",
    name: "Фотопрогулка на природе",
    description: "Творческая съемка карельских пейзажей с основами композиции",
    category: "creative",
    duration: "3-4 часа",
    difficulty: "easy",
    bestTime: "Золотой час (утро/вечер)",
    location: "Различные локации",
    icon: <Camera className="h-5 w-5" />,
    personalityMatch: ["creative", "observant", "patient"],
    benefits: ["Творческое развитие", "Внимательность", "Память о поездке"],
    equipment: ["Фотоаппарат/смартфон", "Удобная обувь"],
  },
  {
    id: "sound-healing",
    name: "Звукотерапия в лесу",
    description: "Исцеляющие звуки природы в сочетании с тибетскими чашами",
    category: "wellness",
    duration: "60-75 мин",
    difficulty: "easy",
    bestTime: "После обеда (15:00-17:00)",
    location: "Тихая поляна в лесу",
    icon: <Music className="h-5 w-5" />,
    personalityMatch: ["sensitive", "spiritual", "music-lover"],
    benefits: ["Глубокое расслабление", "Энергетическое очищение", "Гармонизация"],
    equipment: ["Коврик", "Теплая одежда"],
  },
  {
    id: "journaling-retreat",
    name: "Письменные практики",
    description: "Структурированное ведение дневника с техниками самопознания",
    category: "spiritual",
    duration: "90-120 мин",
    difficulty: "easy",
    bestTime: "Утро или вечер",
    location: "Тихое место в доме или на веранде",
    icon: <Book className="h-5 w-5" />,
    personalityMatch: ["reflective", "introvert", "writer"],
    benefits: ["Самопознание", "Ясность мыслей", "Эмоциональная разгрузка"],
    equipment: ["Блокнот", "Ручка", "Уютное место"],
  },
]

const categoryColors = {
  relaxation: "from-blue-500 to-blue-600",
  adventure: "from-orange-500 to-orange-600",
  wellness: "from-green-500 to-green-600",
  creative: "from-purple-500 to-purple-600",
  spiritual: "from-amber-500 to-amber-600",
}

const difficultyColors = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
}

export function PersonalRecommendations() {
  const [userProfile, setUserProfile] = useState<PersonalityProfile>({
    type: "balanced",
    preferences: ["nature-lover", "spiritual"],
    energyLevel: "medium",
    socialPreference: "small-group",
  })
  const [recommendedActivities, setRecommendedActivities] = useState<ScoredActivity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)

  useEffect(() => {
    // Алгоритм персональных рекомендаций
    const scored = activities.map((activity) => {
      let score = 0

      // Совпадение с типом личности
      const personalityMatches = activity.personalityMatch.filter((trait) =>
        userProfile.preferences.includes(trait),
      ).length
      score += personalityMatches * 3

      // Соответствие уровню энергии
      if (userProfile.energyLevel === "low" && activity.difficulty === "easy") score += 2
      if (userProfile.energyLevel === "medium" && activity.difficulty !== "hard") score += 2
      if (userProfile.energyLevel === "high") score += 1

      // Социальные предпочтения
      if (userProfile.socialPreference === "solo" && ["spiritual", "creative"].includes(activity.category)) score += 2

      return { ...activity, score }
    })

    // Сортируем по убыванию рейтинга и берем топ-4
    const top = scored.sort((a, b) => b.score - a.score).slice(0, 4)

    setRecommendedActivities(top)
  }, [userProfile])

  const updateProfile = (key: keyof PersonalityProfile, value: any) => {
    setUserProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-forest-500 to-amber-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-stone-100">Персональные рекомендации</CardTitle>
              <p className="text-stone-400">Активности, подобранные специально для вас</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Быстрая настройка профиля */}
          <div className="bg-forest-800/20 rounded-lg p-4 border border-forest-600/30">
            <h4 className="font-semibold text-forest-400 mb-3">Расскажите о себе:</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-stone-300 mb-2">Уровень энергии:</p>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <Button
                      key={level}
                      size="sm"
                      variant={userProfile.energyLevel === level ? "default" : "outline"}
                      onClick={() => updateProfile("energyLevel", level)}
                      className={
                        userProfile.energyLevel === level
                          ? "bg-forest-600 text-white"
                          : "border-forest-600/50 text-forest-300 hover:bg-forest-800/30"
                      }
                    >
                      {level === "low" && "Спокойный"}
                      {level === "medium" && "Умеренный"}
                      {level === "high" && "Активный"}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-stone-300 mb-2">Предпочитаете:</p>
                <div className="flex flex-wrap gap-2">
                  {["nature-lover", "spiritual", "creative", "active", "introvert", "social"].map((pref) => (
                    <Button
                      key={pref}
                      size="sm"
                      variant={userProfile.preferences.includes(pref) ? "default" : "outline"}
                      onClick={() => {
                        const newPrefs = userProfile.preferences.includes(pref)
                          ? userProfile.preferences.filter((p) => p !== pref)
                          : [...userProfile.preferences, pref]
                        updateProfile("preferences", newPrefs)
                      }}
                      className={
                        userProfile.preferences.includes(pref)
                          ? "bg-forest-600 text-white text-xs"
                          : "border-forest-600/50 text-forest-300 hover:bg-forest-800/30 text-xs"
                      }
                    >
                      {pref === "nature-lover" && "Природа"}
                      {pref === "spiritual" && "Духовность"}
                      {pref === "creative" && "Творчество"}
                      {pref === "active" && "Активность"}
                      {pref === "introvert" && "Уединение"}
                      {pref === "social" && "Общение"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Рекомендованные активности */}
          <div>
            <h4 className="font-semibold text-forest-400 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Рекомендуем для вас:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedActivities.map((activity) => (
                <Card
                  key={activity.id}
                  className="bg-forest-800/20 border-forest-600/30 hover:bg-forest-700/30 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => setSelectedActivity(activity)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`bg-gradient-to-r ${categoryColors[activity.category]} w-10 h-10 rounded-lg flex items-center justify-center`}
                        >
                          <div className="text-white">{activity.icon}</div>
                        </div>
                        <div>
                          <CardTitle className="text-lg text-stone-100">{activity.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs border-forest-600/30 ${difficultyColors[activity.difficulty]}`}
                            >
                              {activity.difficulty}
                            </Badge>
                            <span className="text-xs text-stone-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {activity.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-semibold">{activity.score}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-300 text-sm mb-3">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {activity.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-forest-600/30 text-forest-400">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Детальная информация о выбранной активности */}
      {selectedActivity && (
        <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`bg-gradient-to-r ${categoryColors[selectedActivity.category]} w-12 h-12 rounded-xl flex items-center justify-center`}
                >
                  <div className="text-white">{selectedActivity.icon}</div>
                </div>
                <div>
                  <CardTitle className="text-2xl text-stone-100">{selectedActivity.name}</CardTitle>
                  <p className="text-stone-400">{selectedActivity.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedActivity(null)}
                className="border-forest-600/50 text-forest-300 hover:bg-forest-800/30"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-forest-800/20 rounded-lg p-4 border border-forest-600/30">
                <h4 className="font-semibold text-forest-400 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Время и место
                </h4>
                <div className="space-y-2 text-sm text-stone-300">
                  <p>
                    <strong>Продолжительность:</strong> {selectedActivity.duration}
                  </p>
                  <p>
                    <strong>Лучшее время:</strong> {selectedActivity.bestTime}
                  </p>
                  <p>
                    <strong>Локация:</strong> {selectedActivity.location}
                  </p>
                  <p>
                    <strong>Сложность:</strong>
                    <span className={`ml-1 ${difficultyColors[selectedActivity.difficulty]}`}>
                      {selectedActivity.difficulty}
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-forest-800/20 rounded-lg p-4 border border-forest-600/30">
                <h4 className="font-semibold text-forest-400 mb-2 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Польза
                </h4>
                <ul className="space-y-1 text-sm text-stone-300">
                  {selectedActivity.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-forest-400">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedActivity.equipment && (
                <div className="bg-forest-800/20 rounded-lg p-4 border border-forest-600/30">
                  <h4 className="font-semibold text-forest-400 mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Что взять с собой
                  </h4>
                  <ul className="space-y-1 text-sm text-stone-300">
                    {selectedActivity.equipment.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-forest-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-forest-800/20 rounded-lg p-4 border border-forest-600/30">
              <h4 className="font-semibold text-forest-400 mb-2">Почему это подходит именно вам:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedActivity.personalityMatch
                  .filter((trait) => userProfile.preferences.includes(trait))
                  .map((trait, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-forest-600 to-forest-700 text-white">
                      ✓ {trait === "nature-lover" && "Любовь к природе"}
                      {trait === "spiritual" && "Духовные практики"}
                      {trait === "creative" && "Творческий подход"}
                      {trait === "active" && "Активный образ жизни"}
                      {trait === "introvert" && "Предпочтение уединения"}
                      {trait === "social" && "Общение с людьми"}
                    </Badge>
                  ))}
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white"
              onClick={() => {
                // Здесь можно добавить активность в персональный план
                console.log("Adding activity to personal plan:", selectedActivity.name)
              }}
            >
              Добавить в мой план ретрита
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
