import React from 'react';

import { CurrencyTab } from '../atoms/CurrencyTab';
import { TabsContainer } from '../atoms/TabsContainer';

export interface CurrencyTabsProps {
activeTabName: string;
tabNames: string[];
onTabClick: (value: string) => void;
}

const renderTabs = (props: CurrencyTabsProps) => props.tabNames.map(name => {
  const onClick = () => props.onTabClick(name);
  return (
    <CurrencyTab
      key={name}
      active={name === props.activeTabName}
      onClick={onClick}
      id={`tab-${name}`}
    >
      {name}
    </CurrencyTab>
  )
});

export const CurrencyTabs = (props: CurrencyTabsProps) => (
  <TabsContainer>
      {renderTabs(props)}
  </TabsContainer>
);

