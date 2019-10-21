async (respObj, ctx) => {
  let relayRes = ctx.relayResultMap.get('zoom-im');
  if (!relayRes) {
    respObj.statusCode = 200;
    respObj.body = 'OK';
    return
  }
  this.log(`handle response of [req-${ctx.reqId}] - ${relayRes.status}\n ${JSON.stringify(relayRes.data)}`);
  if (relayRes.status == 200 && relayRes.data)  {
    respObj.statusCode = 200;
    respObj.body = 'OK';
  } else {
    respObj.statusCode = 400;
    respObj.body = `Fail: ${JSON.stringify(relayRes.data)}`;
  }
}