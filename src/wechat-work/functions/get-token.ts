async function getToken(this: any) {
  let resp = await this.axios({
    url: this.getTokenPath,
    baseURL: this.baseURL,
    params: {
      corpid: this.corpId,
      corpsecret: this.corpSecret,
    }
  });
  this.accessToken = resp.data.access_token;
  this.accessTokenExpiration = new Date().valueOf() + resp.data.expires_in * 1000;
  console.log('get or refresh access token');
  return this.accessToken;
}