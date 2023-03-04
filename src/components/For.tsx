import { useQuery } from '@tanstack/react-query';
import React from 'react'

interface ForProps {
  each: any[] | undefined
  children: (item: any, index: number) => React.ReactNode;
  fallback: JSX.Element;
}




export const For: React.FC<ForProps> = ({ each, children, fallback }) => {
  
  if (!each) return fallback;

  return (
    <>
      {
        each?.map((item, index) => (
          <React.Fragment key={index}>
              {children(item, index)}
          </React.Fragment>
        ))
      }
    </>
  )
}

type User = Record<'name', string> & Record<'age', number>;

const users_data: User[] = [
  { name: 'John', age: 20 },
  { name: 'Jane', age: 21 },
  { name: 'Jack', age: 22 },
];

export const Home = () => {
  const { data } = useQuery(['users'], async () => {
    const users = await new Promise<User[]>((resolve) => {
      const usersArr: User[] = [...users_data];

      setTimeout(() => {
        resolve(usersArr);
      }, 3000);
    });

    return users;
  });  
  
  return (
    <div className='flex gap-4 bg-red-500 w-[20%] text-white'>
      <For each={data} fallback={<div>Loading...</div>}>
        {(user: User) => (
          <div>
            <div>{user.name}</div>
            <div>{user.age}</div>
          </div>
        )}
      </For>  
    </div>
  )
}