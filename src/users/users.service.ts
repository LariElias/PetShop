import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "larissa",
            "email": "larissa@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "larissa",
            "email": "larissa@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "larissa",
            "email": "larissa@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "larissa",
            "email": "larissa@gmail.com",
            "role": "INTERN",
        },
        {
            "id": 2,
            "name": "larissa",
            "email": "larissa@gmail.com",
            "role": "INTERN",
        }
        
    ]

    findAll(role?: 'INTERN'| 'ENGINEER'| 'ADMIN'){
        if(role){
            const rolesArray = this.users.filter(user =>user.role === role)
            if(rolesArray.length === 0) throw new NotFoundException('User Role Not Found')
            return rolesArray
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException('User not Found')
        return user
    }

    create(createUserDto: CreateUserDto){
        const usersByHigherstID = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: usersByHigherstID[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number,
        updatedUserDto: UpdateUserDto ){
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, updatedUserDto}
            }
            return user
        })

        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id )

        return removedUser
    }


}
