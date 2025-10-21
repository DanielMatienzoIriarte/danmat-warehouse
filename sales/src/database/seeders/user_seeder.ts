import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import User from "../entities/user";

class UserSeeder implements Seeder {
    public async run(datasource: DataSource) {
        const userRepository = datasource.getRepository(User);

        const userAdmin = userRepository.create({
            email: 'admin@test.aaa',
            password: 'admin',
            is_active: true,
        });

         userRepository.save(userAdmin);
    }
}

export default UserSeeder;