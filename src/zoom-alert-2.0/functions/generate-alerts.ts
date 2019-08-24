(body: any): string => {
  let res = '';
  let idx = 1;
  let stop = false;
  let alerts = body.alerts;
  alerts.forEach(alert => {
    if (stop) return;

    if (body.groupLabels && Object.keys(body.groupLabels).length > 0) {
      res += `{
        "type": "message",
        "text": "${this.mergeLabels(body.groupLabels).join(',') || '' }",
        "style": {
          "color": "#666",
          "bold": false,
          "italic": false
        }
      },`;
    }

    let hint = alert.labels.severity;

    // show resolved ranther than level for resolved alerts
    if (alert.status.search(/firing/) == -1) {
      hint = 'resolved';
    }
    let detailMsg = JSON.stringify(this.mergeLabels(alert.annotations).join('\n'));
    detailMsg = detailMsg.substring(1, detailMsg.length - 1) || '-';

    res += `{
      "type": "message",
      "text": "[${idx++}] ${new Date(alert.startsAt).toISOString()} ${alert.labels.alertname} ${hint ? (hint[0].toUpperCase() + hint.substring(1)) : 'Warning'}",
      "style": {
        "color": "#222222",
        "bold": true,
        "italic": false
      }
    },{
      "type": "message",
      "text": "${detailMsg}",
      "style": {
        "color": "#443333",
        "bold": false,
        "italic": false
      }
    },`;
    if (alert.generatorURL != '') {
      res += `{
        "type": "message",
        "text": "Click to view detail metrics",
        "link": "${alert.generatorURL}"
      },`;
    }
    if (res.length > 1000) {
      stop = true;
      res += '{"type": "message","text": "......"},';
    }
  });
  return res;
};