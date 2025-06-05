import { nanoid } from 'nanoid';
import { useState } from 'react';
import eyesImg from '../../../img/quiz/eyes.png';
import {
  CupIcon,
  EyesEmoji,
  LeaderPlace,
  PointsBox,
  PointsBoxHeading,
  PointsCategory,
  PointsCategoryPicker,
  PointsCategoryPointer,
  PointsLeader,
  PointsLeaderboard,
  PointsPlaceHolder,
  PointsPlaceHolderText,
  PointsTableHead,
  PointsTableHeadItem,
  PointsTableHeadItemWide,
  PointsUser,
  PointsUserData,
  PointsUserDataWide,
  UserPlace,
} from './Points.styled';

export const PointsPl = ({
  user,
  flatPoints,
  flatMonthlyPoints,
  isMultipleLanguages,
}) => {
  const [position, setPosition] = useState('0%');
  const [activeRating, setActiveRating] = useState(0);

  const pointsSorted =
    activeRating > 0
      ? flatMonthlyPoints.sort((a, b) => b.points - a.points)
      : flatPoints.sort((a, b) => b.points - a.points);

  const userPlace = pointsSorted.findIndex(
    leader => leader.name.toLowerCase() === 'dev acc'
  );

  const calculatePointerPosition = i => {
    setPosition(position => (position = `${i * 100}%`));
    setActiveRating(i);
  };

  return (
    <PointsBox style={{ top: '145px' }}>
      <PointsBoxHeading>
        <CupIcon/>
        Ranking
      </PointsBoxHeading>
      {userPlace === -1 ? (
        <PointsPlaceHolder>
          <EyesEmoji src={eyesImg} alt="Eyes emoji" width="80" />
          <PointsPlaceHolderText>Szukamy was w rankingu.</PointsPlaceHolderText>
          <PointsPlaceHolderText>
            Proszę zrobić jeszcze kilka zadań, <br /> żeby być w topie 🤩
          </PointsPlaceHolderText>
        </PointsPlaceHolder>
      ) : (
        <>
          <PointsCategoryPicker>
            <PointsCategoryPointer style={{ transform: `translateX(${position})` }} />
            <PointsCategory
              onClick={() => {
                calculatePointerPosition(0);
              }}
              className={activeRating === 0 && 'active'}
            >
              Ogólny
            </PointsCategory>
            <PointsCategory
              onClick={() => {
                calculatePointerPosition(1);
              }}
              className={activeRating === 1 && 'active'}
            >
              Miesięczny
            </PointsCategory>
          </PointsCategoryPicker>
          <PointsTableHead>
            <PointsTableHeadItem>Miejsce</PointsTableHeadItem>
            <PointsTableHeadItemWide>Imię i nazwisko</PointsTableHeadItemWide>
            <PointsTableHeadItem>Punkty</PointsTableHeadItem>
          </PointsTableHead>
          <PointsUser>
            <PointsUserData>
              {pointsSorted.findIndex(leader => leader.name.toLowerCase() === 'dev acc') +
                1}
            </PointsUserData>
            <PointsUserDataWide>Student</PointsUserDataWide>
            <PointsUserData>
              {pointsSorted[userPlace].points < 0 ? 0 : pointsSorted[userPlace].points}
            </PointsUserData>
          </PointsUser>
          <PointsLeaderboard>
            {pointsSorted.slice(0, 10).map((leader, i) => (
              <PointsLeader key={nanoid(8)}>
                {i <= 2 ? (
                  <LeaderPlace>{i + 1}</LeaderPlace>
                ) : (
                  <UserPlace>{i + 1}</UserPlace>
                )}
                <PointsUserDataWide>{leader.name}</PointsUserDataWide>
                <PointsUserData>{leader.points}</PointsUserData>
              </PointsLeader>
            ))}
          </PointsLeaderboard>
        </>
      )}
    </PointsBox>
  );
};
