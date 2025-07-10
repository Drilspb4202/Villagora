"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, ArrowLeft, Sparkles, Target, Calendar } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
    icon: string
    weight: {
      minimal: number
      medium: number
      comfort: number
      maximum: number
    }
  }[]
}

interface QuizResult {
  packageName: string
  score: number
  reasons: string[]
  activities: string[]
  dietaryNeeds: string[]
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "experience",
    question: "Какой у вас опыт с ретритами?",
    options: [
      {
        id: "first-time",
        text: "Первый раз",
        icon: "🌱",
        weight: { minimal: 3, medium: 2, comfort: 1, maximum: 0 },
      },
      {
        id: "some-experience",
        text: "Был на 1-2 ретритах",
        icon: "🌿",
        weight: { minimal: 1, medium: 3, comfort: 2, maximum: 1 },
      },
      {
        id: "experienced",
        text: "Регулярно участвую",
        icon: "🌳",
        weight: { minimal: 0, medium: 1, comfort: 2, maximum: 3 },
      },
    ],
  },
  {
    id: "duration",
    question: "Сколько времени готовы посвятить ретриту?",
    options: [
      {
        id: "short",
        text: "2-3 дня (выходные)",
        icon: "⏰",
        weight: { minimal: 3, medium: 1, comfort: 0, maximum: 0 },
      },
      {
        id: "medium",
        text: "4-6 дней",
        icon: "📅",
        weight: { minimal: 1, medium: 3, comfort: 2, maximum: 1 },
      },
      {
        id: "long",
        text: "Неделя и больше",
        icon: "🗓️",
        weight: { minimal: 0, medium: 1, comfort: 3, maximum: 3 },
      },
    ],
  },
  {
    id: "activities",
    question: "Какие активности вас больше привлекают?",
    options: [
      {
        id: "relaxation",
        text: "Отдых и расслабление",
        icon: "🧘",
        weight: { minimal: 2, medium: 3, comfort: 2, maximum: 1 },
      },
      {
        id: "nature",
        text: "Активности на природе",
        icon: "🥾",
        weight: { minimal: 1, medium: 2, comfort: 3, maximum: 2 },
      },
      {
        id: "luxury",
        text: "Комфорт и спа-процедуры",
        icon: "✨",
        weight: { minimal: 0, medium: 1, comfort: 2, maximum: 3 },
      },
    ],
  },
  {
    id: "budget",
    question: "Какой бюджет вы рассматриваете?",
    options: [
      {
        id: "budget",
        text: "До 50 000 ₽",
        icon: "💰",
        weight: { minimal: 3, medium: 2, comfort: 0, maximum: 0 },
      },
      {
        id: "medium-budget",
        text: "50-80 000 ₽",
        icon: "💳",
        weight: { minimal: 1, medium: 3, comfort: 3, maximum: 1 },
      },
      {
        id: "premium",
        text: "80 000+ ₽",
        icon: "💎",
        weight: { minimal: 0, medium: 1, comfort: 2, maximum: 3 },
      },
    ],
  },
  {
    id: "group-size",
    question: "Предпочитаемый размер группы?",
    options: [
      {
        id: "intimate",
        text: "Очень камерно (2-3 человека)",
        icon: "👥",
        weight: { minimal: 2, medium: 3, comfort: 2, maximum: 3 },
      },
      {
        id: "small",
        text: "Небольшая группа (4-5 человек)",
        icon: "👨‍👩‍👧‍👦",
        weight: { minimal: 3, medium: 2, comfort: 3, maximum: 2 },
      },
    ],
  },
]

