import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import { React, useState } from "react";
import Cookie from "../static/MainLogo2.svg";
import Modal from "react-modal";
import BgImg from "../static/hand-background-mid.jpeg";



const Auth = () => {
  const [stateModal, SetStateModal] = useState(false);

  const toggleModal = () => {
    SetStateModal((prev) => !prev);
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${BgImg})` }}>
      {!stateModal && <div>
        <p >
          한손으로 당신의 하루를 시작하세요.<br />
          탭 하나로 일상을 기록하세요.
        </p>
        <button onClick={toggleModal} >have a nice day.</button>
      </div>
      }
      <Modal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            opacity: 0.2
          },
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            opacity: 0.2,
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        isOpen={stateModal}
        onRequestClose={() => SetStateModal(false)}
        contentLabel="Login dialog">
        <AuthForm />
        <OAuthForm />
      </Modal>
    </div >
  );
};

export default Auth;