(labels: Object): string[] => {
  let strArr = [];
  Object.keys(labels).forEach(k => {
    if (k == 'runbook_url') {
      return;
    }
    k = k[0].toUpperCase() + k.substring(1);
    strArr.push(k + ': ' + labels[k]);
  });
  return strArr;
};