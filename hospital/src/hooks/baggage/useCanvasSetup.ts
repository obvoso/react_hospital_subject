export const useCanvasSetup = (
  canvasRef,
  images,
  itemAnimations,
  setItemAnimations,
  config
) => {
  useEffect(() => {
    preloadImages(canvasRef, images, itemAnimations, setItemAnimations, config);
    return () => {
      images.current = {};
      setItemAnimations([]);
    };
  }, [config]);
};

export const useAnimation = (
  canvasRef,
  itemAnimations,
  setItemAnimations,
  images,
  gameState,
  config,
  dpi
) => {
  useEffect(() => {
    startAnimation(
      canvasRef.current,
      itemAnimations,
      setItemAnimations,
      images,
      gameState.start,
      config,
      dpi
    );
  }, [itemAnimations, gameState.start, config, dpi]);
};
