export type Mapper<T1,T2=T1> = (prevValue: T1)=>T2
export type SetterOrUpdater<T> = (valueOrMapper: T | Mapper<T>)=>void
