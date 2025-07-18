import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { jobTalkLoginStateAtom } from "../state";
import { useNavigate } from "react-router";
import {
  Box,
  createTheme,
  responsiveFontSizes,
  Stack,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import Section1 from "../components/main-page/Section1";
import Section2 from "../components/main-page/Section2";
import Section3 from "../components/main-page/Section3";
import Section4 from "../components/main-page/Section4";
import { useRedirectPage } from "../utils";

const Main = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const redirectPage = useRedirectPage();

  const loginState = useAtomValue(jobTalkLoginStateAtom);

  // 큰 폰트 테마 생성
  const bigFontTheme = responsiveFontSizes(
    createTheme({
      ...theme,
      typography: {
        ...theme.typography,
        h1: {
          fontSize: "5rem",
          fontWeight: "bold",
        },
        h2: {
          fontSize: "4rem",
          fontWeight: "bold",
        },
        h3: {
          fontSize: "3rem",
          fontWeight: "bold",
        },
        h4: {
          fontSize: "2rem",
          fontWeight: "bold",
        },
        h5: {
          fontSize: "1.5rem",
          fontWeight: "bold",
        },
        h6: {
          fontSize: "1.25rem",
          fontWeight: "bold",
        },
      },
    })
  );

  useEffect(() => {
    // 페이지 리다이렉트 함수 호출
    const isRedirected = redirectPage();
    // 리다이렉트가 성공한 경우, 더 이상 진행하지 않음
    if (isRedirected) {
      return;
    }

    // 로그인 상태가 true이면 워크스페이스로 리다이렉트
    if (loginState.isLoggedIn) {
      navigate("/workspace");
    }
  }, [loginState.isLoggedIn, navigate, redirectPage]);

  // 로그인 상태이면 렌더 중지
  if (loginState.isLoggedIn) {
    return null;
  }

  // 메인 페이지 렌더링
  return (
    <ThemeProvider theme={bigFontTheme}>
      <Stack
        bgcolor={grey[100]}
        sx={{
          "& .MuiTypography-root": {
            textWrap: "balance",
          },
        }}
      >
        {/* 1페이지 */}
        <Section1 />

        {/* 2페이지 */}
        <Box marginTop="20vh">
          <Section2 />
        </Box>

        {/* 3페이지 */}
        <Section3 />

        {/* 4페이지 */}
        <Section4 />
      </Stack>
    </ThemeProvider>
  );
};

export default Main;
