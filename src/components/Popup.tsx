import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

// Define Light and Dark Themes
const lightTheme = {
  background: "#f5f5f5",
  text: "#333",
  inputBg: "#fff",
  buttonBg: "#007BFF",
  buttonText: "#fff",
  borderColor: "#ddd",
};

const darkTheme = {
  background: "#1e1e1e",
  text: "#fff",
  inputBg: "#333",
  buttonBg: "#ff9900",
  buttonText: "#000",
  borderColor: "#555",
};

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: "Poppins", sans-serif;
    transition: background-color 0.3s ease-in-out;
  }
`;

const PopupContainer = styled.div`
  width: 360px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  text-align: center;
  transition: background 0.3s ease-in-out;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FormGroup = styled.div`
  text-align: left;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  display: block;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 6px;
  background: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  background: ${(props) => props.theme.inputBg};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme.buttonBg};
  color: ${(props) => props.theme.buttonText};
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ToggleSwitch = styled.div`
  width: 40px;
  height: 20px;
  background: ${(props) => (props.isDark ? "#ff9900" : "#ccc")};
  border-radius: 10px;
  position: relative;
  transition: background 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background: white;
    border-radius: 50%;
    top: 1px;
    left: ${(props) => (props.isDark ? "20px" : "2px")};
    transition: left 0.3s ease-in-out;
  }
`;

const Popup: React.FC = () => {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("Gemini 1.5 Flash");
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <PopupContainer>
        <Header>
          <Title>TC - Analyzer</Title>
          <ToggleContainer onClick={() => setIsDarkMode(!isDarkMode)}>
            <span>{isDarkMode ? "Dark" : "Light"} Mode</span>
            <ToggleSwitch isDark={isDarkMode} />
          </ToggleContainer>
        </Header>

        <FormGroup>
          <Label htmlFor="model">Select Model</Label>
          <Select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option>Gemini 1.5 Flash</option>
            <option>GPT-4</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="apiKey">Enter API Key</Label>
          <Input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
          />
        </FormGroup>

        <Button>Save API Key</Button>
        <Button style={{ marginTop: "10px", background: "#007BFF" }}>
          Try for Free
        </Button>
      </PopupContainer>
    </ThemeProvider>
  );
};

export default Popup;
