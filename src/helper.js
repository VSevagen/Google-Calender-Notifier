export const isMobile = () => {
  if(window) {
    return window?.visualViewport?.width <= 992;
  }
}