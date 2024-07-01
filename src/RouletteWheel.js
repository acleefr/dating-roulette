import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const activities = [
  'Picnic in the Park', 'Coffee Shop Hop', 'Museum or Art Gallery Visit',
  'Cooking Class', 'Bike Ride', 'Movie Marathon', 'Board Games Night',
  'Hiking Adventure', 'Escape Room', 'Local Market Tour',
  'Bookstore Date', 'Live Music or Open Mic Night'
];

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const WheelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Wheel = styled.div`
  width: 300px;
  height: 300px;
  border: 10px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  ${({ spinning, spinDuration }) => spinning && css`
    animation: ${spin} ${spinDuration}s infinite linear;
  `}
`;

const WheelItem = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: ${props => props.color};
  transform-origin: 100% 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  transform: rotate(${props => props.deg}deg) skewY(-30deg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-left: 10px;
  color: white;
  font-weight: bold;
  font-size: 12px;
`;

const InnerCircle = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 24px;
`;

const RouletteWheel = () => {
  const [spinning, setSpinning] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [spinDuration, setSpinDuration] = useState(0);

  const spinWheel = () => {
    setSpinning(true);
    setSelectedActivity('');
    const duration = Math.random() * 3 + 2; // Spin for 2 to 5 seconds
    setSpinDuration(duration);

    setTimeout(() => {
      setSpinning(false);
      const randomIndex = Math.floor(Math.random() * activities.length);
      setSelectedActivity(activities[randomIndex]);
    }, duration * 1000);
  };

  const colors = ['#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57', '#33FFBD', '#33DBFF', '#3375FF', '#5733FF', '#BD33FF', '#FF33DB', '#FF3375'];

  return (
    <WheelContainer>
      <Wheel spinning={spinning} spinDuration={spinDuration}>
        {activities.map((activity, index) => (
          <WheelItem key={index} deg={(index * 360 / activities.length)} color={colors[index % colors.length]}>
            {activity}
          </WheelItem>
        ))}
        <InnerCircle />
      </Wheel>
      <Button onClick={spinWheel}>Spin the Wheel</Button>
      {selectedActivity && <Result>Today's Activity: {selectedActivity}</Result>}
    </WheelContainer>
  );
};

export default RouletteWheel;
