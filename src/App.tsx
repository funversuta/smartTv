import React, { FC, useState } from "react";
import "./App.css";
import ReactPlayer from "react-player";
import Banner from "./components/Banner/Banner";
import config from "./store";
import { observer } from "mobx-react-lite";
import SidePanel from "./components/SidePanel/SidePanel";

const App: FC = observer(() => {
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);

  const handler = (typeOfEvent: string) => {
    typeOfEvent === "play" ? config.play() : config.pause();
  };

  return (
    <div className="App">
      <ReactPlayer
        controls
        playing={config.isPlaying}
        url={
          "https://www.youtube.com/watch?v=M7FIvfx5J10&ab_channel=VolvoTrucks"
        }
        width={"100%"}
        height={"100%"}
        onPlay={() => {
          handler("play");
          if (isPlayerReady) {
            setTimeout(() => {
              config.showBanner();
            }, 5000);
          }
        }}
        onPause={() => handler("pause")}
        onReady={() => setIsPlayerReady(true)}
      />
      <Banner show={config.isShowBanner} />
      <SidePanel show={config.isShowContent}></SidePanel>
    </div>
  );
});

export default App;
