import db from "@/lib/db";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
const user_id = user.info.id;

class ChallengeSQLService {
    async insert(params) {
        params = {
            ...params,
            category_id: params.categoryId,
            categoryId: undefined,
            challenge_id: params.challengeId,
            challengeId: undefined,
            start_date: params.startDate,
            startDate: undefined,
            user_id,
        };

        const { data, error } = await db.from("user_challenges").insert(params);

        if (error) {
            throw new Error("Error inserting challenge:", error);
        }

        return data;
    }

    async getRecentList() {
        const { data, error } = await db
            .from("user_challenges")
            .select()
            .eq("user_id", user_id);

        if (error) {
            throw new Error("Error getting latest challenges:", error);
        }

        return data;
    }

    async getInProgressList() {
        const { data, error } = await db
            .from("user_challenges")
            .select("*")
            .eq("user_id", user_id)
            .eq("status", "in_progress")
            .in("challenge_id", [1, 2]);

        if (error) {
            throw new Error("Error getting in progress challenges:", error);
        }

        return data;
    }

    async updateStatus(id, result) {
        const { data, error } = await db
            .from("user_challenges")
            .update({ status: result })
            .eq("id", id);

        if (error) {
            throw new Error("Error getting in progress challenges:", error);
        }

        return data;
    }

    async getRangeChallengeByCategory(category_id) {
        const { data, error } = await db
            .from("user_challenges")
            .select()
            .eq("user_id", user_id)
            .eq("challenge_id", 1)
            .eq("category_id", category_id)
            .eq("status", "in_progress");

        if (error) {
            throw new Error("Error getting specific date diary:", error);
        }

        return data;
    }
}

export default new ChallengeSQLService();
