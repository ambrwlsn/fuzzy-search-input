import React from 'react';
import uniq from 'lodash.uniq';
import Downshift from 'downshift';
import Highlighter from 'react-highlight-words';
import Fuse from 'fuse.js';
import styled from 'styled-components';
import food from './food';

const Dropdown = styled.div`
  border: 3px solid rgb(255, 94, 148);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  max-height: 150px;
  overflow: ${(props) => props.overflow};
  position: absolute;
  width: 100%;
  z-index: 10;
`;

const Input = styled.input`
  border: 3px solid rgb(255, 94, 148);
  border-radius: 5px 0 0 5px;
  font-size: 1.5rem;
  padding-left: 0.5rem;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  max-width: 500px;
  height: 50px;
`;

const Suggestion = styled(Highlighter)`
  cursor: pointer;
  font-size: 1.5rem;
  margin: 0 0.5rem;
`;

// configuration for fuse fuzzy search - https://fusejs.io/api/options.html
const options = {
  minMatchCharLength: 2,
  threshold: 0.3,
  includeMatches: true,
};

// remove duplicated items in the food array
let items = uniq(food);

const fuse = new Fuse(items, options);

const Search = (props) => {
  return (
    <Downshift
      itemToString={(item) => (item ? item.item : '')}
      onSelect={(selectedItem) => {
        props.setChosenItem(selectedItem.item);
        props.setSearchValue(selectedItem.item);
      }}
      inputValue={props.value}
    >
      {({
        getRootProps,
        getInputProps,
        getItemProps,
        getLabelProps,
        openMenu,
        isOpen,
        highlightedIndex,
      }) => {
        return (
          <InputWrapper {...getRootProps()}>
            <label className="hidden" {...getLabelProps()}>
              Search for a food
            </label>
            <Input
              {...getInputProps({
                type: 'search',
                onFocus: openMenu,
                value: props.value,
                onChange: (e) => {
                  props.setSearchValue(e.target.value);
                  e.target.value === '' && props.setChosenItem('');
                },
              })}
            />
            {isOpen && props.value.length > 1 ? (
              <Dropdown overflow={isOpen ? 'scroll' : 'reset'}>
                {fuse.search(props.value).map((item, index) => {
                  return (
                    <div
                      {...getItemProps({
                        key: item.item,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightpink' : 'white',
                          padding: '0.2rem 0',
                        },
                      })}
                    >
                      <Suggestion
                        searchWords={[props.value]}
                        autoEscape={true}
                        textToHighlight={item.item}
                        highlightTag="strong"
                        key={index}
                      />
                    </div>
                  );
                })}
              </Dropdown>
            ) : null}
          </InputWrapper>
        );
      }}
    </Downshift>
  );
};

export default Search;
