import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

export const useGame = () => {
    return useContext(GameContext);
};