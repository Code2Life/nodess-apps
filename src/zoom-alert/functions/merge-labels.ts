(labels: Object): string[] => {
  let strArr = [];
  Object.keys(labels).forEach(k => {
    strArr.push(k + ': ' + labels[k]);
  });
  return strArr;
};