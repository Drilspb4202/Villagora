"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, CheckCircle, Clock, Heart, Backpack, Book, Smartphone, Download, Share2 } from "lucide-react"

interface PreparationTask {
  id: string
  title: string
  description: string
  category: "physical" | "mental" | "practical" | "spiritual"
  timeframe: string
  difficulty: "easy" | "medium" | "hard"
  completed: boolean
}

interface PreparationWeek {
  week: number
  title: string
  focus: string
  tasks: PreparationTask[]
}

const preparationPlan: PreparationWeek[] = [
  {
    week: 4,
    title: "Подготовка к путешествию",
    focus: "Практические вопросы и планирование",
    tasks: [
      {
        id: "booking",
        title: "Подтвердить бронирование",
        description: "Связаться с организаторами и уточнить детали",
        category: "practical",
        timeframe: "За 4 недели",
        difficulty: "easy",
        completed: false,
      },
      {
        id: "transport",
        title: "Организовать транспорт",
        description: "Забронировать билеты или договориться о трансфере",
        category: "practical",
        timeframe: "За 4 недели",
        difficulty: "easy",
        completed: false,
      },
      {
        id: "gear-list",
        title: "Составить список вещей",
        description: "Подготовить список необходимых вещей для ретрита",
        category: "practical",
        timeframe: "За 4 недели",
        difficulty: "easy",
        completed: false,
      },
    ],
  },
  {
    week: 3,
    title: "Физическая подготовка",
    focus: "Подготовка тела к активностям на природе",
    tasks: [
      {
        id: "walking",
        title: "Ежедневные прогулки",
        description: "30-45 минут прогулок на свежем воздухе каждый день",
        category: "physical",
        timeframe: "За 3 недели",
        difficulty: "easy",
        completed: false,
      },
      {
        id: "stretching",
        title: "Растяжка и йога",
        description: "15-20 минут растяжки или простых асан йоги",
        category: "physical",
        timeframe: "За 3 недели",
        difficulty: "medium",
        completed: false,
      },
      {
        id: "sleep-schedule",
        title: "Нормализовать сон",
        description: "Ложиться спать до 23:00, просыпаться в 7:00",
        category: "physical",
        timeframe: "За 3 недели",
        difficulty: "medium",
        completed: false,
      },
    ],
  },
  {
    week: 2,
    title: "Ментальная подготовка",
    focus: "Настройка на внутреннюю работу и отдых",
    tasks: [
      {
        id: "meditation",
        title: "Практика медитации",
        description: "10-15 минут медитации или дыхательных практик",
        category: "mental",
        timeframe: "За 2 недели",
        difficulty: "medium",
        completed: false,
      },
      {
        id: "journaling",
        title: "Ведение дневника",
        description: "Записывать мысли, ожидания и цели от ретрита",
        category: "mental",
        timeframe: "За 2 недели",
        difficulty: "easy",
        completed: false,
      },
      {
        id: "digital-detox",
        title: "Цифровой детокс",
        description: "Ограничить время в соцсетях и новостях",
        category: "mental",
        timeframe: "За 2 недели",
        difficulty: "hard",
        completed: false,
      },
    ],
  },
  {
    week: 1,
    title: "Финальная подготовка",
    focus: "Последние приготовления и настройка",
    tasks: [
      {
        id: "packing",
        title: "Собрать вещи",
        description: "Упаковать все необходимое согласно списку",
        category: "practical",
        timeframe: "За 1 неделю",
        difficulty: "easy",
        completed: false,
      },
      {
        id: "intentions",
        title: "Сформулировать намерения",
        description: "Четко определить, что хотите получить от ретрита",
        category: "spiritual",
        timeframe: "За 1 неделю",
        difficulty: "medium",
        completed: false,
      },
      {
        id: "contacts",
        title: "Уведомить близких",
        description: "Сообщить семье и друзьям о планах и контактах",
        category: "practical",
        timeframe: "За 1 неделю",
        difficulty: "easy",
        completed: false,
      },
    ],
  },
]

const categoryIcons = {
  physical: <Heart className="h-4 w-4" />,
  mental: <Book className="h-4 w-4" />,
  practical: <Backpack className="h-4 w-4" />,
  spiritual: <Calendar className="h-4 w-4" />,
}

const categoryColors = {
  physical: "from-red-500 to-red-600",
  mental: "from-blue-500 to-blue-600",
  practical: "from-green-500 to-green-600",
  spiritual: "from-purple-500 to-purple-600",
}

const difficultyColors = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
}

