import { FormApi } from "final-form";
import { FC } from "react";
import { GameEvent } from "../../typings/event";
import { bevis } from "../../utils/bevis";
import { EventSelect } from "../EventSelect";
import { EventsActionsSelect } from "../EventsActionsSelect";
import { RangeFieldset } from "../RangeFieldset";
import s from "./DependenciesFormFields.module.css";

const b = bevis(s, "DependenciesFormFields");

export type DependenciesFormFieldsProps = {
  events: GameEvent[];
  name: string;
  form: FormApi;
};

export const DependenciesFormFields: FC<DependenciesFormFieldsProps> = ({
  name,
  events,
  form,
}) => {
  return (
    <fieldset className={b()}>
      <legend>Зависимости</legend>

      <summary className={b("summary")}>
        <details>
          <div className={b("details")}>
            <RangeFieldset
              name={`${name}.timeRange`}
              label="Временной диапазон"
            />

            <RangeFieldset
              name={`${name}.state.group1`}
              label="Влияние группы 1"
            />

            <RangeFieldset
              name={`${name}.state.group2`}
              label="Влияние группы 2"
            />

            <EventSelect
              events={events}
              form={form}
              name={`${name}.events.required`}
              label="Обязательные события"
            />

            <EventSelect
              events={events}
              form={form}
              name={`${name}.events.blocking`}
              label="Блокирующие события"
            />

            <EventsActionsSelect
              events={events}
              form={form}
              name={`${name}.actions.required`}
              label="Обязательные действия"
            />

            <EventsActionsSelect
              events={events}
              form={form}
              name={`${name}.actions.blocking`}
              label="Блокирующие действия"
            />
          </div>
        </details>
      </summary>
    </fieldset>
  );
};
