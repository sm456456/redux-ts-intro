import axios from 'axios';
import { Dispatch } from 'react';
import { ActionType } from '../action-types/actionTypes';
import { Action } from '../actions';

export const searchRepositories = (term: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES,
        });

        try {
            const { data } = await axios.get(
                'https://api.npms.io/v2/search?q=react',
                {
                    params: {
                        text: term,
                    },
                }
            );

            const names = data.objects.map((result: any) => {
                return result.package.name;
            });

            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names,
            });
        } catch (err: any) {
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: err.message,
            });
        }
    };
};