export function PreparationPlan() {
  const [tasks, setTasks] = useState<PreparationTask[]>(preparationPlan.flatMap((week) => week.tasks))
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null)

  const toggleTask = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progress = (completedTasks / totalTasks) * 100

  const exportPlan = () => {
    const planText = preparationPlan
      .map(
        (week) =>
          `${week.title}\n${week.focus}\n\n${week.tasks
            .map((task) => `□ ${task.title}\n  ${task.description}\n`)
            .join("\n")}\n`,
      )
      .join("\n")

    const blob = new Blob([planText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "retreat-preparation-plan.txt"
    a.click()
  }

  return (
    <div className="space-y-6">
      <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-forest-500 to-amber-500 w-12 h-12 rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-stone-100">План подготовки к ретриту</CardTitle>
                <p className="text-stone-400">Пошаговая подготовка за 4 недели</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportPlan}
                className="border-forest-600/50 text-forest-300 hover:bg-forest-800/30"
              >
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-forest-600/50 text-forest-300 hover:bg-forest-800/30"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-stone-300">Общий прогресс</span>
              <span className="text-forest-400 font-semibold">
                {completedTasks} из {totalTasks} задач
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex gap-2 text-sm text-stone-400">
              <span>🎯 Готовность: {Math.round(progress)}%</span>
              {progress >= 75 && <span>🌟 Отличная подготовка!</span>}
              {progress >= 50 && progress < 75 && <span>👍 Хорошо идете!</span>}
              {progress < 50 && <span>💪 Продолжайте!</span>}
            </div>
          </div>

          <div className="grid gap-4">
            {preparationPlan.map((week) => {
              const weekTasks = tasks.filter((task) => week.tasks.some((weekTask) => weekTask.id === task.id))
              const weekCompleted = weekTasks.filter((task) => task.completed).length
              const weekProgress = (weekCompleted / weekTasks.length) * 100

              return (
                <Card
                  key={week.week}
                  className={`bg-forest-800/20 border-forest-600/30 cursor-pointer transition-all duration-300 hover:bg-forest-700/30 ${
                    selectedWeek === week.week ? "ring-2 ring-forest-500" : ""
                  }`}
                  onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-stone-100 flex items-center gap-2">
                          <Clock className="h-5 w-5 text-forest-400" />
                          {week.title}
                        </CardTitle>
                        <p className="text-stone-400 text-sm mt-1">{week.focus}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={`border-forest-600/30 ${
                            weekProgress === 100 ? "text-green-400" : "text-forest-400"
                          }`}
                        >
                          {weekCompleted}/{weekTasks.length}
                        </Badge>
                        {weekProgress === 100 && <CheckCircle className="h-5 w-5 text-green-400 mt-1 ml-auto" />}
                      </div>
                    </div>
                    <Progress value={weekProgress} className="mt-2" />
                  </CardHeader>

                  {selectedWeek === week.week && (
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {week.tasks.map((weekTask) => {
                          const task = tasks.find((t) => t.id === weekTask.id)!
                          return (
                            <div
                              key={task.id}
                              className={`flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 ${
                                task.completed
                                  ? "bg-forest-700/20 border-forest-600/30"
                                  : "bg-forest-800/20 border-forest-700/30 hover:bg-forest-700/30"
                              }`}
                            >
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task.id)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <div
                                    className={`bg-gradient-to-r ${categoryColors[task.category]} w-6 h-6 rounded-lg flex items-center justify-center`}
                                  >
                                    <div className="text-white text-xs">{categoryIcons[task.category]}</div>
                                  </div>
                                  <h4
                                    className={`font-medium ${
                                      task.completed ? "text-stone-400 line-through" : "text-stone-200"
                                    }`}
                                  >
                                    {task.title}
                                  </h4>
                                  <Badge
                                    variant="outline"
                                    className={`text-xs border-forest-600/30 ${difficultyColors[task.difficulty]}`}
                                  >
                                    {task.difficulty}
                                  </Badge>
                                </div>
                                <p className={`text-sm ${task.completed ? "text-stone-500" : "text-stone-400"}`}>
                                  {task.description}
                                </p>
                                <p className="text-xs text-forest-400 mt-1">{task.timeframe}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  )}
                </Card>
              )
            })}
          </div>

          <div className="bg-forest-800/20 rounded-lg p-4 border border-forest-600/30">
            <h4 className="font-semibold text-forest-400 mb-2 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Полезные приложения для подготовки:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              <Badge variant="outline" className="border-forest-600/30 text-forest-300 justify-center">
                Headspace
              </Badge>
              <Badge variant="outline" className="border-forest-600/30 text-forest-300 justify-center">
                Calm
              </Badge>
              <Badge variant="outline" className="border-forest-600/30 text-forest-300 justify-center">
                Forest
              </Badge>
              <Badge variant="outline" className="border-forest-600/30 text-forest-300 justify-center">
                Sleep Cycle
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
