# Add any project specific keep options here:

# React Native
# The following rules are required by React Native.
# See https://reactnative.dev/docs/signed-apk-android#adding-proguard-rules-for-native-modules
-keep public class com.facebook.react.ReactApplication
-keep public class com.facebook.react.ReactActivity
-keep public class com.facebook.react.ReactNativeHost
-keep public class com.facebook.react.ReactPackage
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.systrace.** { *; }
-keep class com.facebook.jni.** { *; }

-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactProp <methods>;
}
-keepclassmembers class * {
    @com.facebook.react.uimanager.annotations.ReactPropGroup <methods>;
}

# Hermes (if enabled)
# The Hermes ProGuard rules are bundled with the hermes-engine AAR.
# You should not need to add any specific rules here.

# OkHttp3 (used by React Native for networking)
# This is necessary to prevent crashes in release builds
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**
-dontwarn okio.**

# Rules for third-party libraries
-keep class com.swmansion.reanimated.** { *; }
-keep class com.swmansion.gesturehandler.** { *; }
