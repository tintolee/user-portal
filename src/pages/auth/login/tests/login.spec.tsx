import { act } from '@testing-library/react';
import { renderWrapper } from '@src/tests-utils/render';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import Login from '..';

describe('Login page', () => {
  beforeAll(() => {
    mockMatchMedia();
  });
  it('should render', async () => {
    const { baseElement } = await act(() => renderWrapper(<Login />));

    expect(baseElement).toBeTruthy();
  });
});
