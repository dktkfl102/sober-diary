// import { store } from '@/store';
import router from "@/router";

// import mitts from '@/utils/mitt';

import LocalStorage from "@/services/localStorage/local-storage.service";
import LocalStorageKey from "@/services/localStorage/local-storage-key";
// import CommonService from '@/services/api/common.service';

function isRN() {
    return window.ReactNativeWebView != null;
}
function sendToRN(data, callback = null) {
    window[data.type] = callback;
    if (isRN()) {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
}

async function sendToRNAsync(data) {
    return new Promise(async (resolve, reject) => {
        sendToRN(data, resolve);
    });
}

class ReactBridgeService {
    async getDeviceInfo() {
        return await sendToRNAsync({ type: "getDeviceInfo" });
    }

    async setSecureStorageItem(key, value) {
        return await sendToRNAsync({
            type: "setSecureStorageItem",
            key,
            value,
        });
    }
    async getSecureStorageItem(key) {
        return await sendToRNAsync({ type: "getSecureStorageItem", key });
    }

    printErrorMsg(msg) {
        return sendToRN({ type: "printErrorMsg", msg });
    }

    handleShare(url) {
        return sendToRN({ type: "handleShare", url });
    }

    async needUpdate() {
        return await sendToRNAsync({ type: "needUpdate" });
    }

    // airbridgeEvent(name, params = null) {
    //     if(!params) params = {"custom": "temp"};
    //     return sendToRN({type: "airbridgeEvent", name, params: JSON.stringify(params)});
    // }

    copy(msg) {
        return sendToRN({ type: "copy", msg });
    }

    exit() {
        return sendToRN({ type: "exit" });
    }

    openLink(url) {
        return sendToRN({ type: "openLink", url });
    }
    shareFile(base64, fileName) {
        return sendToRN({ type: "shareFile", base64, fileName });
    }
    async getOsVersion() {
        return await sendToRNAsync({ type: "osVersion" });
    }
    async onMessage(event) {
        let { data, type, result, msg } = JSON.parse(event.data);

        switch (type) {
            case "init":
                // store.dispatch("setTokenData", { pushToken: data.pushToken });
                // store.dispatch('setUserData', { media: data.os.toUpperCase() });
                // store.dispatch('setCommonData', { version: data.version });
                break;
            case "certmove.getAuthCode":
                window["certmove.init"]("authCode", data.authCode);
                break;
            case "certmove.getMoveResult":
                window["certmove.init"]("result", data);
                break;
            case "certsign.init":
                sendToRN({ type: "certsign.getCertList" }, window[type]);
                break;
            case "needUpdate":
                window["needUpdate"](data);
                break;
            case "foreground":
                try {
                    router.push({ name: "Index" });
                } catch (e) {
                    // CommonService.logging(JSON.stringify(e));
                }
                break;
            case "event":
                LocalStorage.setItem(LocalStorageKey.REFERRAL_CODE, data);
                break;
            case "route":
                if (data.includes("?")) {
                    data = data.split("?")[0];
                }

                if (data === "qna") router.push({ name: "qna-list" });
                else if (data === "notice")
                    router.push({ name: "notice-list" });
                else if (data === "event03")
                    router.push({ name: "event220922" });
                else if (data === "openLCity")
                    router.push({ name: "openLCity" });
                else if (data === "lCityVIP") router.push({ name: "lCityVIP" });
                else if (data === "lCitySubs")
                    router.push({ name: "lCitySubs" });
                else if (data === "lCitySubsBoost")
                    router.push({ name: "lCitySubsBoost" });
                else if (data.includes("subscription")) {
                    const index = data.replace("subscription", "");
                    if (index)
                        router.push({
                            name: "subscription-detail",
                            params: { id: index },
                        });
                    else router.push({ name: "subscription" });
                }
                break;
            case "apppush":
                const key = Object.keys(data)[0];
                const queries = {};

                if (key === "route" && data[key]) {
                    if (data[key].includes("?")) {
                        // query parameter가 있을 때
                        const query = data[key].split("?")[1].split("&");

                        for (let i = 0; i < query.length; i++) {
                            const keyValue = query[i].split("=");
                            queries[keyValue[0].toString()] =
                                keyValue[1].toString();
                        }
                    }
                    router.push({ path: data[key], query: queries });
                }
                break;
            case "getToken":
                // store.dispatch("setTokenData", { pushToken: data.pushToken });
                break;
            // case "error":
            //     mitts.emit('error', data);
            //     break;
            case "notification":
                break;
            case "osVersion":
                // store.dispatch('setUserData', { media: data.os.toUpperCase() });
                // store.dispatch('setCommonData', { version: data.version });
                LocalStorage.setItem(LocalStorageKey.APP_VERSION, data.version);
                LocalStorage.setItem(
                    LocalStorageKey.DEVICE_OS,
                    data.os.toUpperCase()
                );
                break;
            default: {
                // TODO: 앱 다음버전 배포시 kakao auto sign msg object 명 변경
                // 앱 다음 버전 배포 전까지는 현 상태 유지
                if (msg) window[type]({ ...data, result, msg });
                else window[type]({ ...data, result });
            }
        }
    }
}

export default new ReactBridgeService();
