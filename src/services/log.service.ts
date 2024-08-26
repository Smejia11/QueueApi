/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable accessor-pairs */
import https from 'https';
import http from 'http';

import { decodeAuth, decodeAuthExternal } from '../helpers/auth';
import { DecodedToken, DecodedTokenExternal } from '../interfaces/index';

import logger from '../logger';
import config from '../config/index';

class ApiLogs {
  private token: string;
  private actionName: string;
  private isExternal: boolean;

  private data: any;
  private device: any;
  private timeResponseInit;
  private timeResponseFinaly;
  private apisLog: DecodedToken | DecodedTokenExternal | object;

  constructor({ token = '', actionName = '', isExternal = false }) {
    this.token = token;
    this.actionName = actionName;
    this.isExternal = isExternal;

    this.data = null;
    this.device = null;
    this.timeResponseInit = 0;
    this.timeResponseFinaly = 0;
    this.apisLog = {};

    if (isExternal) {
      const decodeAuth = decodeAuthExternal(token);

      if (decodeAuth?.sub) {
        this.apisLog = {
          idUser: decodeAuth.sub,
          nameApi: 'quotationApi',
        };
      }
    } else {
      const decodedToken = decodeAuth(token);

      if (decodedToken?.user) {
        const { user } = decodedToken;
        this.apisLog = {
          idUser: user._id,
          nameApi: 'quotationApi',
        };
      }
    }
  }

  setData(data = {}) {
    this.data = data;
  }

  setDevice(device = {}) {
    this.device = device;
  }

  start() {
    this.timeResponseInit = new Date().getTime();
  }

  end() {
    this.timeResponseFinaly = new Date().getTime();
  }

  getAgentFetch(isAgent = true) {
    const {
      LOG_API: { logsApiUrlBase: url },
    } = config;
    const domain = new URL(url);
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      keepAlive: false,
    });
    const httpAgent = new http.Agent({
      keepAlive: true,
    });

    if (isAgent) {
      return { agent: domain.protocol === 'http:' ? httpAgent : httpsAgent };
    }

    return {};
  }

  get getData() {
    return this.data;
  }

  get getDevice() {
    return this.device;
  }

  get getActionName() {
    return this.actionName;
  }

  get getApiLogs() {
    return this.apisLog;
  }

  get getTimeResponse() {
    return this.timeResponseFinaly - this.timeResponseInit;
  }

  _buildPayload() {
    let track = {};
    if (this.data && this.data?.track) track = this.data.track;
    const payload = {
      apisLog: this.apisLog,
      actionName: this.actionName,
      device: this.device,
      data: {
        ...this.data,
        track: {
          ...track,
          timeResponse: this.getTimeResponse,
        },
      },
    };
    return payload;
  }

  async createLog(requestOptions: any = {}) {
    try {
      const {
        LOG_API: { logsApiUrlBase: url },
      } = config;
      const { haders, ...restRequestOptions } = requestOptions;
      const restHeaders = requestOptions && haders ? haders : {};
      const agent = this.getAgentFetch();
      const options = {
        method: 'POST',
        body: JSON.stringify(this._buildPayload()),
        headers: {
          Authorization: this.token,
          'Content-Type': 'application/json',
          ...restHeaders,
        },
        ...agent,
        ...restRequestOptions,
      };

      logger.info('=============in set log============');
      logger.info(JSON.stringify(options));

      const response = await fetch(`${url}api/v1/log`, options);

      logger.info(JSON.stringify(response.status || ''));
      logger.info(JSON.stringify(response.statusText || ''));
      logger.info('=============end set log============');

      const res = await response.json();

      logger.info(JSON.stringify(res));
      logger.info('=============end set log Response============');
      return res;
    } catch (error: any) {
      logger.error(error, '===== Error in set log=============');
      if (error instanceof Error) throw new Error(error.message);
      throw new Error(error);
    }
  }
}

export { ApiLogs };
