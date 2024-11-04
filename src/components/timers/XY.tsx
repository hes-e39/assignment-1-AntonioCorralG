import { useState, useEffect, useRef } from "react";

import Button from "../generic/Button";
import SmallButtonContainer from "../generic/SmallButtonContainer";
import StyledButtonContainer from "../generic/StyledButtonContainer";
import TimerDisplay from "../generic/TimerDisplay";
import TimerContainer from "../generic/TimerContainer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "../../utils/helpers";
import { StyledForm, StyledSelect, Label } from "../generic/FormStyling";

const XY = () => {
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(0);

  const minuteOptions = Array.from({ length: 61 }, (_, i) => i).map(
    (minute) => (
      //To do: add styling to option, Maybe make styled component?
      <option key={minute} value={minute}>
        {minute}
      </option>
    )
  );

  const roundOptions = Array.from({ length: 10 }, (_, i) => i).map((round) => (
    <option key={round} value={round}>
      {round + 1}
    </option>
  ));

  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTime(Number.parseInt(event.target.value, 10));
  };

  const handleRoundsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfRounds(Number.parseInt(event.target.value));
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 10);
      }, 10);
    } else if (isRunning && timeLeft <= 0 && numberOfRounds > 0) {
      clearInterval(intervalRef.current);
      setNumberOfRounds((prevRounds) => prevRounds - 1);
      setTimeLeft(time * 60000);
    } else if (timeLeft <= 0 && numberOfRounds === 0) {
      // To Do: all rounds completed, add visual cue to user
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, numberOfRounds, time]);

  const handleStart = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      if (timeLeft === 0) {
        const totalTime = time * 60000;
        setTimeLeft(totalTime);
      }
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 10);
      }, 10);
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <TimerContainer>
      <StyledForm>
        <Label htmlFor="minutes">Minutes:</Label>
        <StyledSelect
          id="minutes"
          name="minutes"
          onChange={handleMinutesChange}
        >
          {minuteOptions}
        </StyledSelect>

        <Label htmlFor="rounds">Rounds:</Label>
        <StyledSelect id="rounds" name="rounds" onChange={handleRoundsChange}>
          {roundOptions}
        </StyledSelect>
      </StyledForm>
      <TimerDisplay id={TimerDisplay}>{formatTime(timeLeft)}</TimerDisplay>
      <div>Rounds Remaining: {numberOfRounds}</div>
      <StyledButtonContainer>
        <Button
          type={isRunning ? "pause" : "start"}
          height={75}
          onClick={handleStart}
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
            type={"submit"}
            width={70}
            onClick={() => {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setTime(0);
              setTimeLeft(0);
              setNumberOfRounds(0);
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
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setTime(0);
              setTimeLeft(0);
              setNumberOfRounds(0);
            }}
          >
            Reset
          </Button>
        </SmallButtonContainer>
      </StyledButtonContainer>
    </TimerContainer>
  );
};

export default XY;
