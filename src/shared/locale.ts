import { Dependencies, Fraction } from '@entities/gameEvent';
import { objectEntries } from './lib';
import { objectFromEntries } from './lib/object';

type Locale = { [x: string]: string | Locale };

const fractionsLocale: Record<Fraction, string> = {
  // legal
  equalityAndBrotherhood: 'Равенство и Братство',
  honorAndConscience: 'Честь и Совесть',
  // illegal normal
  revolutionaryAvantGarde: 'Революционный Авангард',
  powerOfTradition: 'Сила Традиции',
  truthInWealth: 'Правда в Богатстве',
  // illegal strange
  woodenStick: 'Деревянная палка',
  pathToThePeak: 'Путь к вершине',
  redWater: 'Красная вода',
};

export const locale = {
  header: {
    gameEvents: 'Список игровых событий',
    graph: 'Граф игровых событий',
  },
  fractions: {
    ...fractionsLocale,
    shortage: {
      // legal
      equalityAndBrotherhood: 'РВ',
      honorAndConscience: 'ЧС',
      // illegal normal
      revolutionaryAvantGarde: 'РА',
      powerOfTradition: 'СТ',
      truthInWealth: 'ПБ',
      // illegal strange
      woodenStick: 'ДП',
      pathToThePeak: 'ПВ',
      redWater: 'КВ',
    },
  },
  appTheme: {
    mode: {
      auto: 'Автоматическая',
      dark: 'Темная',
      light: 'Светлая',
    },
  },
  gameEvents: {
    import: 'Загрузить игровые события с устройства',
    export: 'Сохранить игровые события',
    merge: 'Объединить игровые события',
    createNew: 'Создать новое игровое событие',
    deleteModal: {
      title: 'Удалить событие?',
      submit: 'Да',
      abort: 'Нет',
    },
    search: {
      placeholder: 'Поиск',
      empty: 'Нет совпадений',
    },
    gameEventSelect: {
      title: {
        multi: 'Выбор событий',
        single: 'Выбор события',
      },
      confirm: 'Подтвердить выбор',
      empty: 'Нет выбранных игровых событий',
    },
    gameEventActionSelect: {
      title: {
        multi: 'Выбор действий',
        single: 'Выбор действия',
      },
      confirm: 'Подтвердить выбор',
      empty: 'Нет выбранных действий',
    },
    from: {
      title: 'Название события',
      description: 'Описание события',
      eventType: {
        title: 'Тип игрового события',
        weekly: 'Недельное событие',
        weekend: 'Выходное событие',
        fullWeek: 'Всенедельное событие',
        chain: 'Цепочное событие',
      },
      triggerProbability: 'Вероятность срабатывания',
      checksAttempts: 'Количество попыток запустить событие',
      allowOverStack: 'Разрешить переполнение',
      isCutscene: 'Событие является кат-сценой',
    },
    dependencies: {
      title: 'Зависимости',
      events: {
        required: 'Обязательные события',
        blocking: 'Блокирующие события',
      },
      actions: {
        required: 'Обязательные действия',
        blocking: 'Блокирующие действия',
      },
      state: {
        title: 'Игровое состояние',
        ...objectFromEntries(
          objectEntries(fractionsLocale).map(
            ([key, value]) => [`${key}Reputation`, `Репутация у фракции "${value}"`] as const,
          ),
        ),
        week: 'Номер недели',
        fractionsState: {
          title: 'Влияние фракций',
          legal: 'Влияние легальных фракций',
          illegal: {
            title: 'Влияние нелегальных фракций',
            normal: 'Влияние нелегальных адекватных фракций',
            strange: 'Влияние нелегальных неадекватных фракций',
          },
        },
        money: 'Количество денег',
        policeAttention: 'Внимание полиции',
        publishingHouseReputation: 'Репутация издательства',
      },
      ids: {
        title: {
          events: 'ID игровых событий',
          actions: 'ID действий',
        },
        dependencyType: {
          title: 'Тип зависимости',
          all: 'Каждое из писка',
          any: 'Любое из писка',
        },
        actions: {
          remove: 'Удалить',
          addId: 'Добавить ID',
          addNested: 'Добавить вложенную группу',
        },
      },
    },
    actions: {
      title: 'Действия',
      form: {
        title: 'Название действия',
        description: 'Описание действия',
        changes: 'Изменения после действия',
        chainedEvent: {
          title: 'Связанное событие',
          select: 'Выбрать',
          remove: 'Удалить связь',
        },
        actions: {
          add: 'Добавить действие',
          remove: 'Удалить текущее действие',
        },
      },
    },
    graph: {
      event: 'Игровое событие',
      probability: 'Вероятность',
    },
  },
  forms: {
    required: 'Обязательное поле',
    min: 'Минимум',
    max: 'Максимум',
    actions: {
      submit: 'Сохранить',
      reset: 'Сбросить',
      abort: 'Отменить',
      remove: 'Удалить',
    },
  },
  range: {
    start: 'Начало',
    end: 'Конец',
  },
} satisfies Locale & {
  fractions: Record<Fraction, string> & { shortage: Record<Fraction, string> };
  gameEvents: Locale & {
    dependencies: Locale & {
      state: Locale & Record<keyof NonNullable<Dependencies['state']>, string | Locale>;
    };
  };
};
