import { act } from '@testing-library/react';
import { renderWrapper } from '@src/tests-utils/render';
import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import Register from '..';

describe('Register page', () => {
  beforeAll(() => {
    mockMatchMedia();
  });
  it('should render', async () => {
    const { baseElement } = await act(() => renderWrapper(<Register />));

    expect(baseElement).toBeTruthy();
  });
});
