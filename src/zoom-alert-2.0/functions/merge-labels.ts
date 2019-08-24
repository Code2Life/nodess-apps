(labels: Object): string[] => {
  let strArr = [];
  Object.keys(labels).forEach(k => {
    if (k == 'runbook_url') {
      return;
    }
    const name = k[0].toUpperCase() + k.substring(1);
    strArr.push(name + ': ' + labels[k]);
  });
  return strArr;
};