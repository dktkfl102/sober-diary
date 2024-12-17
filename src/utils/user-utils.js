import { nanoid } from "nanoid";
import { useUserStore } from "@/stores/user.js";

import userSql from "@/services/sql/user.sql";
import LocalStorageService from "@/services/localStorage/local-storage.service";
import LocalStorageKey from "@/services/localStorage/local-storage-key";

const user = useUserStore();

export default class UserUtils {
    static registerUser = async () => {
        const newUuid = nanoid();
        const nickname = `술꾼${Math.floor(Math.random() * 100000)}`;
        await userSql.insertUser({ uuid: newUuid, nickname });
        LocalStorageService.setItem(LocalStorageKey.UUID, newUuid);
        await this.loadUserInfo(newUuid);
    };

    static loadUserInfo = async (uuid) => {
        const userInfo = await userSql.getUser(uuid);
        const smokingStatus =
            LocalStorageService.getItem(LocalStorageKey.SMOKING_STATUS) ||
            false;
        user.info = { ...userInfo, smokingStatus };
    };
}
