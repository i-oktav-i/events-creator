import { FC } from "react";
import { Form, FormProps } from "react-final-form";

import arrayMutators from "final-form-arrays";

import { GameEvent, GameEventType } from "../../typings/event";
import { ActionFormFields } from "../ActionFormFields";
import { DependenciesFormFields } from "../DependenciesFormFields";
import { InputField } from "../InputField";

import { SelectField } from "../SelectField";
import { CheckboxField } from "../CheckboxField";

import * as s from "./EventForm.css";

type EventFormProps = {
  events: GameEvent[];
  initValues?: GameEvent;
  onSave: (values: GameEvent) => void;
  onAbort: () => void;
};

const eventTypeOptions: {
  [T in GameEventType]: { value: T; label: string };
}[GameEventType][] = [
  {
    label: "Недельное",
    value: "weekly",
  },
  {
    label: "Выходное",
    value: "weekend",
  },
];

export const EventForm: FC<EventFormProps> = ({
  events,
  onSave,
  onAbort,
  initValues,
}) => {
  const onSubmit: FormProps["onSubmit"] = (values) => {
    onSave(values as GameEvent);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initValues}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className={s.eventForm}>
          <div className={s.eventFormFields}>
            <InputField name="title" label="Название события" required />

            <InputField
              name="description"
              label="Описание события"
              asTextArea
              required
            />

            <SelectField
              name="type"
              label="Тип события"
              options={eventTypeOptions}
            />

            <CheckboxField
              label="Запустить как станет возможно"
              name="fireIfPossible"
            />

            <DependenciesFormFields
              events={events}
              form={form}
              name="dependencies"
            />

            <ActionFormFields name="actions" events={events} form={form} />
          </div>

          <div className={s.eventFormButtons}>
            <button type="submit">Сохранить</button>

            <button type="button" onClick={form.reset}>
              Сбросить
            </button>

            <button type="button" onClick={onAbort}>
              Отмена
            </button>
          </div>
        </form>
      )}
    />
  );
};
