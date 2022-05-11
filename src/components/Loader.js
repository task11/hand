import LoadingSvg from "../static/loading.svg";
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <img src={LoadingSvg}></img>
    </LoaderContainer>
  );
};

export default Loader;