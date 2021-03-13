import { createContext } from 'react';
import { noMembersMock } from '../fixtures-members';

const [guest] = noMembersMock;
export const userContext = createContext({ user: guest });

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;
