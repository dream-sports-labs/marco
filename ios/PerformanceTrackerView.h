#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef PerformanceTrackerViewNativeComponent_h
#define PerformanceTrackerViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface PerformanceTrackerView : RCTViewComponentView
@property (nonatomic, copy) NSString *tagName;
@property (nonatomic, assign) BOOL isEnabled;
@property (nonatomic, assign) double eventTimeStamp;
@property (nonatomic, copy, nullable) void (^onDrawEnd)(NSDictionary *eventData);
@end

NS_ASSUME_NONNULL_END

#endif
#else

#import <UIKit/UIKit.h>

@interface PerformanceTrackerView : UIView

@property (nonatomic, copy) NSString *tagName;
@property (nonatomic, assign) BOOL isEnabled;
@property (nonatomic, assign) double eventTimeStamp;
@property (nonatomic, copy, nullable) void (^onDrawEnd)(NSDictionary *eventData);
@end

#endif
