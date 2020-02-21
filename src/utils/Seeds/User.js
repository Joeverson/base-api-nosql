import UserRepository from '../../modules/user/Repository'

export default async () => {
  // add the users default
  await UserRepository.create({
    name: 'Admin',
    email: 'admin@g.com',
    password: '123',
  })
}
