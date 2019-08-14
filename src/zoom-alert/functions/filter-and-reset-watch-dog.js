body => { 
  let alerts = body.alerts.filter(x => x.labels.alertname != 'DeadMansSwitch');
  if (alerts.length < body.alerts.length) {
    // has DeadMansSwitch
    if (global.watchDog) {
      global.clearTimeout(watchDog);
    }
    this.log('skip DeadMansSwitch alerts...');
    global.watchDog = setTimeout(async () => {
      try {
        this.log('no watch dog, trigger DeadMansSwitch warning.');
        let res = await this.axios({
          method: 'post',
          url: this.url,
          headers: { 'X-Zoom-Token': this.token, 'Content-Type': 'application/json'},
          data: {
            title: `<p><label style=\"color:red;\">${this.title}</label></p>`,
            summary: "<p>DeadMansSwitch is missing!</p>",
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
  return true; 
}