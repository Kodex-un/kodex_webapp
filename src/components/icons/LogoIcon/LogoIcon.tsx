const LogoIcon = ({ size = 24, color = "#000" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 75 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 25">
        <path
          id="Polygon 8"
          d="M29.0298 13.4972C32.9494 7.25128 42.0506 7.25128 45.9702 13.4972L60.3646 36.4344C64.544 43.0943 59.757 51.75 51.8944 51.75H23.1056C15.243 51.75 10.456 43.0943 14.6354 36.4345L29.0298 13.4972Z"
          fill={color}
        />
        <circle id="Ellipse 3" cx="37" cy="33" r="10" fill="white" />
      </g>
    </svg>
  );
};

export default LogoIcon;
