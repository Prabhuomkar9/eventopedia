// Without a default matcher, this one line applies next-auth to the entire project
export { default } from 'next-auth/middleware'

// Applies next-auth only to matching routes - can be regex
//Ref : https://nextjs.org/docs/pages/building-your-application/routing/middleware#matcher
// export const config = { matcher: ["/dashboard/(.*)", "/profile"] }
export const config = { matcher: [] }
