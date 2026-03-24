export const storage = {
  get: (keys: string[]): Promise<Record<string, unknown>> =>
    new Promise((resolve) => {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        chrome.storage.local.get(keys, (result) => {
          resolve(result as Record<string, unknown>);
        });
      } else {
        const result: Record<string, unknown> = {};
        keys.forEach((k) => {
          const val = localStorage.getItem(k);
          if (val !== null) result[k] = JSON.parse(val);
        });
        resolve(result);
      }
    }),

  set: (items: Record<string, unknown>): Promise<void> =>
    new Promise((resolve) => {
      if (typeof chrome !== "undefined" && chrome.storage?.local) {
        chrome.storage.local.set(items, () => {
          resolve();
        });
      } else {
        Object.entries(items).forEach(([k, v]) =>
          localStorage.setItem(k, JSON.stringify(v)),
        );
        resolve();
      }
    }),
};
