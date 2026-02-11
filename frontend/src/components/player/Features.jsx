import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";

import "../../css/footer/Feature.css";

const Features = ({playerState, playerFetaures}) => {
  // static UI state
  // const isMuted = false;
  // const shuffleEnabled = false;
  // const loopEnabled = false;
  // const playbackSpeed = 1;
  // const volume = 50
  const {isMuted,loopEnable,shuffleEnable,playBackSpeed,volume} = playerState
  const {
    onToggleMute,
    onToggleLoop,
    onToggleSuffle,
    onChangeSpeed,
    onChangeVolume
  }=playerFetaures
  
  const handleSpeedChange=(e)=>{
    const value=Number(e.target.value);
    onChangeSpeed(value);
  }

  const handleVolumeChange=(e)=>{
    const value=Number(e.target.value);
    const nor=value/100;

    onChangeVolume(nor);
  }
  return (
    <>
      <div className="features-root">
        <div className="features-row">
          {/* Mute */}
          <button className="features-btn" aria-label={isMuted ? "unmute" : "mute"} 
          onClick={onToggleMute}>
            {isMuted ? (
              <IoVolumeMuteOutline color="#a855f7" size={26}/>
            ):(<IoVolumeHighOutline color="#a855f7" size={26} />)}
          </button>

          {/* Shuffle */}
          <button className={shuffleEnable ? "features-btn features-btn-active" : "features-btn"} 
          aria-label={shuffleEnable ? "disable suffle" : "enable suffle"}
          onClick={onToggleSuffle} type="button"
          >
            <TbArrowsShuffle color={shuffleEnable ? "#a855f7" : "#9ca3af"} size={26} />
          </button>

          {/* Loop */}
          <button className={loopEnable ? "features-btn features-btn-active": "features-btn"} 
          aria-label="loop" onClick={onToggleLoop} type="button"
          >
            <RiLoopRightLine color={loopEnable ? "#a855f7" : "#9ca3af"} size={26} />
          </button>

          {/* Playback Speed */}
          <label className="features-speed-label" htmlFor="playbackSpeed">
            <select
               name="playbackSpeed"
               id="playbackSpeed"
               aria-label="playbackSpeed"
              className="features-speed-select"
              value={playBackSpeed}
              onChange={handleSpeedChange}
              readOnly
            >
              <option className="features-speed-select" value={0.75}>0.75x</option>
              <option className="features-speed-select" value={1}>1x</option>
              <option className="features-speed-select" value={1.25}>1.25x</option>
              <option className="features-speed-select" value={1.5}>1.5x</option>
              <option className="features-speed-select" value={2}>2x</option>
            </select>
          </label>
        </div>

        {/* Volume */}
        <div className="features-volume-wrapper">
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round((volume || 0)*100)}
            onChange={handleVolumeChange}
            className="features-volume-range"
            style={{background: `linear-gradient(to right, #a855f7 ${volume*100}%, #333 ${volume*100}%)`}}
          />
        </div>
      </div>
    </>
  );
};

export default Features;
