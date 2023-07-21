import { useLayoutEffect } from 'react';

const { userAgent } = navigator;

const isAndroid = () => userAgent.match(/Android/i);

const isBlackBerry = () => userAgent.match(/BlackBerry/i);

const isIOS = () => userAgent.match(/iPhone|iPad|iPod/i);

const isOpera = () => userAgent.match(/Opera Mini/i);

const isWindows = () => userAgent.match(/IEMobile/i);

const IS_MOBILE_DEVICE =
  isAndroid() || isBlackBerry() || isIOS() || isOpera() || isWindows();

export const useUserAgent = () =>
  useLayoutEffect(() => {
    if (IS_MOBILE_DEVICE) {
      document.body.classList.add('mobile');

      return;
    }

    document.body.classList.add('desktop');
  }, []);
