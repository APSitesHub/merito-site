import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaqSearchBtnIcon, SearchBtnIcon } from '../MyMeritoPanel/MyMeritoPanel.styled';
import { ReactComponent as BoxSwitchDown } from '../../../img/svg/faq-arrow-down.svg';
import { ReactComponent as BoxSwitchUp } from '../../../img/svg/faq-arrow-up.svg';
import { ReactComponent as ExternalLink } from '../../../img/svg/externalLink.svg';
import { ReactComponent as InternalLink } from '../../../img/svg/internalLink.svg';

export const FinderBox = styled.div`
  position: absolute;
  top: 30px;
  right: 60px;
  z-index: 8;

  margin-left: 5px;
  display: flex;
  flex-direction: column;

  overflow: hidden;
  border-radius: 20px;
  height: 768px;
  transition: all var(--animation-global);

  &.nothing-found {
    height: unset;
    transition: all var(--animation-global);
  }

  @media screen and (min-height: 320px) {
    height: 280px;
  }

  @media screen and (min-height: 480px) {
    top: 60px;
    height: 400px;
  }

  @media screen and (min-height: 640px) {
    top: 142px;
    height: 442px;
    overflow-y: hidden;
  }

  @media screen and (min-width: 768px) {
    right: 90px;
  }
`;

export const FinderBoxTrial = styled(FinderBox)`
  z-index: 8;
`;

export const FinderLabel = styled.label`
  display: block;
  position: relative;
`;

export const FinderIcon = styled(SearchBtnIcon)`
  position: absolute;
  top: 50%;
  left: 20px;

  transform: translateY(-50%);
`;

export const FinderInput = styled.input`
  height: 48px;
  width: 100%;

  overflow: hidden;

  padding: 9px 20px;
  padding-left: 60px;
  border: none;
  outline: transparent;

  font-family: var(--my-ap-font-family);
  font-size: 20px;
  line-height: 20px;
  color: #525266;
  vertical-align: middle;

  &::placeholder {
    color: #bebecc;
    font-size: 16px;
    vertical-align: middle;
    transform: translateY(-2px);
  }

  @media screen and (min-width: 480px) {
    width: 362px;
  }
`;

export const FinderLessons = styled.div`
z-index: 14;
  height: 394px;
  width: 100%;
  padding: 0 20px 13px 20px;

  overflow-y: scroll;
  scrollbar-width: thin;

  /* &::-webkit-scrollbar {
    display: none;
  } */

  background-color: #fff;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #0000000d;
  }

  @media screen and (min-width: 480px) {
    width: 362px;
  }
`;

export const FinderMolding = styled.div`
  background-color: var(--secondary-color);
  height: 13px;
`;

export const LessonBox = styled.ul`
  display: flex;
  flex-direction: column;
  font-family: var(--my-ap-font-family);

  gap: 8px;
`;

export const LessonBoxItem = styled.li`
  color: #000;
  border-bottom: 1px solid #0000000d;
  padding-top: 8px;

  padding-bottom: 8px;
`;

export const LessonTopBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

export const LessonValuesLogo = styled.div`
  display: flex;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  text-transform: uppercase;
  text-align: center;
  font-size: 7.5px;
  font-weight: 700;
  font-family: var(--secondary-font-family);
  color: var(--secondary-color);
  text-shadow: 0px 1.527px 1.527px rgba(0, 0, 0, 0.25);

  border-radius: 6px;
  background: linear-gradient(322deg, #0f645b -5.61%, #09c6cc 93.88%);
`;

export const LessonValuesLogoWSPA = styled(LessonValuesLogo)`
  background: linear-gradient(90deg, #e40521 -31.6%, #000 107.95%);
`;

export const LessonValuesLogoVPU = styled(LessonValuesLogo)`
  background: linear-gradient(90deg, #041f43 -31.6%, #a82033 107.95%);
`;

export const LessonValuesLogoISMPO = styled(LessonValuesLogo)`
  background: linear-gradient(90deg, #002750 -31.6%, #1e88d2 107.95%);
`;

export const LessonValuesList = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-wrap: break-word;
  gap: 4px;
`;

export const LessonTextValuesBox = styled.div`
  position: relative;
  padding-right: 32px;
  min-height: 52px;
  width: 100%;
`;

export const LessonValuesItem = styled.li`
  position: relative;
`;

export const LessonValueName = styled.p`
  color: #525266;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  text-transform: capitalize;
`;

export const LessonValueTopic = styled.p`
  color: #bebecc;
  font-size: 12px;
`;

export const LessonLinksBox = styled.div`
  position: absolute;
  top: 50%;
  right: 0;

  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LessonExternalLinkButton = styled.button`
  border: none;
  outline: transparent;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  position: relative;

  &::before {
    content: 'Відкрити урок в новій вкладці';
    pointer-events: none;

    position: absolute;
    top: 0%;
    right: 100%;
    z-index: 7;

    width: max-content;
    font-size: 10px;
    line-height: 1.2;

    padding: 4px 6px;
    border: 0.5px solid #bebecc;
    background: #fff;

    transform: scale(0, 0);
    transform-origin: right;
    transition: transform var(--animation-global);
    transition-delay: 0ms;
  }

  &.tooltip-open::before {
    transform: scale(1, 1);
    transition: transform var(--animation-global);
    transition-delay: 500ms;
  }
`;

