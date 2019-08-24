(alerts: any[]): string => {
  let strArr = [];
  let idx = 1;
  let len = 0;
  let stop = false;
  alerts.forEach(alert => {
    if (stop) return;
    const msg = `<label style="color:red;">${new Date(alert.startsAt).toISOString()}: ${alert.labels.alertname} ${alert.labels.severity || 'warning'}</label><br />` +
    `<label>Detail Message [${idx++}]: ${this.mergeLabels(alert.annotations).join('\n ')}</label><br /><br />`;
    len += msg.length;
    if (len <= 1000) {
      strArr.push(msg);
    } else {
      stop = true;
      strArr.push('<label style="color:red;">......</label><br /><br />');
    }
  });
  let res = JSON.stringify(strArr.join(''));
  return res.substr(1, res.length - 2);
};