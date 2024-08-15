import { Options } from '../enums';
import { NapprFirebaseLoadingException } from '../exceptions';

export const getConfig = () => {
  const keys = Object.entries(process.env);
  const filtered = keys.filter((a) => a[0].includes(Options.KEY_PREFIX));
  if (!filtered.length) {
    throw new NapprFirebaseLoadingException();
  }

  const reword = filtered.map(([key, value]) => {
    const len = Options.KEY_PREFIX.length;
    const index = key.indexOf(Options.KEY_PREFIX);
    const name = key.slice(index + len);
    return [name, value];
  });

  const config = reword.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});
  return config;
};
