import React from 'react';
import styled from 'styled-components';

import { CurrencyTab } from '../atoms/CurrencyTab';
import { TABLET_BREAKPOINT } from '../styleConstants/mediaConstants';

export interface CurrencyTabsProps {
activeTabName: string;
tabNames: string[];
onTabClick: (value: string) => void;
}

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: ${TABLET_BREAKPOINT}) {
    flex-direction: column;
  }
`;

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

