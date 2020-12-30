module.exports = {
  url: 'https://connect.garmin.com/signin/?service=https%3A%2F%2Fconnect.garmin.com%2Fmodern%2Factivities%3FactivityType%3Drunning',
  frameSelector: 'iframe',
  userNameSelector: '#username',
  passwordSelector: '#password',
  submitSelector: 'button[type="submit"]',
  homeSelector: '.connect-container',
  credentialsPath: '.cred.json',
  activityUrl: 'https://connect.garmin.com/modern/proxy/activitylist-service/activities/search/activities?activityType=running&limit=<limit>&start=<startDate>&_=<endDate>',
};
