import React from 'react';
import styled from 'styled-components';

import { CurrencyTab } from '../atoms/CurrencyTab';

export interface CurrencyTabsProps {
    activeTabName: string;
    tabNames: string[];
    onTabClick: (value: string) => void;
}

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: 768px) {
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

