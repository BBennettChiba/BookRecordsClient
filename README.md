This was created during my time as a student at Code Chrysalis

A link here to the backend server

https://github.com/BBennettChiba/BookRecordsBackend

to start the server you must first make a postgres DATABASE and link it to the ormconfig.js file in the backend.
after installing the packages with npm install type npm run typeorm migration:run to setup the correct tables in your database.

Once that's all finished you can type npm run start to begin the server.

On the frontend client it's better to use Yarn because otherwise it won't work for me but type yarn install

type yarn build to build the client and enjoy

