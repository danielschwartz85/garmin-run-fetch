# Garmin Run Fetch
#### Retrieves [Garmin Connect]((https://connect.garmin.com/signin/)) run activity data. 
#### Performes a one time login with [puppeteer]((https://developers.google.com/web/tools/puppeteer)) for the credentials which are then kept between runs and are updated only if needed.

<br/>

## Install
```
npm i garmin-run-fetch
```

### Option 1:  
Require module
```
const garminRunFetch = require('garmin-run-fetch');
const opts = {
    userName,
    password,
    limit,     // optional
    startDate, // optional
    endDate,   // optional
};
const activitiesJson = await garminRunFetch(opts);
```

### Option 2:  
Command line
```
GARMIN_USER_NAME=daniel@gmail.com GARMIN_PASSWORD=123456 npx garmin-run-fetch

// Output activity json to console ...
```

<br/>

## Params

| param | env var name | desc | default
| -- | ------------- | ------------- | -------- |
| userName | `GARMIN_USER_NAME`| Garmin connect user email | - |
| password | `GARMIN_PASSWORD` | Garmin connect user password | - |
| limit | `GARMIN_LIMIT` | number of activities to fetch | 20 |
| starDate | `GARMIN_START_DATE` | fetch activitiess only older than this value, a UNIX epoch number. | 0 |
| endDate | `GARMIN_END_DATE` | fetch activitiess only created before this value, a UNIX epoch number. | 0 |
| - |`GARMIN_RESULT_PATH` | (Optional) Set with result file path, if not given the result is printed to console. | - |
| - | [DEBUG](https://github.com/visionmedia/debug#readme) | (Optional) set as garmin:* for debugging | - |

<br/>

## Notes
* This app creates a `.cred.json` file with garmin credentials for avoiding a login with every run (the file can be deleted in between runs).
* The login is done with scrapping the [Garmin Connect](https://connect.garmin.com/signin/) web page by using [puppeteer](https://developers.google.com/web/tools/puppeteer).