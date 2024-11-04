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

const Tabata = () => {
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [workTime, setWorkTime] = useState(0);

  const [restTimeLeft, setRestTimeLeft] = useState(0);
  const [workTimeLeft, setWorkTimeLeft] = useState(0);

  const [isWorkPhase, setIsWorkPhase] = useState(true);

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(0);

  const secondOptions = Array.from({ length: 61 }, (_, i) => i).map(
    (second) => (
      <option key={second} value={second}>
        {second}
      </option>
    )
  );

  const roundOptions = Array.from({ length: 10 }, (_, i) => i).map((round) => (
    <option key={round} value={round}>
      {round}
    </option>
  ));

  const handleSecondsRestChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRestTime(Number.parseInt(event.target.value, 10));
  };

  const handleSecondsWorkChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWorkTime(Number.parseInt(event.target.value, 10));
  };

  const handleRoundsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfRounds(Number.parseInt(event.target.value));
  };

  //TO do: clean up this logic. I'm sure there s a better to do it
  useEffect(() => {
    if (isRunning && isWorkPhase && workTimeLeft > 0) {
      // Work phase countdown
      intervalRef.current = setInterval(() => {
        setWorkTimeLeft((prevTime) => prevTime - 10);
      }, 10);
    } else if (isRunning && isWorkPhase && workTimeLeft <= 0) {
      // Switch to resting phase
      clearInterval(intervalRef.current);
      setIsWorkPhase(false);
      setRestTimeLeft(restTime * 1000);
    } else if (isRunning && !isWorkPhase && restTimeLeft > 0) {
      // Rest phase countdown
      intervalRef.current = setInterval(() => {
        setRestTimeLeft((prevTime) => prevTime - 10);
      }, 10);
    } else if (
      isRunning &&
      !isWorkPhase &&
      restTimeLeft <= 0 &&
      numberOfRounds > 1
    ) {
      // Switch to work phase for the next round
      clearInterval(intervalRef.current);
      setIsWorkPhase(true);
      setNumberOfRounds((prevRounds) => prevRounds - 1);
      setWorkTimeLeft(workTime * 1000);
    } else if (
      isRunning &&
      !isWorkPhase &&
      restTimeLeft <= 0 &&
      numberOfRounds === 1
    ) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      // To Do: all rounds completed, add visual cue to user
    }

    return () => clearInterval(intervalRef.current);
  }, [
    isRunning,
    isWorkPhase,
    workTimeLeft,
    restTimeLeft,
    numberOfRounds,
    workTime,
    restTime,
  ]);

  const handleStart = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      if (workTimeLeft === 0 && restTimeLeft === 0) {
        setWorkTimeLeft(workTime * 1000);
        setRestTimeLeft(restTime * 1000);
        setNumberOfRounds(numberOfRounds);
        setIsWorkPhase(true);
      }
      if (isWorkPhase) {
        intervalRef.current = setInterval(() => {
          setWorkTimeLeft((prevTime) => prevTime - 10);
        }, 10);
      } else {
        intervalRef.current = setInterval(() => {
          setRestTimeLeft((prevTime) => prevTime - 10);
        }, 10);
      }
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <TimerContainer>
      <StyledForm>
        <Label htmlFor="seconds">Work in Seconds:</Label>
        <StyledSelect
          id="workSeconds"
          name="workSeconds"
          onChange={handleSecondsWorkChange}
        >
          {secondOptions}
        </StyledSelect>

        <Label htmlFor="seconds">Rest in Seconds:</Label>
        <StyledSelect
          id="restSeconds"
          name="restSeconds"
          onChange={handleSecondsRestChange}
        >
          {secondOptions}
        </StyledSelect>

        <Label htmlFor="rounds">Rounds:</Label>
        <StyledSelect id="rounds" name="rounds" onChange={handleRoundsChange}>
          {roundOptions}
        </StyledSelect>
      </StyledForm>
      <TimerDisplay id={TimerDisplay}>
        {formatTime(isWorkPhase ? workTimeLeft : restTimeLeft)}
      </TimerDisplay>
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
              setRestTime(0);
              setWorkTime(0);
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
              //To do: Make a reset function that can be imported into each timer
              clearInterval(intervalRef.current);
              setIsRunning(false);
              setRestTime(0);
              setWorkTime(0);
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

export default Tabata;
