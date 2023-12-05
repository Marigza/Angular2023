/* eslint-disable @typescript-eslint/naming-convention */

export interface ResponseGroups {
  Count: 'number';
  Items: Array<{
    id: {
      S: 'string';
    };
    name: {
      S: 'string';
    };
    createdAt: {
      S: 'string';
    };
    createdBy: {
      S: 'string';
    };
  }>;
}

/* eslint-enable @typescript-eslint/naming-convention */
