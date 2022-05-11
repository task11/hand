import styled from "styled-components";

const FooterContainer = styled.footer`
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   left: 0;
   bottom: 0;
   border: 0px solid;
   box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 6%);
`;

const Strong = styled.strong`
  font-size: 20px;
  font-weight: bold;
`;

const FooterSection = styled.div`
  margin-top: 20px;
`;

const FooterItem = styled.div`
  margin-bottom: 10px;
  a{
    cursor: pointer;
  }
  a:hover{
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection >
        <h1>
          <p>
            <Strong>H</Strong>ave<br />
            <Strong>A</Strong><br />
            <Strong>N</Strong>ice<br />
            <Strong>D</Strong>ay
          </p>
        </h1>
      </FooterSection>
      <FooterSection>
        <FooterItem><Strong>License</Strong></FooterItem>
        <FooterItem><p>
          Copyright; {new Date().getFullYear()} <br />
          have a nice day. <br />
          All Rights Reserved.
        </p></FooterItem>
      </FooterSection>
      <FooterSection >
        <FooterItem><Strong>How to reach me</Strong></FooterItem>
        <FooterItem><a href="mailto:6539305@gmail.com" target='_blank'>Mail</a></FooterItem>
        <FooterItem><a href="https://velog.io/@task11" target='_blank'>Blog</a></FooterItem>
        <FooterItem><a href="https://github.com/task11" target='_blank'>Github</a></FooterItem>
      </FooterSection>
      <FooterSection >
        <FooterItem><Strong>Author</Strong></FooterItem>
        <FooterItem><a href="https://github.com/task11/have-a-nice-day-react-frontend" target='_blank'>Task11 🇰🇷</a></FooterItem>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;