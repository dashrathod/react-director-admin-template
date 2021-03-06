// @flow

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

type Item = {
  name: string,
  tablink: string,
  isActive: boolean,
};

type Props = {
  tabItems: Array<Item>,
};

const TabPanelHeader = ({ tabItems = [] }: Props) => {
  const oneTabAtLeastIsActive = tabItems.some(item => item.isActive === true);

  let tabItemsToDisplay = [...tabItems];
  if (!oneTabAtLeastIsActive) {
    tabItemsToDisplay = tabItems.map((item, itemIdx) => {
      if (itemIdx === 0) {
        return {
          ...item,
          isActive: true,
        };
      }
      return item;
    });
  }

  return (
    <header className="panel-heading tab-bg-dark-navy-blue">
      <ul className="nav nav-tabs">
        {tabItemsToDisplay.map((item, itemIdx) => {
          const { name, tablink, isActive } = item;

          return (
            <li
              id="listitem"
              key={itemIdx}
              className={cx({ active: isActive })}
            >
              <a
                data-toggle="tab"
                aria-expanded={isActive === true ? 'true' : 'false'}
                href={`#${tablink}`}
              >
                &nbsp;
                {name}
              </a>
            </li>
          );
        })}
      </ul>
    </header>
  );
};

TabPanelHeader.displayName = 'TabPanelHeader';

TabPanelHeader.propTypes = {
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      tablink: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};

export default TabPanelHeader;
