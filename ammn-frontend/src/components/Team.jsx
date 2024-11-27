import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Team() {
  const people = [
    {
      id: 'person-1',
      name: 'Abdulwahab',
      role: 'Back-end Developer',
      avatar: '/avatar-boy.png',
    },
    {
      id: 'person-2',
      name: 'Janna',
      role: 'Front-end Developer',
      avatar: '/avatar-girl.png',
    },
    {
      id: 'person-3',
      name: 'Saja',
      role: 'Back-end Developer',
      avatar: '/avatar-girl.png',
    },
    {
      id: 'person-4',
      name: 'Nora',
      role: 'Front-end Developer',
      avatar: '/avatar-girl.png',
    },
  ];

  return (
    <div className='h-auto w-full'>
    <h1 className="text-2xl font-bold text-center mb-20">Meet Our Team</h1>
    <div className="my-20 grid md:grid-cols-2 lg:grid-cols-4">
      {people.map((person) => (
        <div key={person.id} className="flex flex-col items-center">
          <Avatar className="mb-4 size-20 md:mb-5 lg:size-24">
            <AvatarImage src={person.avatar} />
            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <p className="text-center font-bold">{person.name}</p>
          <p className="text-center text-secondary font-semibold">{person.role}</p>
        </div>
      ))}
    </div>
    </div>
  );
}
