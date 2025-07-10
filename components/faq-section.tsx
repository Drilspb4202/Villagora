import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <div className="w-full">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-stone-100 text-center">
        Часто задаваемые вопросы
      </h3>
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Как добраться до ретрита в Виллагоре?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p className="mb-2">Есть несколько способов добраться до деревни Виллагора:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Из Петрозаводска: примерно 45 км по трассе А-121</li>
              <li>Ближайшая ж/д станция: Пряжа (15 км)</li>
              <li>Для всех гостей включен трансфер от Петрозаводска или ж/д станции Пряжа</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Что входит в стоимость проживания?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p>В стоимость проживания включено:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Размещение в комфортабельном доме</li>
              <li>Трехразовое питание (карельская кухня с учетом ваших предпочтений)</li>
              <li>Трансфер от Петрозаводска и обратно</li>
              <li>Посещение бани</li>
              <li>Экскурсии по окрестностям (зависят от выбранного пакета)</li>
              <li>Дополнительные активности согласно выбранному пакету</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Какая погода в Карелии в июле?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p>
              В июле в Карелии обычно комфортная летняя погода. Средняя дневная температура составляет +18...+23°C, 
              ночная +12...+15°C. Возможны короткие дожди, поэтому рекомендуем взять с собой дождевик или зонт. 
              Для вечерних прогулок пригодится легкая куртка или свитер.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Есть ли Wi-Fi и мобильная связь?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p>
              В доме есть Wi-Fi, но скорость может быть ниже городской. Мобильная связь доступна для основных операторов (МТС, Билайн, МегаФон, Теле2), 
              однако в некоторых уголках территории сигнал может быть слабее. Один из плюсов ретрита — возможность отдохнуть от информационного шума и 
              побыть в гармонии с природой.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Могу ли я привезти с собой домашних животных?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p>
              Мы рассматриваем возможность размещения с небольшими домашними животными в индивидуальном порядке. 
              Пожалуйста, сообщите нам о своем питомце заранее, чтобы мы могли обсудить детали размещения. 
              Учтите, что на территории также могут быть другие гости, комфорт которых необходимо учитывать.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Что нужно взять с собой?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p className="mb-2">Рекомендуемый список вещей для комфортного отдыха:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Удобную одежду для прогулок по лесу</li>
              <li>Купальник/плавки для купания в озере и посещения бани</li>
              <li>Солнцезащитный крем и средства от комаров</li>
              <li>Удобную обувь для прогулок</li>
              <li>Личные медикаменты (если требуются)</li>
              <li>Фотоаппарат (по желанию)</li>
              <li>Личные принадлежности для гигиены</li>
            </ul>
            <p className="mt-2">Постельное белье, полотенца и банные принадлежности предоставляются.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-7" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Как происходит бронирование и оплата?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p className="mb-2">Процесс бронирования включает несколько шагов:</p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Свяжитесь с нами по телефону или через Telegram</li>
              <li>Обсудите детали поездки и выберите удобные даты</li>
              <li>Внесите предоплату 10 000 ₽ за человека для гарантированного бронирования</li>
              <li>Остаток суммы вы можете оплатить по прибытии</li>
            </ol>
            <p className="mt-2">В случае отмены бронирования за 7 дней до заезда предоплата возвращается в полном объеме.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-8" className="border-forest-700/30 bg-forest-900/30 backdrop-blur-sm rounded-xl px-4 sm:px-6">
          <AccordionTrigger className="text-left font-medium text-stone-100 hover:text-stone-200 hover:no-underline py-4">
            Можно ли приехать с детьми?
          </AccordionTrigger>
          <AccordionContent className="text-stone-300 pb-4">
            <p>
              Да, мы принимаем гостей с детьми. Для детей до 6 лет предоставляется скидка 50% от стоимости. 
              Однако обратите внимание, что программа ретрита ориентирована преимущественно на взрослых. 
              Если вы планируете приезд с детьми, сообщите нам заранее, чтобы мы могли подготовить для них специальные активности и обеспечить безопасность.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
