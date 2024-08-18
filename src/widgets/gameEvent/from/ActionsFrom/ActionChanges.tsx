import _get from 'lodash/get';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GameEventActionChanges,
  UnknownGameEvent,
  dependenciesStateLabels,
} from '@entities/gameEvent';
import { UnionToTuple } from '@shared/typings';
import { NumberInput } from '@shared/ui';

import { ActionFractionsStateChanges } from './ActionFractionsStateChanges';
import { gameStateChangesContainer } from './ActionsFrom.css';

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
  } = useFormContext<UnknownGameEvent>();

  const changesErrors = _get(errors, name);

  return (
    <fieldset>
      <legend>Action Changes</legend>

      <summary>
        <details>
          <div className={gameStateChangesContainer}>
            {changesOrder.map((key) => (
              <fieldset key={key}>
                <NumberInput
                  {...register(`${name}.${key}`)}
                  label={dependenciesStateLabels[key]}
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
