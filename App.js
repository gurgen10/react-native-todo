import React, { useState } from "react";
import ErrorBoundary from "react-native-error-boundary";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import CustomFallback from "./src/components/CustomFallback";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/Roboto-Bold.ttf')
  });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const errorhandler = (error, stackTrace) => {
    console.log("error", error, "stackTrace", stackTrace);
  };

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <ScreenState>
        <TodoState>
          <MainLayout/>
        </TodoState>
      </ScreenState>
    </ErrorBoundary>
  );
}



