import React from 'react';
import { Provider } from 'react-redux'

import { AppContainer } from "../atoms/AppСontainer";
import { MoneyExchanger } from "../organisms/MoneyExchanger";
import { store } from "../store/store";

export const App = () => (
    <Provider store={store}>
        <AppContainer>
            <MoneyExchanger/>
        </AppContainer>
    </Provider>
);
