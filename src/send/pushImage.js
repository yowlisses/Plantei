import {brokenSendLink} from './brokenSendLink';

export async function sendImage(image) {
  const file = {
    uri: image.localUri,
  };

  console.error('sending: ', image.localUri);
  const data = await fetch(image.sendLink, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  });
  console.error(data);
  if (data.status === 403) {
    throw brokenSendLink;
  } else if (data.status === 200) {
    image.sent = true;
  } else {
    throw 'Unknown error: ' + JSON.stringify(data);
  }
}
