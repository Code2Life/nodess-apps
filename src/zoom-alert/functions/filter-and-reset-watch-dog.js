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
          url: this.url,
          headers: { 'X-Zoom-Token': this.token, 'Content-Type': 'application/json'},
          data: {
            title: `<p><label style=\"color:red;\">${this.title}</label></p>`,
            summary: "<p>Watchdog notification is missing!</p>",
            body: ''
          }
        });
        this.log(res.status + ',' + JSON.stringify(res.data));
      } catch (ex) {
        console.error(ex);
      }
    }, 86410000);
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