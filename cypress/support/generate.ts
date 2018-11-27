import {build, fake} from 'test-data-bot'

const userBuilder = build('User').fields({
  password: fake(f => f.internet.password()),
  username: fake(f => f.internet.userName()),
})

export {userBuilder}
