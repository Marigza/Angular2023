/* eslint-disable @typescript-eslint/naming-convention */

import { BaseParams } from "./base-params.model";

export interface ProfileParams extends BaseParams {
  email: {
    S: 'string';
  };
  uid: {
    S: 'string';
  };
  createdAt: {
    S: 'string';
  };
}

/* eslint-enable @typescript-eslint/naming-convention */
