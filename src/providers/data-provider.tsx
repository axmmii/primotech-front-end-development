import { DataProvider, HttpError } from "@refinedev/core";
import { error } from "console";

/**
 * Check out the Data Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/data-provider/
 **/
// const API_URL = "http://127.0.0.1:3000";
// const API_URL = "http://192.168.1.51:3000";
const API_URL = import.meta.env.VITE_API_BASE_URL;
export const dataProvider: DataProvider = {
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const response = await fetch(`${API_URL}/${resource}`,  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('refine-auth')}`
      },
    }
  );
  
    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    console.log('get user', data);
    
    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    console.log("getMany", {
      resource,
      ids,
      meta,
    });

    // TODO: send request to the API
    // const response = await httpClient.get(url, {});

    return {
      data: [],
    };
  },

  create: async ({ resource, variables, meta }) => {
    console.log('creat data', variables);

    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('refine-auth')}`
      },
    });
  
    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    console.log('get user', data);
    
    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };

  },

  update: async ({ resource, id, variables }) => {
    try {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(variables),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('refine-auth')}`
        },
      }); 

      if (!response.ok) {
        const error: HttpError = {
          message: response.statusText,
          statusCode: response.status,
        };
        return Promise.reject(error);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      // const error: HttpError = {
      //   message: exp?.message || "Something went wrong",
      //   statusCode: error?.status || 500,
      // };
      return Promise.reject(error);
    }
  },

  getOne: async ({ resource, id, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('refine-auth')}`
      },
    }); 

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('refine-auth')}`
      },
    });

    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();

    return { data };
  },

  getApiUrl: () => {
    return API_URL;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
    meta,
  }) => {
    const response = await fetch(`${url}`,  {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        'Authorization': `Bearer ${localStorage.getItem('refine-auth')}`
      },
      body: JSON.stringify(payload)
    }
  );
  
    if (response.status < 200 || response.status > 299) throw response;

    const data = await response.json();
    console.log('get custom', data);
    
    return {
      data,
      total: 0, // We'll cover this in the next steps.
    };
  },
};
