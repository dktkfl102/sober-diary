import db from "@/lib/db";

class CommonSQLService {
    async getCategories() {
        const { data, error } = await db.from("category").select();

        if (error) {
            throw new Error("Error get categories:", error);
        }

        return data;
    }

    async getChallenges() {
        const { data, error } = await db.from("challenge").select();

        if (error) {
            throw new Error("Error get challenges:", error);
        }

        return data;
    }
}
export default new CommonSQLService();
