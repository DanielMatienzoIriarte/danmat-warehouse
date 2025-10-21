import { DataSource } from "typeorm";
import { runSeeders, Seeder } from "typeorm-extension";
import UserSeeder from "./user_seeder";

class InitSeeders implements Seeder {
    public async run(datasource: DataSource) {
        await runSeeders(
            datasource,
            {
                seeds: [
                    UserSeeder,
                ]
            },
        );
    }
}

export default InitSeeders;