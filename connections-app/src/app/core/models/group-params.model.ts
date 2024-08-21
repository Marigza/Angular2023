/* eslint-disable @typescript-eslint/naming-convention */

import { BaseParams } from "./base-params.model";

export interface GroupParams extends BaseParams {
  id: {
    S: string;
  };
  createdAt: {
    S: string;
  };
  createdBy: {
    S: string;
  };
}

/* eslint-enable @typescript-eslint/naming-convention */
