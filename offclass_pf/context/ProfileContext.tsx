import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProfileData = {
  image: string | null;
  school: string;
  name: string;
  phone: string;
  age: number;
  goalDays: number;
  goalHours: number;
  setImage: (image: string | null) => void;
  setSchool: (school: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setAge: (age: number) => void;
  setGoalDays: (days: number) => void;
  setGoalHours: (hours: number) => void;
};

const ProfileContext = createContext<ProfileData | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<string | null>(null);
  const [school, setSchool] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(0);
  const [goalDays, setGoalDays] = useState(0);
  const [goalHours, setGoalHours] = useState(0);

  return (
    <ProfileContext.Provider
      value={{
        image,
        school,
        name,
        phone,
        age,
        goalDays,
        goalHours,
        setImage,
        setSchool,
        setName,
        setPhone,
        setAge,
        setGoalDays,
        setGoalHours,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile deve ser usado dentro de um ProfileProvider');
  return context;
};
