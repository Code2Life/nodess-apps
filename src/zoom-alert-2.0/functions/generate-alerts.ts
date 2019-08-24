(alerts: any[]): string => {
  let res = '';
  let idx = 1;
  let stop = false;
  alerts.forEach(alert => {
    if (stop) return;

    const severity = alert.labels.severity;
    res += `{
      "type": "message",
      "text": "[${idx++}] ${new Date(alert.startsAt).toISOString()} ${alert.labels.alertname} ${severity ? (severity[0].toUpperCase() + severity.substring(1)) : 'Warning'}",
      "style": {
        "color": "#222222",
        "bold": true,
        "italic": false
      }
    },{
      "type": "message",
      "text": "${this.mergeLabels(alert.annotations).join('\n')}",
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