// user data 
const users = [
  {
    id: 1,
    name: "ambassade du tchad",
    email: "dashcode@codeshaper.net",
    password: "password",
    image: '/images/users/user-1.jpg',
  },
  {
    id: 2,
    name: "dashtail",
    email: "dashtail@codeshaper.net", 
    password: "password",
    image: '/images/avatar/avatar-3.png',
  }
]

export type User = (typeof users)[number]

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email)
}