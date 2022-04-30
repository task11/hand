import AuthForm from "components/AuthForm";
import OAuthForm from "components/OAuthForm";
import { React, useState } from "react";
import Cookie from "../static/MainLogo2.svg";
import Modal from "react-modal";
import BgImg from "../static/hand-background-mid.jpeg";
import BgImgP from "../static/hand-background-purple-mid.jpeg";



const Auth = () => {
  Modal.setAppElement("#root");
  const [stateModal, SetStateModal] = useState(false);

  const toggleModal = () => {
    SetStateModal((prev) => !prev);
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${BgImgP})` }}>
      {!stateModal && <div className="text-2xl text-white flex flex-col justify-center items-center">
        <p className="text-center">
          한손으로 당신의 하루를 시작하세요.<br />
          탭 하나로 일상을 기록하세요.
        </p>
        <button className="mt-12 w-60 h-7 bg-purple-500 border-solid border-1 rounded-xl cursor-pointer transition-colors hover:bg-purple-400" onClick={toggleModal} >have a nice day.</button>
      </div>
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
    </div >
  );
};

export default Auth;