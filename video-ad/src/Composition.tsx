import { Composition } from "remotion";
import { MainVideoAd } from "./MainVideoAd";

export const MyComposition = () => {
  return (
    <Composition
      id="AryanPortfolioAd60s"
      component={MainVideoAd}
      durationInFrames={1800}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
