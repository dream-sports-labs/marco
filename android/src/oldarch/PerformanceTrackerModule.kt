package com.performancetracker

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

class PerformanceTrackerModule internal constructor(val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {
    private val performanceTrackerModuleImpl: PerformanceTrackerModuleImpl =
        PerformanceTrackerModuleImpl()

    override fun getName(): String {
        return performanceTrackerModuleImpl.getName()
    }

    @ReactMethod
    fun send(tag: String, time: Double) {
        performanceTrackerModuleImpl.send(tag, time, context)
    }

    @ReactMethod
    fun getLogs(promise: Promise?) {
        if (promise != null) {
            performanceTrackerModuleImpl.getLogs(promise)
        }
    }

    @ReactMethod
    fun resetLogs() {
        performanceTrackerModuleImpl.resetLogs()
    }

    @ReactMethod
    fun init(config: ReadableMap?) {
        performanceTrackerModuleImpl.init(config)
    }
}
