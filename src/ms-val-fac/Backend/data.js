// Mock data
import {faker} from '@faker-js/faker'
const userCreator = () => ({
    name: faker.person.firstName(),
    id: faker.number.int({min : 1,max : 3})
  });

const users = [...new Array(5)].map(() => userCreator())

export {
    users
}