import db from "@/lib/db";

class UserSQLService {
    async insertUser(params) {
        const { data, error } = await db.from("user").insert(params);

        if (error) {
            throw new Error("Error inserting user:", error);
        }

        return data;
    }

    async getUser(uuid) {
        const { data, error } = await db
            .from("user")
            .select()
            .eq("uuid", uuid)
            .single();

        if (error) {
            throw new Error("Error getting user:", error);
        }

        return data;
    }

    async insertSuggestion(params) {
        const { data, error } = await db.from("suggestions").insert(params);

        if (error) {
            throw new Error("Error inserting suggestion:", error);
        }

        return data;
    }
}

export default new UserSQLService();
