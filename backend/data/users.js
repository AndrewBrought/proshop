import bcrypt from 'bcryptjs'

const users = [
    // These users have to have only the fields that we setup in our user model or
    // mongoose wont let us insert into db
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
]

export default users;
