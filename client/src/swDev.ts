import axios from 'axios';

function urlBase64ToUint8Array(base64String: any) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    // eslint-disable-next-line
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
async function regSw() {
    function isPushNotificationSupported() {
        return 'serviceWorker' in navigator && 'PushManager' in window;
    }
    console.log('===', isPushNotificationSupported(), '+===');
    if ('serviceWorker' in navigator) {
        const url = process.env.PUBLIC_URL + '/sw.js';
        //let url = 'http://localhost:3001/sw.js';
        const reg = await navigator.serviceWorker.register(url, { scope: '/' });
        console.log('service config is', { reg });
        return reg;
    }
    throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg: any) {
    const key = 'BBvNwVAElLgs6PUcTcPoHFne_ztWOBRuCzjxq4zCF3SfOl0okVRc6Nhni-Br0Sx-81-F470c6k9iQ6x2EzR5NwE';
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    console.log('subscription1', subscription);
    if (subscription === null) {
        console.log('subscription', subscription);
        subscription = await serviceWorkerReg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(key)
        });
        axios.post('http://localhost:8001/api/notif', subscription);
    }
}
export { subscribe, regSw };
