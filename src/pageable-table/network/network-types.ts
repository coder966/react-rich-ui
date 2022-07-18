import SpringPage from "../types/SpringPage"

type RequestMethod = 'GET' | 'POST'
type ResolveFunction = (data: SpringPage) => void
type RejectFunction = (error: any) => void

export { RequestMethod, ResolveFunction, RejectFunction }

