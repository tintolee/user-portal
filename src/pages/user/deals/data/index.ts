import Api from '@sendsprint/api-types';
import { DealI } from '../components/dealsGrid/DealBox';

export const dealsData: DealI[] = [
  {
    id: '1',
    redemptionMarket: [Api.Model.CountryInitials.Nigeria],
    redemptionInfo: [
      "Enter code 'MTcwMw==' when you sign up at Shiip",
      "Click <a class='ss-font-bold' href='https://app.goshiip.com/sign-up?ref_code=MTcwMw==' target='_blank'>here</a> to sign up to redeem your Sendsprint Alliance discount offering"
    ],
    dealHeader: 'Money off your next 5 deliveries to Nigeria',
    dealInfo: ['Get 5% off your first 5 shipments with Shiip'],
    discountCode: 'MTcwMw==',
    merchantDescription: 'Global shipping and logistics company',
    merchantName: 'Shiip',
    senders: [
      Api.Model.CountryInitials.Canada,
      Api.Model.CountryInitials.UnitedKingdom,
      Api.Model.CountryInitials.UnitedStates
    ]
  },
  {
    id: '2',
    redemptionMarket: [Api.Model.CountryInitials.Nigeria],
    redemptionInfo: [
      "Enter code 'MTcwMw==' when you sign up at Shiip",
      "Click <a class='ss-font-bold' href='https://app.goshiip.com/sign-up?ref_code=MTcwMw==' target='_blank'>here</a> to sign up to redeem your Sendsprint Alliance discount offering"
    ],
    dealHeader: 'Arrive in style - Free Airport pickups in Lagos and Abuja',
    dealInfo: [
      'Get free airport pickups in Lagos and Abuja when you book a 7 day trip with Autogirl.',
      'Get 5% off your chauffeured car booking when you book for 1-6 days.',
      'Redeemable in Lagos and Abuja.',
      '5 shipments with Shiip'
    ],
    discountCode: 'MTcwMw==',
    merchantDescription: 'Private and chauffered car hires in Nigeria',
    merchantName: 'Autocars',
    senders: [
      Api.Model.CountryInitials.Canada,
      Api.Model.CountryInitials.UnitedKingdom,
      Api.Model.CountryInitials.UnitedStates
    ]
  }
];
