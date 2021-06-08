import { NavigationContainerRef } from '@react-navigation/native';
import { createRef } from 'react';

export const navigationRef = createRef<NavigationContainerRef>();

export const getNavigation = () => {
  return navigationRef.current;
};
