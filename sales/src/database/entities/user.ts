import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    JoinColumn,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
import BasicEntity from "./base_entity";
import UserAuthToken from "./user_authorization_token";

@Entity('user')
class User extends BasicEntity{
    @Column({
        length: 128,
        nullable: false,
    })
    email: string;

    @Column({
        length: 64,
        nullable: false,
    })
    password: string;

    @Column({
        name: 'is_active',
        default: true,
    })
    is_active: boolean;

    @OneToOne(() => UserAuthToken, (userAuthToken) => userAuthToken.user)    
    userAuthToken: UserAuthToken;
}

export default User;