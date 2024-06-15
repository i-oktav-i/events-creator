import { FC } from "react";
import { Form, FormProps } from "react-final-form";

import arrayMutators from "final-form-arrays";
import { GameEvent } from "../../typings/event";
import { bevis } from "../../utils/bevis";
import { ActionFormFields } from "../ActionFormFields";
import { DependenciesFormFields } from "../DependenciesFormFields";
import { InputField } from "../InputField";
import s from "./styles.module.css";

const b = bevis(s, "EventForm");

type EventFormProps = {
  events: GameEvent[];
  initValues?: GameEvent;
  onSave: (values: GameEvent) => void;
  onAbort: () => void;
};

export const EventForm: FC<EventFormProps> = ({
  events,
  onSave,
  onAbort,
  initValues,
}) => {
  const onSubmit: FormProps["onSubmit"] = (values) => {
    console.log("save", values);
    onSave(values as GameEvent);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initValues}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} className={b()}>
          <div className={b("Fields")}>
            <InputField name="title" label="Название события" required />
            <InputField
              name="description"
              label="Описание события"
              asTextArea
              required
            />

            <DependenciesFormFields
              events={events}
              form={form}
              name="dependencies"
            />

            <ActionFormFields name="actions" events={events} form={form} />
          </div>

          <div className={b("Buttons")}>
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
