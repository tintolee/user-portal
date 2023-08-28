/* eslint-disable no-unused-vars */
import Api from '@sendsprint/api-types';
import Box from '@sendsprint/ui-react/dist/components/Box';
import Form from '@sendsprint/ui-react/dist/components/form2/formContainer/FormContainer';
import FormFieldDropdown from '@sendsprint/ui-react/dist/components/form2/formDropdown/FormDropdown';
import GlobeOutline from '@sendsprint/ui-react/dist/icons/GlobeOutline';
import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import MobileFilter from './MobileFilter';

interface InitialValuesI {
  location: string;
  redeemedIn: string;
  sortBy: string;
}

interface Props {
  handleSetRedeemed: (arg: string) => void;
  handleSetSender: (arg: string) => void;
}

export interface LocationI {
  label: string;
  icon: Api.Model.CountryInitials | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);
  value: string;
}

const initialValues: InitialValuesI = {
  location: 'All',
  redeemedIn: 'All',
  sortBy: ''
};

const locationData: LocationI[] = [
  { label: 'All', icon: GlobeOutline, value: 'All' },
  {
    label: 'United States',
    icon: Api.Model.CountryInitials.UnitedStates,
    value: Api.Model.CountryInitials.UnitedStates
  },
  {
    label: 'United Kingdom',
    icon: Api.Model.CountryInitials.UnitedKingdom,
    value: Api.Model.CountryInitials.UnitedKingdom
  },
  {
    label: 'Canada',
    icon: Api.Model.CountryInitials.Canada,
    value: Api.Model.CountryInitials.Canada
  }
];

const redeemedData: LocationI[] = [
  { label: 'All', icon: GlobeOutline, value: 'All' },
  {
    label: 'Nigeria',
    icon: Api.Model.CountryInitials.Nigeria,
    value: Api.Model.CountryInitials.Nigeria
  }
];

const DealsFilter = ({ handleSetRedeemed, handleSetSender }: Props) => {
  return (
    <Box className="ss-mt-5 md:ss-mt-16">
      <Form<InitialValuesI> onSubmit={() => undefined} initialValues={initialValues}>
        <Box className="ss-hidden md:ss-flex ss-items-center ss-gap-4">
          <UpdateState handleSetRedeemed={handleSetRedeemed} handleSetSender={handleSetSender} />
          <Box className="ss-w-200 lg:ss-min-w-250">
            <FormFieldDropdown
              label="Location"
              data={locationData}
              emptyOptionLabel=""
              name="location"
              optionLabel="label"
              optionValue="value"
              optionIcon="icon"
              icon={GlobeOutline}
            />
          </Box>
          <Box className="ss-w-200 lg:ss-min-w-250">
            <FormFieldDropdown
              label="Redeemed in"
              data={redeemedData}
              emptyOptionLabel=""
              name="redeemedIn"
              optionLabel="label"
              optionValue="value"
              optionIcon="icon"
              icon={GlobeOutline}
            />
          </Box>
        </Box>
        <MobileFilter locationData={locationData} redeemedData={redeemedData} />
      </Form>
    </Box>
  );
};

interface UpdateStateProps {
  handleSetRedeemed: (arg: string) => void;
  handleSetSender: (arg: string) => void;
}

const UpdateState = ({ handleSetRedeemed, handleSetSender }: UpdateStateProps) => {
  const { values } = useFormikContext<InitialValuesI>();

  useEffect(() => {
    if (values.location) {
      handleSetSender(values.location);
    } else {
      handleSetSender('');
    }

    if (values.redeemedIn) {
      handleSetRedeemed(values.redeemedIn);
    } else {
      handleSetRedeemed('');
    }
  }, [values.location, values.redeemedIn]);

  return null;
};

export default DealsFilter;
