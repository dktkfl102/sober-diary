import db from "@/lib/db";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
const user_id = user.info.id;

class DiarySQLService {
    async insert(params) {
        params = {
            ...params,
            category_id: params.categoryId,
            categoryId: undefined,
            log_date: params.logDate,
            logDate: undefined,
            user_id,
        };
        const { data, error } = await db.from("diary").insert(params);

        if (error) {
            throw new Error("Error inserting user:", error);
        }

        return data;
    }

    async getRecentList() {
        const { data, error } = await db
            .from("diary")
            .select()
            .eq("user_id", user_id);

        if (error) {
            throw new Error("Error inserting user:", error);
        }

        return data;
    }
}

export default new DiarySQLService();
