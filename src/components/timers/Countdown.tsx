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

const Countdown = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(0);

  const hourOptions = Array.from({ length: 25 }, (_, i) => i).map((hour) => (
    <option key={hour} value={hour}>
      {hour}
    </option>
  ));
  const minuteOptions = Array.from({ length: 61 }, (_, i) => i).map(
    (minute) => (
      <option key={minute} value={minute}>
        {minute}
      </option>
    )
  );
  const secondOptions = Array.from({ length: 61 }, (_, i) => i).map(
    (second) => (
      <option key={second} value={second}>
        {second}
      </option>
    )
  );

  const handleHoursChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHours(Number.parseInt(event.target.value, 10));
  };
  const handleMinutesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinutes(Number.parseInt(event.target.value, 10));
  };
  const handleSecondsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSeconds(Number.parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 10);
      }, 10);
      // To Do: Add visual cue to user that the timer has reached 0. Clear out cue on reset.
    } else if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  //To do: disapear the dropdown selection so the user cannot change the selection and on reset show it again.
  const handleStart = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      if (timeLeft === 0) {
        const totalTime = hours * 3600000 + minutes * 60000 + seconds * 1000;
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
        <Label htmlFor="hours">Hour:</Label>
        <StyledSelect id="hours" name="hours" onChange={handleHoursChange}>
          {hourOptions}
        </StyledSelect>
        <Label htmlFor="minutes">Minutes:</Label>
        <StyledSelect
          id="minutes"
          name="minutes"
          onChange={handleMinutesChange}
        >
          {minuteOptions}
        </StyledSelect>
        <Label htmlFor="seconds">Seconds:</Label>
        <StyledSelect
          id="seconds"
          name="seconds"
          onChange={handleSecondsChange}
        >
          {secondOptions}
        </StyledSelect>
      </StyledForm>
      <TimerDisplay id={TimerDisplay}>{formatTime(timeLeft)}</TimerDisplay>
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
            height={50}
            type={"submit"}
            width={70}
            onClick={() => {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setHours(0);
              setMinutes(0);
              setSeconds(0);
              setTimeLeft(0);
            }}
          >
            Fast
            <br /> Forward
          </Button>
          <Button
            type="reset"
            height={50}
            width={70}
            onClick={() => {
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setHours(0);
              setMinutes(0);
              setSeconds(0);
              setTimeLeft(0);
            }}
          >
            Reset
          </Button>
        </SmallButtonContainer>
      </StyledButtonContainer>
    </TimerContainer>
  );
};

export default Countdown;
