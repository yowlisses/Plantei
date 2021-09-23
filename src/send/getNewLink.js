import {api} from 'api';

export async function getNewLink({plantId, image}) {
  const res = await api.post('/plantImageUploadLink', {plantId, image});
  return res.data;
}
