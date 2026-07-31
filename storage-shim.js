// Polyfills the window.storage API (normally provided by the Claude artifact
// sandbox) using the browser's own localStorage, so the exact same component
// code works standalone with zero changes.
(function () {
  const PREFIX = "kanji-notebook:";

  function keyFor(key) {
    return PREFIX + key;
  }

  window.storage = {
    async get(key) {
      try {
        const raw = window.localStorage.getItem(keyFor(key));
        if (raw === null) return null;
        return { key, value: raw, shared: false };
      } catch (e) {
        throw e;
      }
    },
    async set(key, value) {
      try {
        window.localStorage.setItem(keyFor(key), value);
        return { key, value, shared: false };
      } catch (e) {
        throw e;
      }
    },
    async delete(key) {
      try {
        window.localStorage.removeItem(keyFor(key));
        return { key, deleted: true, shared: false };
      } catch (e) {
        throw e;
      }
    },
    async list(prefix) {
      const keys = [];
      const scanPrefix = PREFIX + (prefix || "");
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith(scanPrefix)) keys.push(k.slice(PREFIX.length));
      }
      return { keys, prefix, shared: false };
    },
  };
})();
