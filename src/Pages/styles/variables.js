export const gradient =
  "linear-gradient(to bottom right, hsla(304.12, 100%, 80%, 0.18) 0%, hsla(302.84, 95.76%, 79.61%, 0.185) 8.4%, hsla(298.89, 87.66%, 78.84%, 0.199) 16.6%, hsla(292.53, 88.24%, 79.08%, 0.221) 24.8%, hsla(284.25, 89.02%, 79.38%, 0.248) 32.8%, hsla(274.39, 89.96%, 79.75%, 0.281) 40.6%, hsla(263.32, 91.04%, 80.15%, 0.317) 48.2%, hsla(251.41, 92.23%, 80.57%, 0.356) 55.5%, hsla(239.1, 93.59%, 80.73%, 0.394) 62.5%, hsla(229.15, 95.7%, 77.54%, 0.433) 69.1%, hsla(222.3, 97.21%, 74.52%, 0.469) 75.4%, hsla(217.5, 98.29%, 71.79%, 0.502) 81.3%, hsla(214.16, 99.07%, 69.46%, 0.529) 86.7%, hsla(211.92, 99.59%, 67.66%, 0.551) 91.7%, hsla(210.61, 99.9%, 66.49%, 0.565) 96.1%, hsla(210.17, 100%, 66.08%, 0.57) 100%)";

export const duration = 500;

export const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
  visibility: "hidden",
  overflow: "hidden",
};

export const transitionStyles = {
  entering: { opacity: 1, visibility: "visible" },
  entered: { opacity: 1, visibility: "visible" },
  exiting: { opacity: 0, visibility: "hidden" },
  exited: { opacity: 0, visibility: "hidden" },
};
