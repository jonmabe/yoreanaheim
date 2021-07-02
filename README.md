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

heroku run --app yoreanaheim npm run build
heroku run --app yoreanaheim bash

node util/app.js anaheim-gazette && node util/app.js anaheim-bulletin && node util/app.js oc-plain-dealer && node util/app.js anaheim-daily-herald

$env:FTP_HOST="media.yoreanaheim.com"
$env:FTP_USERNAME=""
$env:FTP_PASSWORD=""


### Add new editions
on local
```
heroku run bash
cd utils
node app.js anaheim-gazette
```

### Update edition pages
ssh to media server and make sure bash is running python2.7 and dependencies are installed.
```
cd pdf-page-counter
python counter.py
```
