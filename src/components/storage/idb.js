// Lightweight IndexedDB helper used for fallback persistence
export async function openIdb() {
  if (!('indexedDB' in window)) return null;
  return new Promise((resolve) => {
    const req = indexedDB.open('codexDB', 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('codexStore')) db.createObjectStore('codexStore');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}

export async function idbGet() {
  try {
    const db = await openIdb();
    if (!db) return null;
    return await new Promise((res) => {
      const tx = db.transaction('codexStore', 'readonly');
      const store = tx.objectStore('codexStore');
      const r = store.get('spiralCodex');
      r.onsuccess = () => res(r.result ?? null);
      r.onerror = () => res(null);
    });
  } catch (e) {
    return null;
  }
}

export async function idbSet(value) {
  try {
    const db = await openIdb();
    if (!db) return false;
    return await new Promise((res) => {
      const tx = db.transaction('codexStore', 'readwrite');
      const store = tx.objectStore('codexStore');
      const r = store.put(value, 'spiralCodex');
      r.onsuccess = () => res(true);
      r.onerror = () => res(false);
    });
  } catch (e) {
    return false;
  }
}