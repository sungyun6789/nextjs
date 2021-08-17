import { NextPage } from 'next';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const index: NextPage = () => {
  return (
    <Container>
      <h1>hello styled-components</h1>
      <h2>hello styled-components</h2>
      <p>hello styled-components</p>
      <ul>
        <li>hello styled-components</li>
      </ul>
      <a>hello styled-components</a>
      <span>hello styled-components</span>
    </Container>
  );
};

export default index;
