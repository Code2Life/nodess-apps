body => { 
  let alerts = body.alerts.filter(x => x.labels.alertname != 'DeadMansSwitch' && x.labels.alertname != 'Watchdog');
  if (alerts.length < body.alerts.length) {
    // has DeadMansSwitch or Watchdog
    if (global.watchDog) {
      global.clearTimeout(watchDog);
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
  // all watch dog, should be 0 after filtered
  return body.alerts.length != 0;
}