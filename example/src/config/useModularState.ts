import modx from 'react-modx'
import { useDependency } from 'react-di';

export const useModularState = () => {
    const store = useDependency("storeBontrack");
    const saga = useDependency("sagaBontrack");
    const modx = modx.config(store, saga);

    return modx.useModularState()
}

