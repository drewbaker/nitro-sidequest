# README

This is a demo of how to use Sidequest.js with Nitro.

## Install

```
npm i
```



## Demo job

1)
Do a POST to `/templates` with body containing a made up  {"id": 123}

A Sidequest job will scheduled, that will do a fetch to `/templates/:id/refresh` and should log the ID in the Sidequest dashboard found at: `/admin`