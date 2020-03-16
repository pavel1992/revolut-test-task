## How to launch

1) ### `npm i`
2) ### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to launch tests
### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm lint`

Launches TSlint<br />

## Task

Task was to recreate exchange money page from revolute app.
For test task it includes currency polling for every 10 seconds and 3 user wallets to exchange money across them

#### Technology pick
1. React
2. Redux
3. Redux-thunk for async actions handling. I think using sagas or something else is 
an overhead for 1 async call.
3. Typescript as type control system
4. Styled components as component styling system
5. Typescript-fsa and its helpers for action creator factories and reducers. It's just well-known for me library,
which provides type-safely action creators even for async actions, and reducers. 
6. Jest with Enzyme for testing
7. Atomic design as components structuring pattern

#### Things to improve / TODO
Add user wallets management(creating/deleting). It could be easily done because of user wallets reducer model.
Make real pages for no wallets/no currencies scenarios.


#### Input restrictions
1. User can't start input from `.` or `,`.It is easy to support, but I don't think it is necessary.
2. User can not buy or sell less than 0.1 in currency. It's used to avoid exchange bug with loosing precision in cause of
rounding to 2 decimal numbers. For example, if we have exchange rate 1GBP = 1.1USD, than 0.01GBP = 0.011 USD, which will be
rounded to 0.01 USD, so user will loose cents on every exchange.
