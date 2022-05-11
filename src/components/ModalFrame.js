import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    animation: modal-bg-show 1s;
    @keyframes modal-bg-show {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalBlock = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 1.5rem;
    background-color: white;
    width: 30rem;
    @media (max-width: 1120px) {
        width: 20rem;
    }
    @media (max-width: 20rem) {
        width: 40%;
    }
    min-height: 20rem;
    animation: modal-show 1s;
    @keyframes modal-show {
        from {
            opacity: 0;
            margin-top: -50px;
        }
        to {
            opacity: 1;
            margin-top: 0;
        }
    }
`;

const Close = styled.div`
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    width: 10px;
    height: 10px;
    background-color: white;
    cursor: pointer;
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ModalFrame = ({ handleModal, state, children }) => {
  return state && (
    <Container>
      <Background onClick={e => handleModal(e)} />
      <ModalBlock>
        <Close onClick={e => handleModal(e)}>X</Close>
        <Contents>
          {children}
        </Contents>
      </ModalBlock>
    </Container>
  );
};

export default ModalFrame;