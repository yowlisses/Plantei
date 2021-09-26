import {sendPlantInfo} from './sendPlantInfo';
import {sendImage} from './sendImage';
import {confirmSending} from './confirmSending';

export async function sendPlant(sending, callback) {
  while (!sending.sent) {
    try {
      if (!sending.plantInfoSent) {
        await sendPlantInfo(sending);
        console.error();
      } else {
        const plantId = sending.plantId;
        await Promise.all(
          sending.images.map(image => sendImage({image, plantId})),
        );
        await confirmSending(plantId);
        sending.sent = true;
      }
    } catch (err) {
      console.error(err);
    }
  }
  console.error('fim');
  if (callback) {
    callback(sending);
  }
}
