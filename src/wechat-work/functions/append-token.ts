import { Context } from 'koa';
import { AxiosRequestConfig } from 'axios';
import { DynamicRuntime } from '../../_demo/types';

/**
 *
 * @param {AxiosConfig} axiosConf
 * @param {KoaContext} context
 */
async function relayInterceptor(this: DynamicRuntime & any, axiosConf: AxiosRequestConfig, ctx: Context) {
  if (!this.accessToken || (new Date().valueOf() >= this.accessTokenExpiration - 60 * 10 * 1000)) {
    await this.getToken();
  }
  axiosConf.params = (axiosConf.params || {});
  axiosConf.params.access_token = this.accessToken;
}

export default relayInterceptor;