/* eslint-disable @typescript-eslint/no-unused-vars */
import { generate } from 'random-words';
import React from 'react';

export default function MultiplyComponent({
  children,
  number = 1,
}: {
  children: React.ReactNode;
  number: number;
}) {
  return (
    <>
      {[...Array(number)].map((_) => (
        <React.Fragment key={generate() as string}>
          {children}
        </React.Fragment>
      ))}
    </>
  );
}
