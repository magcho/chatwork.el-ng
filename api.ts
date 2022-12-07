export async function post(
  url: string,
  apiToken: string,
  data: { [key: string]: any },
) {
  const body = new FormData();

  Object.keys(data).forEach((key) => {
    body.append(key, data[key]);
  });

  return fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "x-chatworktoken": apiToken,
    },
    body,
  });
}

export async function get(url: string, apiToken: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-chatworktoken": apiToken,
    },
  });
}
