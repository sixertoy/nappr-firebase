import { getApp } from 'firebase/app';
import { child, getDatabase, ref } from 'firebase/database';

const getQuery = (appname, path) => {
  const app = getApp(appname);
  const dbref = ref(getDatabase(app));
  const query = child(dbref, path);
  return query;
};

export default getQuery;
