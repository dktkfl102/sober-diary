import db from "@/lib/db";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
const user_id = user.info.id;

class DiarySQLService {
    async insert(params) {
        params = {
            ...params,
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
            .eq("user_id", user_id)
            .order("log_date", { ascending: false });

        if (error) {
            throw new Error("Error getting recent diary:", error);
        }

        return data;
    }

    // date : yyyy-mm
    async getListByMonth(date) {
        const [year, month] = date.split("-").map(Number);

        const startOfMonth = `${year}-${String(month).padStart(2, "0")}-01`;
        // 다음 달의 첫날에서 하루를 빼 마지막 날 계산
        const nextMonth = new Date(year, month, 1); // 다음 달의 1일
        const endOfMonth = new Date(nextMonth - 1) // 하루를 빼서 마지막 날 계산
            .toISOString()
            .split("T")[0]; // yyyy-mm-dd 형식으로 변환

        const { data, error } = await db
            .from("diary")
            .select()
            .eq("user_id", user_id)
            .gte("log_date", startOfMonth)
            .lte("log_date", endOfMonth);

        if (error) {
            throw new Error("Error getting monthly diary:", error);
        }

        return data;
    }

    async getSpecificDate(date) {
        const { data, error } = await db
            .from("diary")
            .select()
            .eq("user_id", user_id)
            .eq("log_date", date);

        if (error) {
            throw new Error("Error getting specific date diary:", error);
        }

        return data;
    }

    async delete(id) {
        const { data, error } = await db.from("diary").delete().eq("id", id);

        if (error) {
            throw new Error("Error deleting specific date diary:", error);
        }

        return data;
    }

    async update(params, id) {
        params = {
            ...params,
            log_date: params.logDate,
            logDate: undefined,
            user_id,
        };
        const { data, error } = await db
            .from("diary")
            .update(params)
            .eq("id", id);

        if (error) {
            throw new Error("Error updating specific date diary:", error);
        }

        return data;
    }
}

export default new DiarySQLService();
