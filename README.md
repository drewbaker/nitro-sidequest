# README

This is a demo of how to use Sidequest.js with Nitro.

# ENV vars

## Install & Run

Make sure to use Node version 24+.

```
npm install

npm run dev
```

## Demo job

### 1) Schedule a job

Do a POST to `/templates` with body containing a made up ID, like `{"id": 123}`

### 2) Check job in Sidequest Dashboard

A Sidequest job will have been scheduled, that will do a fetch to `/templates/:id/refresh` and should log the ID in the Sidequest dashboard found at: `/admin`