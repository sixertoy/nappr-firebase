import { FIREBASE_KEY_PREFIX } from '../constants';

const getConfig = () => {
  const keys = Object.entries(process.env);
  const filtered = keys.filter(a => a[0].indexOf(FIREBASE_KEY_PREFIX) !== -1);
  if (!filtered.length) {
    throw new Error('Unable to load firebase configuration');
  }
  const reword = filtered.map(([key, value]) => {
    const len = FIREBASE_KEY_PREFIX.length;
    const index = key.indexOf(FIREBASE_KEY_PREFIX);
    const start = index + len;
    const name = key.slice(start);
    return [name, value];
  });
  const config = reword.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});
  return config;
};

export default getConfig;
