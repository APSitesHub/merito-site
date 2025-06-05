import logo from '../../img/svg/logoNew.png';
import axios from 'axios';
import { FormBtnText, Label } from 'components/LeadForm/LeadForm.styled';
import {
  LoginFormText,
  LoginLogo,
  StreamAuthTextHello,
  StreamSection,
} from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { MyPlatform } from './My Platform/MyPlatform';
import { MyMeritoPanel } from './MyMeritoPanel/MyMeritoPanel';
import { LoginErrorNote } from './MyMeritoPanel/MyMeritoPanel.styled';
import { useLocation } from 'react-router-dom';

const monthly = [
  { name: 'Adam Nowak', points: 327 },
  { name: 'Bartosz Kowalski', points: 458 },
  { name: 'Cezary Wiśniewski', points: 783 },
  { name: 'Damian Wójcik', points: 604 },
  { name: 'Emil Kamiński', points: 536 },
  { name: 'Filip Lewandowski', points: 918 },
  { name: 'Grzegorz Zieliński', points: 629 },
  { name: 'Hubert Szymański', points: 705 },
  { name: 'Igor Woźniak', points: 847 },
  { name: 'Jakub Dąbrowski', points: 509 },
  { name: 'Kamil Kozłowski', points: 987 },
  { name: 'Łukasz Jankowski', points: 734 },
  { name: 'Mateusz Mazur', points: 685 },
  { name: 'Norbert Kwiatkowski', points: 595 },
  { name: 'Olaf Piotrowski', points: 819 },
  { name: 'Patryk Grabowski', points: 914 },
  { name: 'Robert Pawłowski', points: 727 },
  { name: 'Szymon Michalski', points: 664 },
  { name: 'Tomasz Król', points: 874 },
  { name: 'Uriel Wieczorek', points: 765 },
  { name: 'Wojciech Jastrzębski', points: 886 },
  { name: 'Zbigniew Tomczak', points: 547 },
  { name: 'Artur Jarosz', points: 924 },
  { name: 'Borys Malinowski', points: 586 },
  { name: 'Daniel Gajewski', points: 746 },
  { name: 'Edward Krupa', points: 618 },
  { name: 'Fryderyk Brzeziński', points: 674 },
  { name: 'Gustaw Stępień', points: 758 },
  { name: 'Henryk Wróbel', points: 879 },
  { name: 'Ireneusz Lis', points: 995 },
  { name: 'Dev Acc', points: 747 },
];

const yearly = [
  { name: 'Adam Nowak', points: 2413 },
  { name: 'Bartosz Kowalski', points: 3129 },
  { name: 'Cezary Wiśniewski', points: 4217 },
  { name: 'Damian Wójcik', points: 2728 },
  { name: 'Emil Kamiński', points: 3514 },
  { name: 'Filip Lewandowski', points: 4619 },
  { name: 'Grzegorz Zieliński', points: 3012 },
  { name: 'Hubert Szymański', points: 3716 },
  { name: 'Igor Woźniak', points: 4328 },
  { name: 'Jakub Dąbrowski', points: 2915 },
  { name: 'Kamil Kozłowski', points: 4823 },
  { name: 'Łukasz Jankowski', points: 4118 },
  { name: 'Mateusz Mazur', points: 3611 },
  { name: 'Norbert Kwiatkowski', points: 2832 },
  { name: 'Olaf Piotrowski', points: 4427 },
  { name: 'Patryk Grabowski', points: 4715 },
  { name: 'Robert Pawłowski', points: 3936 },
  { name: 'Szymon Michalski', points: 3421 },
  { name: 'Tomasz Król', points: 4533 },
  { name: 'Uriel Wieczorek', points: 4029 },
  { name: 'Wojciech Jastrzębski', points: 4578 },
  { name: 'Zbigniew Tomczak', points: 3219 },
  { name: 'Artur Jarosz', points: 4832 },
  { name: 'Borys Malinowski', points: 3134 },
  { name: 'Daniel Gajewski', points: 4075 },
  { name: 'Edward Krupa', points: 2931 },
  { name: 'Fryderyk Brzeziński', points: 3562 },
  { name: 'Gustaw Stępień', points: 3971 },
  { name: 'Henryk Wróbel', points: 4526 },
  { name: 'Ireneusz Lis', points: 4918 },
  { name: 'Dev Acc', points: 3178 },
];