export function PackageQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      calculateResult()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const calculateResult = () => {
    const scores = {
      minimal: 0,
      medium: 0,
      comfort: 0,
      maximum: 0,
    }

    // Подсчитываем баллы для каждого пакета
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find((q) => q.id === questionId)
      const option = question?.options.find((o) => o.id === answerId)

      if (option) {
        scores.minimal += option.weight.minimal
        scores.medium += option.weight.medium
        scores.comfort += option.weight.comfort
        scores.maximum += option.weight.maximum
      }
    })

    // Находим пакет с максимальным баллом
    const maxScore = Math.max(...Object.values(scores))
    const recommendedPackage = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0]

    const packageNames = {
      minimal: "Минимальный",
      medium: "Средний",
      comfort: "Комфортный",
      maximum: "Максимальный",
    }

    const packageReasons = {
      minimal: [
        "Идеально для первого знакомства с ретритами",
        "Оптимальная продолжительность для начинающих",
        "Доступная стоимость без потери качества",
      ],
      medium: [
        "Сбалансированное сочетание отдыха и активностей",
        "Достаточно времени для глубокой перезагрузки",
        "Оптимальное соотношение цены и качества",
      ],
      comfort: [
        "Полное погружение в природу и себя",
        "Разнообразие активностей и процедур",
        "Комфортные условия для длительного отдыха",
      ],
      maximum: [
        "Максимальный уровень сервиса и комфорта",
        "Индивидуальный подход и персональный гид",
        "Эксклюзивные процедуры и активности",
      ],
    }

    const activities = {
      minimal: ["Баня", "Прогулки по лесу", "Медитации у озера"],
      medium: ["Экотуры", "Ароматерапия", "Рыбалка", "Сбор ягод"],
      comfort: ["Спа-процедуры", "Индивидуальные экскурсии", "Мастер-классы"],
      maximum: ["Персональный коуч", "VIP-процедуры", "Эксклюзивные локации"],
    }

    setResult({
      packageName: packageNames[recommendedPackage as keyof typeof packageNames] || "Средний",
      score: maxScore,
      reasons: packageReasons[recommendedPackage as keyof typeof packageReasons] || packageReasons.medium,
      activities: activities[recommendedPackage as keyof typeof activities] || activities.medium,
      dietaryNeeds: [], // Будет заполнено в отдельном компоненте
    })

    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setResult(null)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResult && result) {
    return (
      <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-forest-500 to-amber-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl bg-gradient-to-r from-forest-400 to-amber-400 bg-clip-text text-transparent">
            Ваш идеальный пакет
          </CardTitle>
          <CardDescription className="text-stone-300 text-lg">
            На основе ваших ответов мы подобрали лучший вариант
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <Badge className="text-2xl py-3 px-6 bg-gradient-to-r from-forest-600 to-forest-700 text-white mb-4">
              {result.packageName}
            </Badge>
          </div>

          <div>
            <h4 className="font-semibold text-forest-400 mb-3 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Почему этот пакет идеален для вас:
            </h4>
            <ul className="space-y-2">
              {result.reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-2 text-stone-300">
                  <span className="text-forest-400 mt-1">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-forest-400 mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Рекомендуемые активности:
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.activities.map((activity, index) => (
                <Badge key={index} variant="outline" className="border-forest-600/30 text-forest-300">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="flex-1 border-forest-600/50 text-forest-300 hover:bg-forest-800/30"
            >
              Пройти заново
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white"
              onClick={() => {
                // Здесь можно открыть модальное окно бронирования с выбранным пакетом
                console.log("Booking package:", result.packageName)
              }}
            >
              Забронировать пакет
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const question = quizQuestions[currentQuestion]
  const selectedAnswer = answers[question.id]

  return (
    <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="border-forest-600/30 text-forest-400">
            Вопрос {currentQuestion + 1} из {quizQuestions.length}
          </Badge>
          <div className="text-sm text-stone-400">{Math.round(progress)}%</div>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-xl sm:text-2xl text-stone-100">{question.question}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(question.id, option.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                selectedAnswer === option.id
                  ? "border-forest-500 bg-forest-800/30 shadow-lg"
                  : "border-forest-700/30 bg-forest-900/20 hover:border-forest-600/50 hover:bg-forest-800/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{option.icon}</span>
                <span className="text-stone-200 font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-forest-600/50 text-forest-300 hover:bg-forest-800/30 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswer}
            className="bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white disabled:opacity-50"
          >
            {currentQuestion === quizQuestions.length - 1 ? "Получить результат" : "Далее"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
