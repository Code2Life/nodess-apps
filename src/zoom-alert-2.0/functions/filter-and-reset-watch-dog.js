(body, request) => { 
  let alerts = body.alerts.filter(x => x.labels.alertname != 'DeadMansSwitch' && x.labels.alertname != 'Watchdog');
  if (alerts.length < body.alerts.length) {
    // has DeadMansSwitch or Watchdog
    if (global.watchDog) {
      global.clearTimeout(global.watchDog);
    }
    this.log('skip Watchdog alerts...');
    global.watchDog = setTimeout(async () => {
      try {
        this.log('no watch dog, trigger Watchdog warning.');
        let res = await this.axios({
          method: 'post',
          url: this.url + '?format=full',
          headers: { 'Authorization': this.token, 'Content-Type': 'application/json'},
          data: {
            head: {
              "text": "Alert Status: FIRING",
              "style": {
                "color": "#FF0000",
                "bold": true,
                "italic": false
              }
            },
            body: [
              {
                "type": "message",
                "text": "Watchdog notification is missing !",
                "style": {
                  "color": "#666",
                  "bold": false,
                  "italic": false
                }
              }
            ]
          }
        });
        this.log(res.status + ',' + JSON.stringify(res.data));
      } catch (ex) {
        console.error(ex);
      }
    }, 86460000);
    body.alerts = alerts;
  }
  if (body.alerts.length == 0) {
    request.response.status = 200;
    request.response.body = "OK";
    request.ctx.finishProcessing = true;
    return false;
  } else {
    this.log(`got ${body.alerts.length} alerts, start processing.`);
    return true;
  }
}