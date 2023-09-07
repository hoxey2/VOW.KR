// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#41B883", // 메인 초록 (뷰 색상)
          secondary: "#111111", // 메인 검정
          dark: "#212121", // 어두운 회색
          light: "#EEEEEE", // 밝은 회색
        },
      },
    },
    typography: {
      // Specify your desired font family
      fontFamily: 'Noto Sans KR'
    },
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
