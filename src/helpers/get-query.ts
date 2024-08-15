import { getApp } from 'firebase/app';
import { child, getDatabase, ref } from 'firebase/database';

export const getQuery = (appname: string, path: string) => {
  const app = getApp(appname);
  const dbref = ref(getDatabase(app));
  const query = child(dbref, path);
  return query;
};