export const LessonInternalLinkButton = styled(LessonExternalLinkButton)`
  &::before {
    content: 'Відкрити урок в поточній вкладці';
  }
`;

export const LessonPdfBox = styled.div`
  display: block;
`;

export const LessonValuePdfLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  color: #bebecc;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  text-decoration: none;
  gap: 4px;
`;

export const LessonVideoBox = styled.div`
  background-color: #0000004d;
  position: relative;
  padding-top: 56.25%;
  border-radius: 20px;
  overflow: hidden;

  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

export const PdfWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PdfBox = styled.div`
  &:not(:last-child) {
    margin-bottom: 14px;
  }
`;

export const PdfPreviewBackground = styled.div`
  background-color: #303030;
  border-radius: 20px;
  overflow: hidden;
  margin-top: 3px;
  height: 0;
  min-height: 0;
  opacity: 0;

  transform: scaleY(0);
  transform-origin: top;
  transition: transform 350ms linear, height 350ms linear, min-height 350ms linear,
    opacity 350ms linear;

  &:not(:last-child) {
    margin-bottom: 3px;
  }

  &.preview-open {
    opacity: 1;

    height: auto;
    min-height: 150px;
    transform: scaleY(1);
    transition: transform 350ms linear, height 350ms linear;

    & iframe {
      height: 100%;
    }
  }
`;

export const PdfPreviewBackgroundText = styled.span`
  font-size: 24px;
`;

export const PdfPreview = styled.iframe`
  width: 100%;
  height: 0px;
  display: block;

  transition: transform 350ms linear, height 350ms linear;
`;

export const FaqBox = styled.div``;

export const FaqListTrigger = styled.button`
  border: none;
  outline: transparent;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  width: 100%;
  padding: 8px 0;

  color: #bebecc;
  font-size: 14px;
  font-weight: 500;

  &:hover div::before,
  &:focus div::before {
    opacity: 1;
  }
`;

export const FaqList = styled.ul`
  display: flex;
  flex-direction: column;

  transform: scaleY(0);
  transform-origin: top;
  height: 0;

  transition: transform var(--animation-global);

  &.faqlistopen {
    padding-top: 6px;
    height: auto;
    transform: scaleY(1);
  }
`;

export const FaqListItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid #0000000d;
  }
`;

export const FaqListLink = styled.a`
  display: block;
  width: 100%;
  color: #bebecc;
  font-weight: 500;
  font-size: 14px;
  padding: 12px 0;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;

  transition: color var(--animation-global);

  &:hover,
  &:focus {
    color: #525266;
  }
`;

export const FaqListQuestionMarkBG = styled.div`
  position: relative;
  overflow: hidden;

  display: flex;
  height: 30px;
  width: 30px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 6px;
  background: linear-gradient(322deg, #0f645b -5.61%, #09c6cc 93.88%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;

    transition: opacity var(--animation-global);

    background: linear-gradient(322deg, #09c6cc 23.22%, #0f645b 110.01%), #09c6cc;
  }
`;

export const FaqListQuestionMark = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  text-align: center;
  font-size: 18px;
  font-weight: 700;
  font-family: var(--secondary-font-family);
  color: var(--secondary-color);
  text-shadow: 0px 1.527px 1.527px rgba(0, 0, 0, 0.25);
`;

export const FaqListDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const FaqSwitchDown = styled(BoxSwitchDown)`
  width: 24px;
  height: 24px;
`;

export const FaqSwitchUp = styled(BoxSwitchUp)`
  width: 24px;
  height: 24px;
`;

export const FaqFinderLabel = styled.label`
  display: block;
  position: relative;
  height: 0;
  transform: scaleY(0);
  transform-origin: top;

  transition: transform var(--animation-global);

  &.faqlistopen {
    transform: scaleY(1);
    height: auto;
  }
`;

export const FaqFinderIcon = styled(FaqSearchBtnIcon)`
  position: absolute;
  top: 50%;
  left: 0px;
  z-index: 1;

  transform: translateY(-50%);
`;

export const FaqFinderInput = styled.input`
  height: 0;
  width: 100%;

  padding: 9px 10px;
  padding-left: 26px;
  height: 24px;

  overflow: hidden;

  border: none;
  border-bottom: 1px solid #0000000d;
  outline: transparent;

  font-family: var(--my-ap-font-family);
  font-size: 14px;
  line-height: 20px;
  color: #525266;
  vertical-align: middle;

  &::placeholder {
    color: #bebecc;
    font-size: 14px;
    vertical-align: middle;
  }

  &.not-empty + svg {
    color: #525266;
  }
`;

export const FaqQuestion = styled.p`
  font-size: 10px;
  line-height: 1.2;
  color: #bebecc;

  height: 0;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 350ms linear, height 350ms linear;

  &.preview-open {
    margin-top: 4px;
    margin-bottom: 8px;
    height: auto;
    transform: scaleY(1);
  }
`;

export const FaqPreviewBackground = styled(PdfPreviewBackground)`
  &.preview-open {
    margin-bottom: 8px;
  }
`;

export const ExternalLinkIcon = styled(ExternalLink)`
  display: block;
  flex-shrink: 0;
  pointer-events: none;
`;

export const InternalLinkIcon = styled(InternalLink)`
  display: block;
  flex-shrink: 0;
  pointer-events: none;
`;
