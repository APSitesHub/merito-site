import { useRef, useState } from 'react';
import eyesImg from '../../../img/quiz/eyes.png';
import { CalendarIcon } from '../Attendance/Attendance.styled';
import {
  EyesEmoji,
  PointsPlaceHolder,
  PointsPlaceHolderText,
} from '../Points/Points.styled';
import {
  TimetableBody,
  TimetableBox,
  TimetableChangeCourseBtn,
  TimetableChangeCourseBtnText,
  TimetableDaysCell,
  TimetableDaysItem,
  TimetableHead,
  TimetableHeading,
  TimetableLessonLink,
  TimetableLessonLinkText,
  TimetableLessonType,
  TimeTableList,
  TimeTableListItem,
  TimeTableListItemLink,
  TimetableTable,
  TimetableWebinars,
  TimetableWebinarsHead,
} from './Timetable.styled';

export const Timetable = ({ user, timetable }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [marathonId, setMarathonId] = useState('82851');
  const [isTimetableListOpen, setIsTimetableListOpen] = useState(false);
  const [personalTimetable, setPersonalTimetable] = useState(
    timetable.find(timeline => '82851' === timeline.marathon)
  );
  const timeoutRef = useRef(null); // useRef to store the timeout ID to prevent timeout stacking

  const toggleTimeTableList = () => {
    setIsTimetableListOpen(isTimetableListOpen => !isTimetableListOpen);
  };

  const changeTimetable = id => {
    setIsAnimated(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMarathonId(id);
    setPersonalTimetable(
      personalTimetable =>
        (personalTimetable = timetable.find(
          timeline => id === timeline.marathon
        ))
    );
    setIsTimetableListOpen(false);
    timeoutRef.current = setTimeout(() => {
      setIsAnimated(false);
      timeoutRef.current = null; // Clear the timeout reference after it executes
    }, 3000);
  };

  const getLink = () => {
    const baseStreamUrl = 'https://merito.ap.education/lesson/';

    return marathonId === '82851'
      ? baseStreamUrl + 'logistics'
      : marathonId === '82850'
      ? baseStreamUrl + 'prep'
      : baseStreamUrl + 'automation';
  };

  const link = getLink();

  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <TimetableBox style={{ top: '142px' }}>
      <TimetableHeading>
        <CalendarIcon />
        Class schedule
        <TimetableChangeCourseBtn onClick={toggleTimeTableList}>
          <TimetableChangeCourseBtnText>
            Change course
          </TimetableChangeCourseBtnText>
        </TimetableChangeCourseBtn>
        <TimeTableList className={isTimetableListOpen && 'open'}>
          <TimeTableListItem>
            <TimeTableListItemLink onClick={() => changeTimetable('82851')}>
              Logistics
            </TimeTableListItemLink>
          </TimeTableListItem>
          <TimeTableListItem>
            <TimeTableListItemLink onClick={() => changeTimetable('82850')}>
              Preparation Course
            </TimeTableListItemLink>
          </TimeTableListItem>
          <TimeTableListItem>
            <TimeTableListItemLink onClick={() => changeTimetable('91576')}>
              Industrial Automation
            </TimeTableListItemLink>
          </TimeTableListItem>
        </TimeTableList>
      </TimetableHeading>
      {!personalTimetable ? (
        <PointsPlaceHolder>
          <EyesEmoji src={eyesImg} alt="Eyes emoji" width="80" />
          <PointsPlaceHolderText>
            Looking for your schedule!
          </PointsPlaceHolderText>
          <PointsPlaceHolderText>
            Please, try again later!
          </PointsPlaceHolderText>
        </PointsPlaceHolder>
      ) : (
        <TimetableBody>
          <TimetableWebinars>
            <TimetableWebinarsHead>
              <TimetableLessonType className={isAnimated && 'animated'}>
                {marathonId === '82851'
                  ? 'Logistics'
                  : marathonId === '82850'
                  ? 'Preparation Course'
                  : 'Industrial Automation'}
              </TimetableLessonType>
              <TimetableLessonLink href={link} target="_blank">
                <TimetableLessonLinkText>Go to lesson</TimetableLessonLinkText>
              </TimetableLessonLink>
            </TimetableWebinarsHead>
            <TimetableTable>
              <thead>
                <tr>
                  <TimetableHead className="day">Day</TimetableHead>
                  <TimetableHead className="time">Time</TimetableHead>
                  <TimetableHead className="lessonNumber">
                    Lesson №
                  </TimetableHead>
                  <TimetableHead className="topic">Topic</TimetableHead>
                </tr>
              </thead>
              <tbody>
                {personalTimetable.schedule
                  .filter(
                    lesson =>
                      lesson.type.toLowerCase() === 'webinar' ||
                      lesson.type.toLowerCase() === 'webinar, repeat'
                  )
                  .sort((a, b) => a.day - b.day)
                  .map((lesson, i) => (
                    <TimetableDaysItem
                      key={i}
                      style={
                        lesson.day === new Date().getDay()
                          ? { backgroundColor: '#0088f780' }
                          : {}
                      }
                    >
                      <TimetableDaysCell className="day">
                        {DAYS[lesson.day - 1]}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="time">
                        {lesson.time}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="lessonNumber">
                        {lesson.lessonNumber}
                      </TimetableDaysCell>
                      <TimetableDaysCell className="topic">
                        {lesson.topic}
                      </TimetableDaysCell>
                    </TimetableDaysItem>
                  ))}
              </tbody>
            </TimetableTable>
          </TimetableWebinars>{' '}
        </TimetableBody>
      )}
    </TimetableBox>
  );
};
