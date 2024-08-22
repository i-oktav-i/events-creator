import _get from 'lodash/get';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { GameEvent, GameEventActionChanges } from '@entities/gameEvent';
import { locale as fullLocale } from '@shared/locale';
import { UnionToTuple } from '@shared/typings';
import { NumberInput } from '@shared/ui';

import { ActionFractionsStateChanges } from './ActionFractionsStateChanges';
import { gameStateChangesContainer } from './ActionsFrom.css';

const locale = fullLocale.gameEvents.actions;
const dependenciesLocale = fullLocale.gameEvents.dependencies;

export type ActionChangesProps = {
  name: `actions.${number}.changes`;
};

const changesOrder: UnionToTuple<Exclude<keyof GameEventActionChanges, 'fractionsState'>> = [
  'equalityAndBrotherhoodReputation',
  'honorAndConscienceReputation',
  'revolutionaryAvantGardeReputation',
  'powerOfTraditionReputation',
  'truthInWealthReputation',
  'woodenStickReputation',
  'pathToThePeakReputation',
  'redWaterReputation',
  'publishingHouseReputation',
  'money',
  'policeAttention',
];

export const ActionChanges: FC<ActionChangesProps> = ({ name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<GameEvent>();

  const changesErrors = _get(errors, name);

  return (
    <fieldset>
      <legend>{locale.form.changes}</legend>

      <summary>
        <details>
          <div className={gameStateChangesContainer}>
            {changesOrder.map((key) => (
              <fieldset key={key}>
                <NumberInput
                  {...register(`${name}.${key}`)}
                  label={dependenciesLocale.state[key]}
                  error={changesErrors?.[key]}
                />
              </fieldset>
            ))}
          </div>

          <ActionFractionsStateChanges name={`${name}.fractionsState`} />
        </details>
      </summary>
    </fieldset>
  );
};
