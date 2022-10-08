import styled from 'styled-components';

export const CategoryContainerTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const CategoryTitle = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
`;

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50p;
`;
