import { useDispatch } from 'react-redux';
import { TAppDispatch } from '../types/store-types';
import { ActionCreatorsMapObject, bindActionCreators, AsyncThunk, ActionCreator } from '@reduxjs/toolkit';
import { useMemo } from 'react';

/* eslint-disable */
type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
  ? BoundAsyncThunk<Actions[key]>
  : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
  ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;
/* eslint-enable */

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  /* eslint-disable */
  return useMemo(() => bindActionCreators(actions, dispatch), []);
  /* eslint-enable */
};
