import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')// essa é a rota
export class UsersController {
    
    constructor(private readonly usersService: UsersService){}

    @Get()
    findAll(@Query('role') role?: 'INTERN'| 'ENGINEER'| 'ADMIN'){
        return this.usersService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body(ValidationPipe) createUSerDto: CreateUserDto){
        return this.usersService.create(createUSerDto) 
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe)
    UpdateUserUpdate: UpdateUserDto){
        return this.usersService.update(id, UpdateUserDto) 
    }
    
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
}
