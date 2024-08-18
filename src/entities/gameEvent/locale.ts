import { Dependencies } from './types';

export const fractionsShortage = {
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
};

type StateKeys = Exclude<keyof NonNullable<Dependencies['state']>, 'fractionsState'>;

export const dependenciesStateLabels: Record<StateKeys, string> = {
  week: 'Week',
  money: 'Money',
  policeAttention: 'Police Attention',
  equalityAndBrotherhoodReputation: 'Equality and Brotherhood Reputation',
  honorAndConscienceReputation: 'Honor and Conscience Reputation',
  pathToThePeakReputation: 'Path to the Peak Reputation',
  publishingHouseReputation: 'Publishing House Reputation',
  powerOfTraditionReputation: 'Power of Tradition Reputation',
  redWaterReputation: 'Red Water Reputation',
  revolutionaryAvantGardeReputation: 'Revolutionary Avant-Garde Reputation',
  truthInWealthReputation: 'Truth in Wealth Reputation',
  woodenStickReputation: 'Wooden Stick Reputation',
};
