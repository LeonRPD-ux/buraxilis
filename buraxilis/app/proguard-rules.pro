# WebView JS interfeysi (yeniləmə körpüsü) saxlanmalıdır
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class az.buraxilis.app.LauncherActivity$* { *; }
