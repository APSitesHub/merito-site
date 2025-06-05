import axios from 'axios';
import { nanoid } from 'nanoid';
import { useLayoutEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import {
  SupportClipBoardAdd,
  SupportClipBoardCopy,
  SupportKahootPickerIcon,
  SupportNameReverse,
} from '../Support/Support.styled';
import {
  ClipBoardAdd,
  ClipBoardBtn,
  ClipBoardCopy,
  ClipBoardFormDismissBtn,
  ClipBoardFormText,
  ClipBoardInput,
  ClipBoardInputForm,
  ClipBoardNotification,
  ClipBoardSubmitBtn,
  DismissIcon,
  KahootBackground,
  KahootBox,
  KahootDisclaimerBackground,
  KahootDisclaimerBox,
  KahootDisclaimerHeader,
  KahootDisclaimerItem,
  KahootDisclaimerList,
  KahootDisclaimerText,
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
  KahootNameValidation,
  KahootNumbersBtn,
  KahootNumbersHider,
  KahootPicker,
  KahootPickerBtn,
  NameReverse,
  NameReverseBtn,
} from './Kahoots.styled';

export const Kahoots = ({
  sectionWidth,
  sectionHeight,
  isKahootOpen,
  isChatOpen,
  isOpenedLast,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isAnimated, setIsAnimated] = useState(true);
  const [username, setUsername] = useState(
    localStorage.getItem('userName') || ''
  );
  const [kahoots, setKahoots] = useState({});
  const [activeKahoot, setActiveKahoot] = useState(0);

  let location = useLocation();

  const { ref, inView } = useInView({
    triggerOnce: true,
    delay: 1000,
  });

  const trialsSwitch = path => {
    switch (path) {
      case 'a1free':
        return 'a1kidsfree';
      case 'pilot':
        return 'deutsch';
      case 'b1beginner':
        return 'b1kidsbeginner';
      case 'b2beginner':
        return 'b2kidsbeginner';
      case 'trendets':
        return 'trendets';
      case 'pilot-a1':
        return 'a1';
      case 'test1':
        return 'test';
      case 'trial-en':
        return 'trials';
      case 'trial-de':
        return 'trials_de';
      case 'trial-pl':
        return 'trials_pl';
      case 'trial-kids':
        return 'trials_kids';
      default:
        break;
    }
  };

  const page =
    location.pathname.includes('pilot') ||
    location.pathname.includes('beginner') ||
    location.pathname.includes('trendets') ||
    (location.pathname.includes('streams-kids') &&
      location.pathname.includes('free'))
      ? trialsSwitch(location.pathname.match(/\/([^/]+)\/?$/)[1])
      : location.pathname.includes('preschool')
      ? location.pathname.match(/\/([^/]+)\/?$/)[1]
      : location.pathname.includes('pre') ||
        location.pathname.includes('beg') ||
        location.pathname.includes('mid') ||
        location.pathname.includes('high')
      ? 'kids' + location.pathname.match(/\/([^/]+)\/?$/)[1]
      : location.pathname.includes('streams-kids')
      ? location.pathname.match(/\/([^/]+)\/?$/)[1] + 'kids'
      : location.pathname.includes('trial') ||
        location.pathname.includes('pilot') ||
        location.pathname.includes('test1')
      ? trialsSwitch(location.pathname.match(/\/([^/]+)\/?$/)[1])
      : location.pathname.match(/\/([^/]+)\/?$/)[1];

  console.log(111, page);

  const kahootWidth = isFullScreen ? sectionWidth : (sectionWidth / 10) * 4;

  const getLinksForLocation = () => {
    const entries = [];
    Object.values(kahoots[page].links).map(entry => {
      entries.push(entry);
      return entries;
    });
    return entries;
  };

  const kahootLinksRefresher = async e => {
    if (e.target === e.currentTarget) {
      setKahoots((await axios.get('/unikahoots')).data);
    }
  };

  const setKahootNumber = async e => {
    const kahootNumber = parseInt(e.currentTarget.innerText);
    setKahoots((await axios.get('/unikahoots')).data);
    setActiveKahoot(kahootNumber);
  };

  useLayoutEffect(() => {
    const getLinksRequest = async () => {
      try {
        setKahoots((await axios.get('/unikahoots')).data);
      } catch (error) {
        console.log(error);
      }
    };

    getLinksRequest();
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  const toggleKahootPicker = () => {
    setIsAnimated(false);
    setIsPickerOpen(isOpen => (isOpen = !isOpen));
    setActiveKahoot(1);
  };

  const disableEnter = e => (e.key === 'Enter' ? e.preventDefault() : null);

  const createNameInput = btn => {
    btn.disabled = true;
    document.addEventListener('keydown', disableEnter);
    toast(
      t => (
        <ClipBoardInputForm
          onSubmit={async e => {
            e.preventDefault();
            const userName = localStorage.getItem('userName');
            if (!userName) {
              createValidationEmptyInput();
              return;
            } else if (userName.trim().trimStart().split(' ').length < 2) {
              createValidationNotEnoughWords();
              return;
            } else {
              toast.dismiss(t.id);
              document.removeEventListener('keydown', disableEnter);
              setUsername(
                username => (username = localStorage.getItem('userName'))
              );
              btn.disabled = false;
              if (localStorage.getItem('userName')) {
                copyToClipboard(btn);
              }
              localStorage.setItem('userID', nanoid(8));
            }
          }}
        >
          <ClipBoardFormDismissBtn
            onClick={e => {
              e.preventDefault();
              toast.dismiss(t.id);
              btn.disabled = false;
              document.removeEventListener('keydown', disableEnter);
            }}
          >
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <ClipBoardFormText>
            Wpisz swoje imię w to pole, aby nie musieć wpisywać go kilka razy
            podczas lekcji.
          </ClipBoardFormText>
          <ClipBoardFormText>
            Proszę, wpisz pełne imię i nazwisko bez skrótów, abyśmy mogli
            prawidłowo zaliczyć Twoje punkty!
          </ClipBoardFormText>
          <ClipBoardInput
            name="username"
            placeholder="Imię"
            defaultValue={localStorage.getItem('userName')}
            onChange={e => {
              if (e.target.value) {
                localStorage.setItem('userName', e.target.value);
              }
            }}
          />
          <ClipBoardSubmitBtn>Zapisz</ClipBoardSubmitBtn>
        </ClipBoardInputForm>
      ),
      { duration: Infinity }
    );
  };

  const createValidationEmptyInput = () => {
    toast.error(
      t => (
        <>
          <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <KahootNameValidation>
            Imię i nazwisko są obowiązkowe!
          </KahootNameValidation>
        </>
      ),
      { duration: 1500 }
    );
  };

  const createValidationNotEnoughWords = () => {
    toast.error(
      t => (
        <>
          <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
            <DismissIcon />
          </ClipBoardFormDismissBtn>
          <KahootNameValidation>
            Imię i nazwisko, proszę, 2 słowa!
          </KahootNameValidation>
        </>
      ),
      { duration: 1500 }
    );
  };

  const copyToClipboard = btn => {
    navigator.clipboard.writeText(localStorage.getItem('userName'));
    toast.success(
      t => (
        <ClipBoardNotification>
          <ClipBoardFormText>
            <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </ClipBoardFormDismissBtn>
            {`${localStorage.getItem('userName')}`}, Twoje imię zostało dodane
            do schowka, możesz wkleić je w odpowiednie pole!
          </ClipBoardFormText>

          <ClipBoardFormText>
            Przypadkowo popełniłeś błąd? Kliknij ten przycisk:{' '}
          </ClipBoardFormText>
          <ClipBoardSubmitBtn
            onClick={() => {
              toast.dismiss(t.id);
              createNameInput(btn);
            }}
          >
            Popraw błąd
          </ClipBoardSubmitBtn>
        </ClipBoardNotification>
      ),
      { duration: 3000 }
    );
  };

  const reverseAndCopyToClipboard = btn => {
    toast.dismiss();
    navigator.clipboard.writeText(localStorage.getItem('userName'));
    toast.success(
      t => (
        <ClipBoardNotification>
          <ClipBoardFormText>
            <ClipBoardFormDismissBtn onClick={() => toast.dismiss(t.id)}>
              <DismissIcon />
            </ClipBoardFormDismissBtn>
            {`${localStorage.getItem('userName')}`}, Twoje imię i nazwisko
            zostały dodane do schowka w odwrotnej kolejności, możesz wkleić je w
            odpowiednie pole i spróbować dołączyć do Kahoota ponownie!
          </ClipBoardFormText>

          <ClipBoardFormText>
            Trzeba poprawić błąd? Kliknij ten przycisk:{' '}
          </ClipBoardFormText>

          <ClipBoardSubmitBtn
            onClick={() => {
              toast.dismiss(t.id);
              createNameInput(btn);
            }}
          >
            Popraw błąd
          </ClipBoardSubmitBtn>
        </ClipBoardNotification>
      ),
      { duration: 3000 }
    );
  };

  const handleUsernameBtn = e => {
    const btn = e.currentTarget;
    username ? copyToClipboard(btn) : createNameInput(btn);
  };

  const handleUsernameReverseBtn = e => {
    const reverseUsername = username
      .trim()
      .trimStart()
      .split(' ')
      .reverse()
      .join(' ');
    localStorage.setItem('userName', reverseUsername);
    setUsername(username => (username = reverseUsername));
    reverseAndCopyToClipboard(e.currentTarget);
  };

  return (
    <>
      {Object.keys(kahoots).length && (
        <KahootBox
          ref={ref}
          className={isKahootOpen ? 'shown' : 'hidden'}
          style={{
            zIndex: isOpenedLast === 'kahoot' ? '3' : '1',
            width: isChatOpen ? kahootWidth - 300 : kahootWidth,
            height: sectionHeight,
          }}
          onTransitionEnd={kahootLinksRefresher}
        >
          <KahootNumbersHider
            onClick={toggleKahootPicker}
            className={inView && isAnimated ? 'animated' : ''}
            tabIndex={-1}
          >
            <KahootPickerBtn />
          </KahootNumbersHider>
          <KahootPicker className={isPickerOpen ? 'shown' : 'hidden'}>
            {Object.values(kahoots[page].links).map((link, i) => (
              <KahootNumbersBtn
                key={i}
                onClick={setKahootNumber}
                className={activeKahoot === i + 1 ? 'active' : ''}
                tabIndex={-1}
              >
                {i + 1}
              </KahootNumbersBtn>
            ))}
          </KahootPicker>
          {username && (
            <NameReverseBtn
              tabIndex={-1}
              onClick={e => handleUsernameReverseBtn(e)}
            >
              <NameReverse />
            </NameReverseBtn>
          )}
          {activeKahoot ? (
            getLinksForLocation().map(
              (link, i) =>
                activeKahoot === i + 1 && (
                  <KahootBackground key={i}>
                    <iframe
                      id="kahoot-window"
                      title="kahoot-pin"
                      src={link}
                      width={
                        !isChatOpen
                          ? kahootWidth
                          : isFullScreen
                          ? kahootWidth - 300
                          : kahootWidth
                      }
                      height={sectionHeight}
                    ></iframe>
                    <KahootFullScreenBtn onClick={toggleFullScreen}>
                      {isFullScreen ? (
                        <KahootExitFullScreenIcon />
                      ) : (
                        <KahootFullScreenIcon />
                      )}
                    </KahootFullScreenBtn>
                    <ClipBoardBtn onClick={handleUsernameBtn}>
                      {username ? <ClipBoardCopy /> : <ClipBoardAdd />}
                    </ClipBoardBtn>
                  </KahootBackground>
                )
            )
          ) : (
            <KahootDisclaimerBackground
              style={
                !isChatOpen
                  ? { width: `${kahootWidth}px` }
                  : isFullScreen
                  ? { width: `${kahootWidth - 300}px` }
                  : { width: `${kahootWidth}px` }
              }
            >
              <KahootDisclaimerBox>
                <KahootDisclaimerHeader>
                  Cześć! To jest okno Kahootów.
                </KahootDisclaimerHeader>
                <KahootDisclaimerText>
                  Stale pracujemy nad rozszerzaniem funkcjonalności naszej
                  strony, aby Twoje zajęcia były dla Ciebie przyjemnym
                  doświadczeniem, dlatego wprowadziliśmy kilka ważnych zmian:
                </KahootDisclaimerText>
                <KahootDisclaimerList>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Nie musisz już wpisywać kodu Kahoota, bo zrobiliśmy to za
                      Ciebie. Po prostu kliknij przycisk{' '}
                      <SupportKahootPickerIcon /> w prawym górnym rogu tego okna
                      i wybierz numer Kahoota. Zacznij od pierwszego. 😉
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Nie musisz już za każdym razem wpisywać swojego imienia.
                      Kliknij przycisk <SupportClipBoardAdd /> i wpisz w małym
                      okienku swoje imię (nie zapomnij o naszych zaleceniach).
                      Możesz wpisać swoje pełne imię i nazwisko (np.: Włodymyr
                      Zełenski), Kahoot automatycznie obetnie zbędne litery
                      (wyjdzie: Włodymyr Zełen). Po wpisaniu kliknij przycisk
                      "Zapisz" i Twoje imię zostanie zapisane do schowka, a
                      przycisk będzie wyglądał tak: <SupportClipBoardCopy />.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>{' '}
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Teraz po kliknięciu tego przycisku możesz szybko skopiować
                      swoje imię i po prostu wkleić je w pole Kahoota. Jeśli
                      popełniłeś błąd wpisując swoje imię, możesz w każdej
                      chwili kliknąć przycisk <SupportClipBoardCopy />, a w
                      okienku, które się otworzy, przycisk "Popraw", po czym
                      wpisz imię ponownie.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                  <KahootDisclaimerItem>
                    <KahootDisclaimerText>
                      Jeśli z jakiegoś powodu zostałeś wyrzucony z Kahoota i nie
                      możesz wrócić z tym samym imieniem, kliknij przycisk{' '}
                      <SupportNameReverse />, on zapisze Twoje imię i nazwisko w
                      odwrotnej kolejności, co pozwoli Ci szybko dołączyć do
                      Kahoota pod "nowym" imieniem.
                    </KahootDisclaimerText>
                  </KahootDisclaimerItem>
                </KahootDisclaimerList>
              </KahootDisclaimerBox>
              <KahootFullScreenBtn onClick={toggleFullScreen} tabIndex={-1}>
                {isFullScreen ? (
                  <KahootExitFullScreenIcon />
                ) : (
                  <KahootFullScreenIcon />
                )}
              </KahootFullScreenBtn>
              <ClipBoardBtn tabIndex={-1} onClick={e => handleUsernameBtn(e)}>
                {username ? <ClipBoardCopy /> : <ClipBoardAdd />}
              </ClipBoardBtn>
            </KahootDisclaimerBackground>
          )}
        </KahootBox>
      )}
    </>
  );
};
