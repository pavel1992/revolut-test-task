## How to launch

1) ### `npm i`
2) ### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How to launch tests
### `npm test`

Launches the test runner in the interactive watch mode.<br />

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
