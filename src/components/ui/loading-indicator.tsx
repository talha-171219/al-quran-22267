import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import loadingData from "@/assets/lottie/loading.json";

interface LoadingIndicatorProps {
  size?: number;
  text?: string;
}

export const LoadingIndicator = ({ size = 120, text = "Loading..." }: LoadingIndicatorProps) => {
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieContainerRef.current) {
      lottieContainerRef.current.innerHTML = '';
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: loadingData,
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div ref={lottieContainerRef} style={{ width: size, height: size }} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
