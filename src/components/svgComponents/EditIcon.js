import Svg, { Path, Defs, Rect, G, ClipPath } from "react-native-svg";

export const EditIcon = (props) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_1244_9962)">
        <Rect width="24" height="24" rx="5" fill="#496CEB" />
        <Path
          d="M4.5625 17.3125H19.4375V18.375H4.5625V17.3125ZM16.9937 8.28125C17.4187 7.85625 17.4187 7.21875 16.9937 6.79375L15.0812 4.88125C14.6562 4.45625 14.0188 4.45625 13.5938 4.88125L5.625 12.85V16.25H9.025L16.9937 8.28125ZM14.3375 5.625L16.25 7.5375L14.6562 9.13125L12.7437 7.21875L14.3375 5.625ZM6.6875 15.1875V13.275L12 7.9625L13.9125 9.875L8.6 15.1875H6.6875Z"
          fill="#FBFBFF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1244_9962">
          <Rect width="24" height="24" rx="5" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
