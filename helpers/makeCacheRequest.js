'use strict';

const makeCacheRequest = async ({ hdbCore, url, method, minCreatedDate }) => {
  try {
    const cacheRequest = {
      body: {
        operation: 'search_by_conditions',
        schema: 'edison_poc',
        table: 'request_cache',
        operator: 'and',
        get_attributes: ['id', 'hits', 'response', 'content_type'],
        hdb_user: { role:{ permission:{ super_user:true } }, username: 'hdbadmin' },
        conditions: [
          {
            search_attribute: 'href',
            search_type: 'equals',
            search_value: url.href
          },
          {
            search_attribute: 'method',
            search_type: 'equals',
            search_value: method
          },
          {
            search_attribute: 'error',
            search_type: 'equals',
            search_value: false
          },
          {
            search_attribute: '__createdtime__',
            search_type: 'greater_than',
            search_value: minCreatedDate
          }
        ]
      }
    };

    return hdbCore.requestWithoutAuthentication(cacheRequest);
  } catch (e) {
    return false;
  }
}

module.exports = makeCacheRequest;
