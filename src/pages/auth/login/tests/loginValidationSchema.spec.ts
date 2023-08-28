import { mockMatchMedia } from '@src/tests-utils/mocks/matchMedia';
import { loginValidationSchema } from '../utils/loginValidationSchema';
import Api from '@sendsprint/api-types';
import { fullLoginValuesMock, loginValuesMockData } from './mocks/loginForm';

describe('loginValidationSchema', () => {
  beforeAll(() => {
    mockMatchMedia();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return false with initial values', async () => {
    const schema = loginValidationSchema({
      currentStep: 1,
      selectedCountry: Api.Model.CountryInitials.UnitedKingdom,
      stepsForPhoneUpdate: 'initial'
    });

    const isValid = await schema.isValid(loginValuesMockData);

    expect(isValid).toBe(false);
  });

  describe('When current step is 1', () => {
    const schema = loginValidationSchema({
      currentStep: 1,
      selectedCountry: Api.Model.CountryInitials.UnitedKingdom,
      stepsForPhoneUpdate: 'initial'
    });

    it('should return the correct error messages with initial values', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let validationResult: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errors: any;

      try {
        validationResult = await schema.validate(loginValuesMockData, { abortEarly: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errors = error.errors;
      }

      expect(validationResult).toBeUndefined();
      expect(errors).toContain('Please enter an email');
      expect(errors).toContain('Please enter a password');
    });

    it('should return the correct error message for an invalid email', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errors: any;

      try {
        await schema.validate({ ...loginValuesMockData, email: 'test' }, { abortEarly: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errors = error.errors;
      }

      expect(errors).toContain('Please enter a valid email');
    });

    it('should pass the validations when a proper email and password is passed', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let isValid = false;

      try {
        isValid = await schema.isValid(
          { ...loginValuesMockData, email: 'test@test.com', password: 'test' },
          { abortEarly: false }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty
      } catch (error: any) {}

      expect(isValid).toBe(true);
    });
  });

  describe('When current step is 2', () => {
    const schema = loginValidationSchema({
      currentStep: 2,
      selectedCountry: Api.Model.CountryInitials.UnitedKingdom,
      stepsForPhoneUpdate: 'initial'
    });

    it('should return the correct error messages with initial values', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let validationResult: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errors: any;

      try {
        validationResult = await schema.validate(loginValuesMockData, { abortEarly: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errors = error.errors;
      }

      expect(validationResult).toBeUndefined();
      expect(errors).toContain('Please enter an email');
      expect(errors).toContain('Please enter a password');
      expect(errors).toContain('Please enter your street address');
      expect(errors).toContain('Please enter a city');
      expect(errors).toContain('Please verify you are human');
      expect(errors).toContain('Please enter a phone number');
    });

    it('should validate when stepsForPhoneUpdate is not initial', async () => {
      const schema2 = loginValidationSchema({
        currentStep: 2,
        selectedCountry: undefined,
        stepsForPhoneUpdate: 'generated'
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let validationResult: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errors: any;

      try {
        validationResult = await schema2.validate(
          { ...fullLoginValuesMock, otp: '' },
          { abortEarly: false }
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errors = error.errors;
      }

      expect(validationResult).toBeUndefined();
      expect(errors).toContain('Otp should be 6 digits');
    });

    it('should pass the validations when a proper email and password is passed', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let isValid: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let errors: any;

      try {
        isValid = await schema.isValid(fullLoginValuesMock, { abortEarly: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errors = error.errors;
      }

      expect(isValid).toBe(true);
      expect(errors).toBeUndefined();
    });
  });
});
