import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import User from './user';

@Entity('user_auth_token')
class UserAuthToken {
    @PrimaryColumn(
        'uuid',
        {
            type: 'varchar',
            unique: true,
            nullable: false,
            comment: 'ID of the associated user.',       
        }
    )
    user_id: string;

    @Column({
        type: 'varchar',
        name: 'jwt_token',
        comment: 'User token',
    })
    jwtToken: string;

    @OneToOne(() => User, (user) => user.userAuthToken)
    @JoinColumn({ name: 'user_id' }) 
    user: User
}

export default UserAuthToken;
