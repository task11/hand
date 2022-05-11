import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import { React, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 1.8em;
  line-height: 1.2em;
  color: ${(props) => props.theme.accentColor};
  p{
    text-align: center;
  }
`;

const Button = styled.button`
  margin-top: 2em;
  width: 12em;
  height: 2em;
  border: solid 1px ${(props) => props.theme.btnColor};
  border-radius: 1em;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.btnColor};
  transition: color 1s linear;
  
  &:hover{
    background-color: ${(props) => props.theme.hoverBtnColor};
  }
`;

const Span = styled.span`
  width: 100%;
  text-align: center;
  line-height: 1.5em;
  color: ${(props) => props.theme.accentColor};
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
  transform: translateY(-50px);
  opacity: 0;
  animation-name: titleAnimation;
  animation-timing-function:ease;
  animation-duration: 5s;
  animation-delay: 0.6s;
  animation-iteration-count: infinite;
  &:first-child{
    animation-delay: 0.7s;
  }
  &:last-child{
    animation-delay: 0.5s;
  }

  @keyframes titleAnimation {
    0% {
      transform: translateY(-50px);
      opacity: 0;
      -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 80%);
    }
    20% {
        transform: translateY(0);
        opacity: 1;
        -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
        clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    80% {
        transform: translateY(0);
        opacity: 1;
        -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
        clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 15%);
    }
    100% {
        transform: translateY(50px);
        opacity: 0;
        -webkit-clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
        clip-path: polygon(100% 0, 100% -0%, 0 100%, 0 100%);
    }
}
`;

const Auth = () => {
  Modal.setAppElement("#root");
  const [stateModal, SetStateModal] = useState(false);

  const toggleModal = () => {
    SetStateModal((prev) => !prev);
  };

  return (
    <Container>
      {!stateModal &&
        <>
          <Title>
            <Span>한손으로 당신의 하루를 시작하세요.</Span>
            <Span>탭 하나로 일상을 기록하세요.</Span>
          </Title>
          <Button onClick={toggleModal} >Have A Nice Day</Button>
        </>
      }
      <Modal
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1050,
          overlay: {
            position: 'fixed',
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            overflowY: 'auto',
            overflowX: 'hidden',
          },
          content: {
            position: 'absolute',
            width: '500px',
            height: '350px',
            top: '50%',
            left: '50%',
            overflowY: 'auto',
            overflowX: 'hidden',
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            backgroundColor: 'transparent',
            border: 'none'
          }
        }}
        isOpen={stateModal}
        onRequestClose={() => SetStateModal(false)}
        contentLabel="Login dialog">
        <AuthForm />
        <OAuthForm />
      </Modal>
    </Container >
  );
};

export default Auth;;;;;;