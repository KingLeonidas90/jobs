// import { Permissions, Notifications } from 'expo';
// import { AsyncStorage } from 'react-native';
// import axios from 'axios';
//
// const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'
// export default async () => {
//   let previousToken = await AsyncStorage.get('pushtoken');
//
//   if (previousToken) {
//     // ein einfaches return sorgt dafür aus der Methode zu springen und keine weitere
//     // Handlung anzuzeigen
//     return;
//   } else {
//     // Permissions ist verantwortlich für alle device services die genutzt werden können
//     // z.b ruf jemanden an, schreib eine sms, Kamera nutzen etc
//     // Frag den nutzer ob wir push Notifications benutzen dürfen
//     // wenn wir zugriff erhalten, wird der status auf 'granted' gesetzt
//   let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
//
//   if (status !== 'granted') {
//     return;
//   }
//   // generate token
//   // neue version getExpoPushTokenAsync()
//   let token = await Notifications.getExponentPushTokenAsync();
//   // token auf den server hochladen
//   await axios.post(PUSH_ENDPOINT, { token: { token } });
//   // token im AsyncStorage speichern um ihn lokal zu speichern
//   await AsyncStorage.setItem('pushtoken', token);
//   }
// };


// STEPHENS version
import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);
  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

    if (status !== 'granted') {
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    await axios.post(PUSH_ENDPOINT, { token: { token } });
    AsyncStorage.setItem('pushtoken', token);
  }
};
