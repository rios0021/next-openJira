# Next.js OpenJira
To run locally, the database is needed.

```
docker-compose up -d
```
* The -d means __detached__

Mongo db local URL
```
mongodb://localhost:27017/entriesDB
```

## Configure environment variables
Rename the file __.env.template__ to __.env__

## Fill the database with testing data
Call 
```
http://localhost:3000/api/seed
```