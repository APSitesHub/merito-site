import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { ReactComponent as PdfIcon } from '../../../img/svg/pdf-icon.svg';

import {
  ExternalLinkIcon,
  FaqBox,
  FaqFinderIcon,
  FaqFinderInput,
  FaqFinderLabel,
  FaqList,
  FaqListDescription,
  FaqListItem,
  FaqListLink,
  FaqListQuestionMark,
  FaqListQuestionMarkBG,
  FaqListTrigger,
  FaqPreviewBackground,
  FaqQuestion,
  FaqSwitchDown,
  FaqSwitchUp,
  FinderBox,
  FinderIcon,
  FinderInput,
  FinderLabel,
  FinderLessons,
  FinderMolding,
  InternalLinkIcon,
  LessonBox,
  LessonBoxItem,
  LessonExternalLinkButton,
  LessonInternalLinkButton,
  LessonLinksBox,
  LessonTextValuesBox,
  LessonTopBox,
  LessonValueName,
  LessonValuePdfLink,
  LessonValueTopic,
  LessonValuesLogo,
  LessonVideoBox,
  PdfBox,
  PdfPreview,
  PdfPreviewBackground,
  PdfWrapper,
} from './LessonFinder.styled';

export const LessonFinder = ({
  lessons,
  language,
  user,
  setPlatformIframeLink,
  isMultipleLanguages,
}) => {
  const [lessonsFound, setLessonsFound] = useState([]);
  const [visibleLessons, setVisibleLessons] = useState([]);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [openedPdf, setOpenedPdf] = useState('');
  const [isFaqListOpen, setIsFaqListOpen] = useState(false);
  const [openedFaq, setOpenedFaq] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answersFound, setAnswersFound] = useState([]);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [openedAnswer, setOpenedAnswer] = useState(0);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const loadMoreRef = useRef(null);

  const path = window.location.origin + window.location.pathname;

  const findLesson = e => {
    setIsFaqListOpen(false);
    setOpenedFaq('');
    setAnswers([]);
    setAnswersFound([]);
    const value = e.target.value;
    value !== ''
      ? setLessonsFound(
          lessonsFound =>
            (lessonsFound = [
              ...lessons.filter(lesson => {
                const lessonLevelNumber =
                  lesson.level +
                  ' ' +
                  lesson.lesson
                    .replace('Lesson', '')
                    .replace('Lekcja', '')
                    .replace('Unterricht', '')
                    .trim()
                    .trimStart();
                return (
                  (lesson.keysEn
                    .toLowerCase()
                    .includes(value.toLowerCase().trim().trimStart()) ||
                    lesson.keysUa
                      .toLowerCase()
                      .includes(value.toLowerCase().trim().trimStart()) ||
                    lesson.topic
                      .toLowerCase()
                      .includes(value.toLowerCase().trim().trimStart()) ||
                    lesson.lesson
                      .toLowerCase()
                      .includes(value.toLowerCase().trim().trimStart()) ||
                    lesson.level
                      .toLowerCase()
                      .includes(value.toLowerCase().trim().trimStart()) ||
                    lessonLevelNumber
                      .toLowerCase()
                      .includes(value.toLowerCase().trim().trimStart())) &&
                  language === lesson.lang
                );
              }),
            ])
        )
      : setLessonsFound(
          lessonsFound =>
            (lessonsFound = [...lessons.filter(lesson => language === lesson.lang)])
        );
    sessionStorage.setItem('searchValue', value);
  };

  const findAnswer = e => {
    const value = e.target.value;
    value !== '' ? setIsInputEmpty(false) : setIsInputEmpty(true);
    value !== ''
      ? setAnswersFound(
          answersFound =>
            (answersFound = [
              ...answers.filter(
                answer =>
                  answer.question
                    .toLowerCase()
                    .includes(value.toLowerCase().trim().trimStart()) ||
                  answer.exercise
                    .toLowerCase()
                    .includes(value.toLowerCase().trim().trimStart())
              ),
            ])
        )
      : setAnswersFound(answersFound => (answersFound = [...answers]));
  };

  const toggleTooltip = e => {
    e.currentTarget.classList.toggle('tooltip-open');
  };

  const togglePdfPreviewOnTouch = pdfId => {
    const pdfOpener = pdfId => {
      console.log('opener');
      setOpenedPdf(pdf => (pdf = pdfId));
      setIsPdfPreviewOpen(isOpen => !isOpen);
    };

    setOpenedPdf(pdfId);
    isPdfPreviewOpen && pdfId !== openedPdf
      ? setOpenedPdf(pdf => (pdf = pdfId))
      : !isPdfPreviewOpen && pdfId === openedPdf
      ? setIsPdfPreviewOpen(isOpen => !isOpen)
      : isPdfPreviewOpen && pdfId === openedPdf
      ? setIsPdfPreviewOpen(isOpen => !isOpen)
      : pdfOpener(pdfId);
  };

  const openPdfPreviewOnHover = e => {
    setOpenedPdf(pdf => (pdf = e.target.id));
    if (!isPdfPreviewOpen) {
      setIsPdfPreviewOpen(isOpen => !isOpen);
    }
  };

  const closePdfPreviewOnMouseOut = () => {
    console.log('mouse out?');
    setOpenedPdf(pdf => (pdf = ''));
    if (isPdfPreviewOpen) {
      setIsPdfPreviewOpen(isOpen => !isOpen);
    }
  };

  const toggleFaq = lesson => {
    setIsFaqListOpen(isOpen => !isOpen);
    setAnswers(answers => (answers = [...lesson.faq]));
    setAnswersFound(answersFound => (answersFound = [...lesson.faq]));
    setOpenedFaq(openedFaq => (openedFaq = lesson._id));
  };

  const openAnswer = i => {
    setOpenedAnswer(i);
    setIsAnswerOpen(isOpen => !isOpen);
  };

  const toggleAnswer = i =>
    isAnswerOpen && i !== openedAnswer
      ? setOpenedAnswer(i)
      : !isAnswerOpen && i === openedAnswer
      ? setIsAnswerOpen(isOpen => !isOpen)
      : isAnswerOpen && i === openedAnswer
      ? setIsAnswerOpen(isOpen => !isOpen)
      : openAnswer(i);

  useEffect(() => {
    setVisibleLessons(lessonsFound.slice(0, 5));
  }, [lessonsFound]);

  useEffect(() => {
    const loadMoreLessons = () => {
      setVisibleLessons(prev => {
        const nextIndex = prev.length;
        return [...prev, ...lessonsFound.slice(nextIndex, nextIndex + 5)];
      });
    };

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreLessons();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // added to prevent loading non-exisiting lessons when scrolled to the end of the list
    if (loadMoreRef.current && lessonsFound.length === visibleLessons.length) {
      observer.unobserve(loadMoreRef.current);
    }

    const observerRef = loadMoreRef.current;

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [visibleLessons, lessonsFound]);

  return (
    <FinderBox
      className={lessonsFound.length === 0 && 'nothing-found'}
      style={{ top: '145px' }}
    >
      <FinderLabel>
        <FinderIcon />
        <FinderInput
          value={
            sessionStorage.getItem('searchValue')
              ? sessionStorage.getItem('searchValue')
              : ''
          }
          autoFocus={sessionStorage.getItem('searchValue') && true}
          onFocus={sessionStorage.getItem('searchValue') && findLesson}
          onChange={findLesson}
          placeholder="Введіть номер або тему уроку"
        />
      </FinderLabel>

      {lessonsFound.length !== 0 && (
        <>
          <FinderLessons>
            <LessonBox>
              {visibleLessons.map(lesson => (
                <LessonBoxItem key={lesson._id}>
                  <LessonTopBox>
                    <LessonValuesLogo>
                      {lesson.level + ' - ' + lesson.lesson.match(/\d+/)}
                    </LessonValuesLogo>
                    <LessonTextValuesBox>
                      <LessonValueName>
                        {lesson.level} {lesson.lesson}
                      </LessonValueName>
                      <LessonLinksBox>
                        <LessonInternalLinkButton
                          onMouseEnter={e => toggleTooltip(e)}
                          onMouseOut={e => toggleTooltip(e)}
                          onClick={() => {
                            setPlatformIframeLink(
                              `https://online.ap.education/MarathonClass/?marathonId=${lesson.marathonId}&pupilId=${user.pupilId}&marathonLessonId=${lesson.lessonId}`
                            );
                          }}
                        >
                          <InternalLinkIcon />
                        </LessonInternalLinkButton>
                        <LessonExternalLinkButton
                          onMouseEnter={e => toggleTooltip(e)}
                          onMouseOut={e => toggleTooltip(e)}
                          onClick={() => {
                            window.open(
                              `${path}?https://online.ap.education/MarathonClass/?marathonId=${lesson.marathonId}&pupilId=${user.pupilId}&marathonLessonId=${lesson.lessonId}`,
                              '_blank'
                            );
                          }}
                        >
                          <ExternalLinkIcon />
                        </LessonExternalLinkButton>
                      </LessonLinksBox>
                      <LessonValueTopic>{lesson.topic}</LessonValueTopic>
                    </LessonTextValuesBox>
                  </LessonTopBox>
                  {lesson.video[0] && (
                    <LessonVideoBox>
                      <ReactPlayer
                        loop={true}
                        muted={false}
                        controls={true}
                        style={{
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                        width="100%"
                        height="100%"
                        url={lesson.video[0]}
                      />
                    </LessonVideoBox>
                  )}
                  {lesson.pdf.length > 0 && (
                    <PdfBox onMouseLeave={closePdfPreviewOnMouseOut}>
                      {lesson.pdf.map((pdf, i) => (
                        <>
                          <PdfWrapper
                            key={pdf}
                            id={pdf}
                            onMouseEnter={e => openPdfPreviewOnHover(e)}
                            onTouchEnd={() => togglePdfPreviewOnTouch(pdf)}
                          >
                            <PdfIcon />
                            <LessonValuePdfLink
                              target="_blank"
                              rel="noopener noreferrer"
                              to={parse(pdf)}
                              key={i}
                            >
                              Граматика {i + 1}
                              <ExternalLinkIcon />
                            </LessonValuePdfLink>
                          </PdfWrapper>
                          <PdfPreviewBackground
                            className={
                              isPdfPreviewOpen && openedPdf === pdf && 'preview-open'
                            }
                          >
                            {isPdfPreviewOpen && openedPdf === pdf && (
                              <PdfPreview
                                title={`Preview of ${pdf}`}
                                src={pdf
                                  .replace('open?id=', 'file/d/')
                                  .replace('view', 'preview')
                                  .replace('&usp=drive_copy', '/preview')}
                                allow="autoplay"
                              ></PdfPreview>
                            )}
                          </PdfPreviewBackground>
                        </>
                      ))}
                    </PdfBox>
                  )}
                  {lesson.faq.length > 0 && (
                    <FaqBox>
                      <FaqListTrigger onClick={() => toggleFaq(lesson)}>
                        <FaqListDescription>
                          <FaqListQuestionMarkBG>
                            <FaqListQuestionMark>?</FaqListQuestionMark>
                          </FaqListQuestionMarkBG>
                          FAQ{' '}
                        </FaqListDescription>
                        {isFaqListOpen ? <FaqSwitchUp /> : <FaqSwitchDown />}
                      </FaqListTrigger>

                      <FaqFinderLabel
                        className={
                          isFaqListOpen && openedFaq === lesson._id && 'faqlistopen'
                        }
                      >
                        <FaqFinderInput
                          onChange={findAnswer}
                          placeholder="Введіть номер вправи або ваше питання"
                          className={!isInputEmpty && 'not-empty'}
                        />
                        <FaqFinderIcon />
                      </FaqFinderLabel>
                      <FaqList
                        className={
                          isFaqListOpen && openedFaq === lesson._id && 'faqlistopen'
                        }
                      >
                        {answersFound.map((q, i) => (
                          <FaqListItem key={i}>
                            <FaqListLink onClick={() => toggleAnswer(i)}>
                              {q.exercise}
                            </FaqListLink>
                            <FaqQuestion
                              className={
                                isAnswerOpen && openedAnswer === i && 'preview-open'
                              }
                            >
                              {q.question}
                            </FaqQuestion>
                            <FaqPreviewBackground
                              className={
                                isAnswerOpen && openedAnswer === i && 'preview-open'
                              }
                            >
                              {isAnswerOpen && openedAnswer === i && (
                                <LessonVideoBox>
                                  <ReactPlayer
                                    loop={true}
                                    muted={false}
                                    controls={true}
                                    style={{
                                      display: 'block',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                    }}
                                    width="100%"
                                    height="100%"
                                    url={q.answer}
                                  />
                                </LessonVideoBox>
                              )}
                            </FaqPreviewBackground>
                          </FaqListItem>
                        ))}
                      </FaqList>
                    </FaqBox>
                  )}
                </LessonBoxItem>
              ))}
            </LessonBox>
            <div ref={loadMoreRef} style={{ height: '10px' }}></div>
          </FinderLessons>
          <FinderMolding />
        </>
      )}
    </FinderBox>
  );
};
