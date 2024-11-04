import { useState, useEffect, useRef } from "react";

import Button from "../generic/Button";
import SmallButtonContainer from "../generic/SmallButtonContainer";
import StyledButtonContainer from "../generic/StyledButtonContainer";
import TimerDisplay from "../generic/TimerDisplay";
import TimerContainer from "../generic/TimerContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../../utils/helpers";

const Stopwatch = () => {
  const [stopWatchTimer, setStopWatchTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setStopWatchTimer((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <TimerContainer>
      <TimerDisplay id={TimerDisplay}>
        {formatTime(stopWatchTimer)}
      </TimerDisplay>
      <StyledButtonContainer>
        <Button
          type={isRunning ? "pause" : "start"}
          height={undefined}
          onClick={() => setIsRunning((prev) => !prev)}
          width={200}
        >
          <FontAwesomeIcon
            icon={isRunning ? faPause : faPlay}
            size="3x"
            color="#626363"
          />
        </Button>
        <SmallButtonContainer>
          <Button
            height={60}
            type=""
            width={70}
            onClick={() => {
              setIsRunning(false);
              setStopWatchTimer(0);
            }}
          >
            Fast
            <br /> Forward
          </Button>
          <Button
            type="reset"
            height={60}
            width={70}
            onClick={() => {
              setIsRunning(false);
              setStopWatchTimer(0);
            }}
          >
            {/* reset the timer */}
            Reset
          </Button>
        </SmallButtonContainer>
      </StyledButtonContainer>
    </TimerContainer>
  );
};

export default Stopwatch;
