package com.pdascanner;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

import cn.guanmai.scanner.SupporterManager;

public class PdaScannerModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private SupporterManager mSupporterManager;

    public static final String EVENT_NAME_SCANNER_RESULT_CHANGE = "SCANNER_RESULT_CHANGE_KEY";

    public PdaScannerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "PdaScanner";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put(EVENT_NAME_SCANNER_RESULT_CHANGE, EVENT_NAME_SCANNER_RESULT_CHANGE);
        return constants;
    }

    @ReactMethod
    public void initScanner(final Callback callback) {
        mSupporterManager = new SupporterManager(reactContext, new SupporterManager.IScanListener() {
            @Override
            public void onScannerResultChange(String result) {
                if (result != null) {
                    WritableMap params = Arguments.createMap();
                    params.putString("result", result);
                    sendEvent(reactContext, EVENT_NAME_SCANNER_RESULT_CHANGE, params);
                }
            }

            @Override
            public void onScannerServiceConnected() {
                callback.invoke(null, "connected");
            }

            @Override
            public void onScannerServiceDisconnected() {
                callback.invoke("disconnected", null);
            }

            @Override
            public void onScannerInitFail() {
                callback.invoke("fail", null);
            }
        });
    }

    @ReactMethod
    public void singleScan(Boolean bool) {
        if (mSupporterManager != null) {
            mSupporterManager.singleScan(bool);
        }
    }

    @ReactMethod
    public void recycleScanner() {
        if (mSupporterManager!=null) {
            mSupporterManager.recycle();
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }
}
