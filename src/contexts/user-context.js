import { createContext } from 'react';
import { noMembersMock } from '../fixtures-members';

const [guest] = noMembersMock;
export const userContext = createContext({ defaultSessionUser: guest });

export const UserProvider = userContext.Provider;
export const UserConsumer = userContext.Consumer;
