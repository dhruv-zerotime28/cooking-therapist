'use client';

import React, { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export const AuthCommonCard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden py-0 shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          {children}
          <div className="relative hidden bg-muted md:block">
            <Image
              src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        © 2025 Cooking Therapist. All rights reserved.
      </div>
    </div>
  );
};
