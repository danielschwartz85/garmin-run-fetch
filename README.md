# Garmin Run Fetch


## Install:
```
npm i garmin-run-fetch
```

## Run:
```
USER_NAME=danielsch@gmail.com PASSWORD=123456 npx garmin-run-fetch
```

## Env vars

| name | Desc |
| ------------- | ------------- |
| `USER_NAME`| Garmin connect user email |
| `PASSWORD` | Garmin connect user password |
| `ACTIVITY_FILE_PATH` | (Optional) Set with result file path, if not given the result is printed to console. |
| [DEBUG](https://github.com/visionmedia/debug#readme) | (Optional) set as garmin:* for debugging |

## Notes
* This creates a .cred.json file with garmin credentials for avoiding login with every run (the file can be deleted between runs).
* The login is done with scrapping the [Garmin Connect](https://connect.garmin.com/signin/) page