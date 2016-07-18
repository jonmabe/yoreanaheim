# Yore Anaheim

## Development

Remember to set your db environment variable in dev, like so

### Windows
```
$env:DATABASE_URL="postgres://postgres:Postgres-1234@localhost:5432/gazetteer"
```

### Bash
```
export DATABASE_URL="postgres://postgresql:Postgres-1234@localhost:5432/gazetteer"
```


### Sequelize
To setup postgres for the first time, run:
```
sequelize db:migrate
sequelize db:seed:all
```