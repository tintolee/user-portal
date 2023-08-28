import Api from '@sendsprint/api-types';
import ClientApi from '@src/types/client';

export const loggedInUser: ClientApi.LoggedInData = {
  address: {
    city: 'test',
    country: Api.Model.CountryInitials.UnitedKingdom,
    dateOfBirth: '01/01/1111',
    phone: '745555555',
    postCode: '292929',
    state: 'test',
    street: 'test'
  },
  hash: '1111',
  user: {
    email: 'test@test.com',
    firstName: 'Emmanuel',
    fullName: 'Emmanuel Stephen',
    isEmailVerified: true,
    lastName: 'Stephen',
    referralCode: 'R555',
    role: Api.Model.UserRole.NormalUser,
    status: Api.Model.Status.Active
  }
};

export const loggedInUserWithoutPhone: ClientApi.LoggedInData = {
  ...loggedInUser,
  address: {
    city: '',
    country: '' as Api.Model.CountryInitials,
    dateOfBirth: '',
    phone: '',
    postCode: '',
    state: '',
    street: ''
  }
};
