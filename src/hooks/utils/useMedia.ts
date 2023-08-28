import breakpoints, { BreakpointName } from '@sendsprint/design-system/foundations/breakpoint';
import { useCallback, useMemo, useState } from 'react';
import useLayoutEffect from './use-isomorphic-layout-effect';

const XL = 1440;
export function useMedia() {
  const [breakpointState, setBreakpointsState] = useState<Record<BreakpointName, boolean>>(
    () => ({} as Record<BreakpointName, boolean>)
  );
  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
    const medias: [MediaQueryList, (e: any) => void][] = Object.entries({
      ...breakpoints,
      xl: XL
    })
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => {
        const media = window.matchMedia(`(min-width: ${value}px)`);
        const listener = (m: MediaQueryListEvent) => {
          setBreakpointsState((state) => ({
            ...state,
            [key]: m.matches
          }));
        };
        media.addEventListener('change', listener);
        setBreakpointsState((state) => ({
          ...state,
          [key]: media.matches
        }));
        return [media, listener];
      });

    return () => {
      medias.forEach(([media, listener]) => {
        media.removeEventListener('change', listener);
      });
    };
  }, []);
  const isMobile: boolean = useMemo(() => {
    return !breakpointState.lg && !breakpointState.md;
  }, [breakpointState]);
  const isTablet: boolean = useMemo(() => {
    return breakpointState.md && !breakpointState.lg;
  }, [breakpointState]);
  const isDesktop: boolean = useMemo(() => {
    return breakpointState.lg;
  }, [breakpointState]);
  // eslint-disable-next-line no-unused-vars
  const isAtLeast: (name: BreakpointName) => boolean = useCallback(
    (name) => {
      return breakpointState[name];
    },
    [breakpointState]
  );

  return {
    isDesktop,
    isMobile,
    isTablet,
    isAtLeast
  };
}
