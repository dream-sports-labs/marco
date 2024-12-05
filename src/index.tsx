import {
  NativeModules,
  requireNativeComponent,
  StyleSheet,
  type ViewProps,
} from 'react-native';
import type { NativeProps } from './PerformanceTrackerViewNativeComponent';
import type {
  InitConfig,
  PerformanceTrackerViewStaticMethods,
} from './NativePerformanceTracker';

const isFabricEnabled = (global as any)?.nativeFabricUIManager != null;
const isTurboModuleEnabled = (global as any).__turboModuleProxy != null;

const PerformanceLoggerModule = isTurboModuleEnabled
  ? require('./NativePerformanceTracker').default
  : NativeModules.PerformanceTracker;

const PerformanceTrackerView = isFabricEnabled
  ? require('./PerformanceTrackerViewNativeComponent').default
  : requireNativeComponent('PerformanceTrackerView');

type PerformanceTrackerViewProps = NativeProps & ViewProps;

const PerformanceTrackerViewBase = ({
  children,
  style,
  isEnabled = true,
  ...rest
}: PerformanceTrackerViewProps) => {
  return (
    <PerformanceTrackerView
      {...rest}
      isEnabled={isEnabled}
      style={[styles.default, style]}
    >
      {children}
    </PerformanceTrackerView>
  );
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: 'rgba(255, 0, 0, 0)',
  },
});

PerformanceTrackerViewBase.displayName = 'PerformanceTracker';

PerformanceTrackerViewBase.send = (tag: string, time: number) =>
  PerformanceLoggerModule.send(tag, time);
PerformanceTrackerViewBase.getLogs = () => PerformanceLoggerModule.getLogs();
PerformanceTrackerViewBase.resetLogs = () =>
  PerformanceLoggerModule.resetLogs();
PerformanceTrackerViewBase.init = (config?: InitConfig) =>
  PerformanceLoggerModule.init(config);

export const PerformanceTracker: React.ComponentType<PerformanceTrackerViewProps> &
  PerformanceTrackerViewStaticMethods = PerformanceTrackerViewBase;
