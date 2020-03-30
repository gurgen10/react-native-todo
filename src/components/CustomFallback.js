import React from 'react';
import PropTypes  from 'prop-types';
import { View, Button } from 'react-native';

import { AppTextSimple, AppTextBold } from '../components/UI/AppText';

const CustomFallback = ( { error, resetError }) => (
    <View>
      <AppTextBold>Something happened!</AppTextBold>
      <AppTextSimple>{error.toString()}</AppTextSimple>
      <Button onPress={resetError} title={'Try again'} />
    </View>
  )

CustomFallback.propTypes = {
error: PropTypes.object,
resetError: PropTypes.func
}

export default CustomFallback;