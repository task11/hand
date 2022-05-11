import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import { React, useState } from "react";
import styled from "styled-components";
import ModalFrame from "components/ModalFrame";

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
  font-size: 1.8rem;
  color: ${(props) => props.theme.accentColor};
  p{
    text-align: center;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 10rem;
  height: 2rem;
  border: solid 1px ${(props) => props.theme.btnColor};
  border-radius: 1rem;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.btnColor};
  transition: all 0.5s linear;
  
  &:hover{
    color: ${(props) => props.theme.hoverTextColor};
    background-color: ${(props) => props.theme.hoverBtnColor};
    box-shadow:200px 0 0 0 rgba(0,0,0,0.2) inset;
  }
`;

const Span = styled.span`
  width: 100%;
  text-align: center;
  line-height: 2.5rem;
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
  // Modal.setAppElement("#root");
  const [stateModal, SetStateModal] = useState(false);

  const toggleModal = (e) => {
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
      <ModalFrame handleModal={toggleModal} state={stateModal}>
        <AuthForm />
        <OAuthForm />
      </ModalFrame>
    </Container >
  );
};

export default Auth;