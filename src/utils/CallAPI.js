export const callAPI = async ({url, method, headers, body}) => {
  try {
    const requestHeaders = new Headers();
    const token = sessionStorage.getItem('token');
    requestHeaders.append('Content-Type', 'application/json;charset=UTF-8');
    token && requestHeaders.append('agora-token', token);
    const response = await fetch(url, {
      method: method,
      headers: requestHeaders,
      body: body
    });
    const result = await response.json();
    return {ok: response.ok, response: result};
  } catch (error) {
    return {ok: false, response: error};
  }
};