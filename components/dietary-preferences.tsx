"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Utensils, Leaf, Wheat, Fish, Apple, AlertCircle } from "lucide-react"

interface DietaryOption {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
}

interface MenuSuggestion {
  meal: string
  dishes: string[]
  dietary: string[]
}

const dietaryOptions: DietaryOption[] = [
  {
    id: "vegetarian",
    name: "Вегетарианское",
    description: "Без мяса и рыбы",
    icon: <Leaf className="h-5 w-5" />,
    color: "from-green-500 to-green-600",
  },
  {
    id: "vegan",
    name: "Веганское",
    description: "Без продуктов животного происхождения",
    icon: <Apple className="h-5 w-5" />,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: "gluten-free",
    name: "Без глютена",
    description: "Исключает пшеницу, рожь, ячмень",
    icon: <Wheat className="h-5 w-5" />,
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "pescatarian",
    name: "Пескетарианское",
    description: "Рыба и морепродукты, без мяса",
    icon: <Fish className="h-5 w-5" />,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "lactose-free",
    name: "Без лактозы",
    description: "Исключает молочные продукты",
    icon: <AlertCircle className="h-5 w-5" />,
    color: "from-orange-500 to-orange-600",
  },
]

const menuSuggestions: Record<string, MenuSuggestion[]> = {
  vegetarian: [
    {
      meal: "Завтрак",
      dishes: ["Овсяная каша с лесными ягодами", "Творожные сырники", "Травяной чай"],
      dietary: ["vegetarian"],
    },
    {
      meal: "Обед",
      dishes: ["Грибной суп с перловкой", "Овощное рагу", "Карельские калитки"],
      dietary: ["vegetarian"],
    },
    {
      meal: "Ужин",
      dishes: ["Запеченные овощи с травами", "Гречневая каша", "Ягодный морс"],
      dietary: ["vegetarian"],
    },
  ],
  vegan: [
    {
      meal: "Завтрак",
      dishes: ["Овсянка на растительном молоке", "Авокадо-тост", "Зеленый смузи"],
      dietary: ["vegan"],
    },
    {
      meal: "Обед",
      dishes: ["Чечевичный суп", "Киноа с овощами", "Хумус с овощными палочками"],
      dietary: ["vegan"],
    },
    {
      meal: "Ужин",
      dishes: ["Тушеные овощи с нутом", "Бурый рис", "Компот из сухофруктов"],
      dietary: ["vegan"],
    },
  ],
  "gluten-free": [
    {
      meal: "Завтрак",
      dishes: ["Гречневая каша", "Омлет с овощами", "Безглютеновые оладьи"],
      dietary: ["gluten-free"],
    },
    {
      meal: "Обед",
      dishes: ["Рыбный суп", "Рис с овощами", "Салат из свежих овощей"],
      dietary: ["gluten-free"],
    },
    {
      meal: "Ужин",
      dishes: ["Запеченная рыба", "Картофель с травами", "Ягодный кисель"],
      dietary: ["gluten-free"],
    },
  ],
}

export function DietaryPreferences() {
  const [selectedDiets, setSelectedDiets] = useState<string[]>([])
  const [allergies, setAllergies] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [showMenu, setShowMenu] = useState(false)

  const handleDietChange = (dietId: string, checked: boolean) => {
    if (checked) {
      setSelectedDiets((prev) => [...prev, dietId])
    } else {
      setSelectedDiets((prev) => prev.filter((id) => id !== dietId))
    }
  }

  const generateMenu = () => {
    setShowMenu(true)
  }

  const getRelevantMenus = () => {
    const menus: MenuSuggestion[] = []
    selectedDiets.forEach((diet) => {
      if (menuSuggestions[diet]) {
        menus.push(...menuSuggestions[diet])
      }
    })
    return menus.length > 0 ? menus : menuSuggestions.vegetarian // Fallback
  }

  return (
    <div className="space-y-6">
      <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-forest-500 to-amber-500 w-12 h-12 rounded-xl flex items-center justify-center">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-stone-100">Питание по вашим потребностям</CardTitle>
              <p className="text-stone-400">Мы адаптируем меню под ваши предпочтения</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-forest-400 mb-4">Выберите ваши предпочтения:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dietaryOptions.map((option) => (
                <div key={option.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={selectedDiets.includes(option.id)}
                    onCheckedChange={(checked) => handleDietChange(option.id, checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={option.id}
                      className="flex items-center gap-2 cursor-pointer text-stone-200 hover:text-forest-300 transition-colors"
                    >
                      <div
                        className={`bg-gradient-to-r ${option.color} w-8 h-8 rounded-lg flex items-center justify-center`}
                      >
                        <div className="text-white">{option.icon}</div>
                      </div>
                      <div>
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-stone-400">{option.description}</div>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="allergies" className="text-stone-200 mb-2 block">
                Аллергии и непереносимости
              </Label>
              <Textarea
                id="allergies"
                placeholder="Укажите продукты, которые вам нельзя употреблять..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400"
              />
            </div>

            <div>
              <Label htmlFor="notes" className="text-stone-200 mb-2 block">
                Дополнительные пожелания
              </Label>
              <Textarea
                id="notes"
                placeholder="Любимые блюда, особые пожелания к приготовлению..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="bg-forest-800/30 border-forest-600/30 text-stone-100 placeholder:text-stone-400"
              />
            </div>
          </div>

          <Button
            onClick={generateMenu}
            className="w-full bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-500 hover:to-forest-600 text-white"
            disabled={selectedDiets.length === 0}
          >
            Посмотреть примерное меню
          </Button>
        </CardContent>
      </Card>

      {showMenu && (
        <Card className="bg-forest-900/30 backdrop-blur-sm border-forest-700/30 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-stone-100 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-forest-400" />
              Ваше персональное меню
            </CardTitle>
            <p className="text-stone-400">Примерное меню на один день с учетом ваших предпочтений</p>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {getRelevantMenus().map((menu, index) => (
                <div key={index} className="border-l-4 border-forest-500 pl-4">
                  <h4 className="font-semibold text-forest-400 mb-2">{menu.meal}</h4>
                  <div className="space-y-2">
                    {menu.dishes.map((dish, dishIndex) => (
                      <div key={dishIndex} className="flex items-center justify-between">
                        <span className="text-stone-300">{dish}</span>
                        <div className="flex gap-1">
                          {selectedDiets.map((diet) => {
                            const option = dietaryOptions.find((opt) => opt.id === diet)
                            return option ? (
                              <Badge
                                key={diet}
                                variant="outline"
                                className="border-forest-600/30 text-forest-400 text-xs"
                              >
                                {option.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-forest-800/20 rounded-lg border border-forest-600/30">
              <p className="text-sm text-stone-400 mb-2">
                <strong className="text-forest-400">Обратите внимание:</strong>
              </p>
              <ul className="text-xs text-stone-400 space-y-1">
                <li>• Меню адаптируется под сезонность продуктов</li>
                <li>• Используем только местные и экологически чистые продукты</li>
                <li>• Финальное меню согласовывается перед поездкой</li>
                <li>• Возможны изменения по медицинским показаниям</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
