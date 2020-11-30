import React from 'react';
import Layout from './Layout';
import Search from './Search';
import styled from 'styled-components';

const Button = styled.button`
  border: 0;
  background-color: rgb(255, 94, 148);
  border-radius: 0 5px 5px 0;
  height: 48px;
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  position: relative;
`;

const Result = styled.div`
  position: absolute;
`;

const ResultMessage = styled.div`
  padding-top: 0.5rem;
`;

const App = () => {
  const [chosenItem, setChosenItem] = React.useState('');
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResult, setSearchResult] = React.useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    setSearchResult(true);
  };

  React.useEffect(
    () => {
      setSearchResult(false);
    },
    [searchValue]
  );

  const form = (
    <Form onSubmit={submitHandler}>
      <Search
        setChosenItem={setChosenItem}
        value={searchValue}
        setSearchValue={setSearchValue}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );

  return (
    <Layout>
      <h1>Fuzzy Foodie Search</h1>
      {form}
      <Result>
        {searchResult && chosenItem ? (
          <ResultMessage>You chose a {chosenItem}!</ResultMessage>
        ) : null}
        {!chosenItem && searchResult ? (
          <ResultMessage>
            {searchValue
              ? `I can't make a breakfast out of ${searchValue}!!`
              : 'Try finding a food, my stomach is rumbling :P'}
          </ResultMessage>
        ) : null}
      </Result>
    </Layout>
  );
};

export default App;
