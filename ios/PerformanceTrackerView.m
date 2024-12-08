#ifndef RCT_NEW_ARCH_ENABLED

#import "PerformanceTrackerView.h"
#import "PerformanceTrackerStore.h"
#import "PerformanceTrackerWriter.h"

@implementation PerformanceTrackerView {
    UIView * _view;
    BOOL _alreadyLogged;
}

- (instancetype)init {
    self = [super init];
    return self;
}

- (void)setTagName:(NSString *)tagName {
    _tagName = tagName;
}

- (void)setIsEnabled:(BOOL)isEnabled {
    _isEnabled = isEnabled;
}

- (void)setStartMarker:(NSString *)startMarker {
    _startMarker = startMarker;
}

- (void)setEventTimeStamp:(double)eventTimeStamp {
    eventTimeStamp = eventTimeStamp;
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    
    if (_alreadyLogged) {
        return;
    }
    
    if (!self.window) {
        return;
    }
    
    _alreadyLogged = YES;
    
    if (_isEnabled) {
        dispatch_async(dispatch_get_main_queue(), ^{
            double currentTime = [[NSDate date] timeIntervalSince1970] * 1000; // Current time in milliseconds
            double diffTime = 0;
            
            if (self.startMarker.length > 0) {
                NSNumber *startTime = [[PerformanceTrackerStore sharedInstance] getEventValueWithTagName:self.startMarker];
                if (startTime) {
                    diffTime = currentTime - startTime.doubleValue;
                }
            }
            
            // Log the event in PerformanceTrackerStore
            [[PerformanceTrackerStore sharedInstance] addEventWithTagName:self.tagName timestamp:currentTime];
            
            // Calculate render time
            double renderTime = currentTime - self.eventTimeStamp;
            if (self.onDrawEnd) {
                self.onDrawEnd(@{
                    @"drawTime": @(currentTime),
                    @"renderTime": @(renderTime),
                    @"diffTime": @(diffTime),
                    @"tagName": self->_tagName
                });
            }
            [[PerformanceTrackerWriter sharedInstance] writeLogsWithTag: self.tagName time: currentTime];
        });
    }
}

@end

#endif
