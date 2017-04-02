# Yore Anaheim

## Development

Remember to set your db environment variable in dev, like so

### Set DATABASE_URL
Windows
```
$env:DATABASE_URL="postgres://postgres:Postgres-1234@localhost:5432/gazetteer"
```
Bash
```
export DATABASE_URL="postgres://postgresql:Postgres-1234@localhost:5432/gazetteer"
```

### Build Webpack
Bash
```
npm build
```
Windows
```
node_modules/.bin/webpack
```

### Start
Heroku
```
heroku local web
```
Vanilla
```
npm start
```
```
node_modules/.bin/webpack; npm start
```

### Sequelize
To setup postgres for the first time, run:
```
sequelize db:migrate
sequelize db:seed:all
```



heroku run --app yoreanaheim node util/app.js
heroku run --app yoreanaheim npm run build


$env:FTP_HOST="media.yoreanaheim.com"
$env:FTP_USERNAME=""
$env:FTP_PASSWORD=""
