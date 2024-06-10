import { FC, useState } from "react";
import { Field, Form, FormProps } from "react-final-form";

import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { GameEvent } from "../../typings/event";
import { bevis } from "../../utils/bevis";
import { EventSelect } from "../EventSelect";
import { EventsActionsSelect } from "../EventsActionsSelect";
import { RangeFieldset } from "../RangeFieldset";
import s from "./styles.module.css";

const b = bevis(s, "EventForm");

type EventFormProps = {
  events: GameEvent[];
  initValues?: GameEvent;
  onSave: (values: GameEvent) => void;
};

export const EventForm: FC<EventFormProps> = ({ events, onSave }) => {
  const [visibleAction, setVisibleAction] = useState(0);

  const onSubmit: FormProps["onSubmit"] = (values) => {
    console.log("save", values);
    onSave(values as GameEvent);
  };

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className={b()}>
          <label>
            Название события
            <Field name="title" component="input" type="text" />
          </label>

          <label>
            Описание события
            <Field name="description" component="textarea" />
          </label>

          <label>
            <fieldset>
              <legend>Зависимости</legend>

              <RangeFieldset
                name="dependencies.timeRange"
                label="Временной диапазон"
              />

              <RangeFieldset
                name="dependencies.state.group1"
                label="Влияние группы 1"
              />

              <RangeFieldset
                name="dependencies.state.group2"
                label="Влияние группы 2"
              />

              <EventSelect
                events={events}
                form={form}
                name="dependencies.events.required"
                label="Обязательные события"
              />

              <EventSelect
                events={events}
                form={form}
                name="dependencies.events.blocking"
                label="Блокирующие события"
              />

              <EventsActionsSelect
                events={events}
                form={form}
                name="dependencies.actions.required"
                label="Обязательные действия"
              />

              <EventsActionsSelect
                events={events}
                form={form}
                name="dependencies.actions.blocking"
                label="Блокирующие действия"
              />
            </fieldset>
          </label>

          <fieldset>
            <legend>Действия</legend>

            <FieldArray name="action">
              {({ fields }) => {
                return (
                  <>
                    {fields.map((field, index) => {
                      return (
                        <div
                          key={field}
                          className={b("Action", {
                            active: index === visibleAction,
                          })}
                        >
                          <label>
                            Название действия
                            <Field
                              key={field}
                              name={`${field}.title`}
                              component="input"
                              type="text"
                            />
                          </label>

                          <label>
                            Описание действия
                            <Field
                              key={field}
                              name={`${field}.description`}
                              component="textarea"
                            />
                          </label>

                          <fieldset className={b("ActionsChange")}>
                            <legend>Изменения</legend>

                            <label>
                              Группа 1
                              <Field
                                key={field}
                                name={`${field}.changes.group1`}
                                component="input"
                                type="number"
                                defaultValue={0}
                              />
                            </label>

                            <label>
                              Группа 2
                              <Field
                                key={field}
                                name={`${field}.changes.group2`}
                                component="input"
                                type="number"
                                defaultValue={0}
                              />
                            </label>
                          </fieldset>

                          <button
                            type="button"
                            onClick={() => {
                              fields.remove(index);

                              if (visibleAction < (fields.length ?? 0) - 1)
                                return;

                              setVisibleAction(0);
                            }}
                          >
                            Удалить действие
                          </button>
                        </div>
                      );
                    })}

                    <div>
                      {fields.map((field, index) => (
                        <button
                          type="button"
                          key={field}
                          onClick={() => setVisibleAction(index)}
                          className={b("ActionЛSelectButton", {
                            active: index === visibleAction,
                          })}
                        >
                          {index}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        fields.push(undefined);
                        setVisibleAction(fields.length ?? 0);
                      }}
                    >
                      Добавить действие
                    </button>
                  </>
                );
              }}
            </FieldArray>
          </fieldset>

          <button type="submit">Сохранить</button>
        </form>
      )}
    />
  );
};