const MyMerito = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [timetable, setTimetable] = useState({});
  const [user, setUser] = useState({});
  const [points, setPoints] = useState({});
  const [montlyPoints, setMonthlyPoints] = useState({});
  const [lessons, setLessons] = useState(false);
  const [platformLink, setPlatformLink] = useState(
    `https://online.ap.education/`
  );
  const [isUserInfoIncorrect, setIsUserInfoIncorrect] = useState(false);
  const location = useLocation();

  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

  useEffect(() => {
    document.title = 'My Merito | Merito';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post('/uniusers/refresh', {
          mail: localStorage.getItem('mail'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(73, res.data.user.platformToken);
        setUser(user => (user = { ...res.data.user }));
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getTimetable = async () => {
      console.log('timetable getter');
      try {
        const res = await axios.get('/unitimetable');
        console.log(res);
        setTimetable(timetable => (timetable = res.data));
      } catch (error) {
        console.log(error);
      }
    };
    getTimetable();

    const getLessons = async () => {
      console.log('lessons getter');
      try {
        const res = await axios.get('/lessons');
        console.log(141, 'lessons', res);
        setLessons(lessons => (lessons = [...res.data]));
      } catch (error) {
        console.log(error);
      }
    };
    getLessons();

    const getRating = async () => {
      console.log('ratings getter');
      try {
        setPoints(points => (points = [...yearly]));
        setMonthlyPoints(points => (points = [...monthly]));
      } catch (error) {
        console.log(error);
      }
    };
    getRating();

    const setIframeLinks = async () => {
      const authLink = user.platformToken
        ? `https://online.ap.education/Account/LoginByToken?token=${
            user.platformToken
          }&redirectUrl=${encodeURIComponent(
            `https://online.ap.education/cabinet/student/lessons`
          )}`
        : `https://online.ap.education/cabinet/student/lessons`;

      setPlatformLink(link => (link = authLink));
    };

    setIframeLinks();
  }, [user.pupilId, user.marathonNumber, user.platformToken]);

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup.string().required('Enter your email!'),
    password: yup.string().required('Enter your password!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/uniusers/login', values);
      console.log(response);

      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
      localStorage.setItem('mail', values.mail);
      setIsUserInfoIncorrect(false);
      resetForm();
    } catch (error) {
      error.response.status === 401 && setIsUserInfoIncorrect(true);
      console.error(error);
    }
  };

  const setPlatformIframeLink = iframeLink => {
    location.search = '';
    setPlatformLink(link => (link = iframeLink));
  };

  return (
    <StreamSection>
      {!isUserLogged ? (
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LoginLogo src={logo} alt="Merito logo" />
            <LoginFormText>
              <StreamAuthTextHello>Hello!</StreamAuthTextHello>
              Our website is not available without authorization. Please enter
              your email and password.
            </LoginFormText>
            <Label>
              <AdminInput
                type="text"
                name="mail"
                placeholder="Email"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNote component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInput
                type="password"
                name="password"
                placeholder="Password"
                onBlur={() => setIsUserInfoIncorrect(false)}
              />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">
              <FormBtnText>Log In</FormBtnText>
            </AdminFormBtn>
            <LoginErrorNote
              style={isUserInfoIncorrect ? { opacity: '1' } : { opacity: '0' }}
            >
              Password or email is incorrect!
            </LoginErrorNote>
          </LoginForm>
        </Formik>
      ) : (
        <>
          <MyMeritoPanel
            lessons={lessons}
            user={user}
            points={points}
            montlyPoints={montlyPoints}
            link={platformLink}
            timetable={timetable}
            setPlatformIframeLink={setPlatformIframeLink}
          />
          <MyPlatform platformLink={platformLink} />
        </>
      )}
    </StreamSection>
  );
};

export default MyMerito;
