/* Buraxılışa hazırlıq — tam offline WebView launcher
 * Tətbiq APK-nın içindəki assets/www/ qovluğundan yüklənir (appassets.androidplatform.net
 * təhlükəsiz origin vasitəsilə). İnternet yalnız çat/sinxronizasiya və yeniləmə yoxlaması üçün.
 */
package az.buraxilis.app;

import android.app.Activity;
import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.core.content.FileProvider;
import java.io.File;
import java.io.InputStream;

public class LauncherActivity extends Activity {

    private static final String HOST = "appassets.androidplatform.net";
    private static final String START = "https://" + HOST + "/www/index.html";
    private static final String APK_URL = "https://kennedyleonscott220-png.github.io/buraxilis/Buraxilis.apk";

    private WebView web;
    private long dlId = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
        web = new WebView(this);
        web.setBackgroundColor(0xFF2540D9);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(false);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (!HOST.equals(u.getHost())) return null;
                String p = u.getPath() == null ? "" : u.getPath();
                if (p.startsWith("/www/")) p = p.substring(5); else return null;
                try {
                    InputStream in = getAssets().open("www/" + p);
                    String m = mime(p);
                    boolean text = m.startsWith("text/") || m.contains("javascript") || m.contains("json") || m.contains("manifest");
                    return new WebResourceResponse(m, text ? "utf-8" : null, in);
                } catch (Exception e) {
                    return null;
                }
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (!HOST.equals(u.getHost())) {
                    try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception e) { }
                    return true;
                }
                return false;
            }
        });

        web.setDownloadListener(new android.webkit.DownloadListener() {
            public void onDownloadStart(String url, String agent, String disposition, String mimetype, long len) {
                startDownload(url);
            }
        });

        web.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void download(String url) {
                runOnUiThread(new Runnable() { public void run() { startDownload(url); } });
            }
        }, "AndroidBridge");

        registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context c, Intent i) {
                long id = i.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
                if (id != dlId) return;
                try {
                    File f = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "Buraxilis.apk");
                    Uri u = FileProvider.getUriForFile(c, "az.buraxilis.app.fileprovider", f);
                    Intent it = new Intent(Intent.ACTION_VIEW);
                    it.setDataAndType(u, "application/vnd.android.package-archive");
                    it.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(it);
                } catch (Exception e) {
                    Toast.makeText(c, "APK yükləndi — Yüklənlər qovluğundan quraşdır", Toast.LENGTH_LONG).show();
                }
            }
        }, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));

        setContentView(web);
        web.loadUrl(START);
        } catch (Throwable e) {
            try {
                java.io.StringWriter sw = new java.io.StringWriter();
                e.printStackTrace(new java.io.PrintWriter(sw));
                android.content.Intent i = new android.content.Intent(this, CrashActivity.class);
                i.putExtra("trace", sw.toString());
                startActivity(i);
                finish();
            } catch (Throwable ignored) {
                throw new RuntimeException(e);
            }
        }
    }

    private void startDownload(String url) {
        try {
            DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
            DownloadManager.Request rq = new DownloadManager.Request(Uri.parse(url));
            rq.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
            rq.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "Buraxilis.apk");
            rq.setMimeType("application/vnd.android.package-archive");
            dlId = dm.enqueue(rq);
            Toast.makeText(this, "Yeni APK yüklənir…", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            try { startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url))); } catch (Exception e2) { }
        }
    }

    private static String mime(String p) {
        String l = p.toLowerCase();
        if (l.endsWith(".html") || l.endsWith(".htm")) return "text/html";
        if (l.endsWith(".js")) return "application/javascript";
        if (l.endsWith(".json")) return "application/json";
        if (l.endsWith(".webmanifest")) return "application/manifest+json";
        if (l.endsWith(".png")) return "image/png";
        if (l.endsWith(".jpg") || l.endsWith(".jpeg")) return "image/jpeg";
        if (l.endsWith(".svg")) return "image/svg+xml";
        if (l.endsWith(".css")) return "text/css";
        if (l.endsWith(".ico")) return "image/x-icon";
        if (l.endsWith(".woff2")) return "font/woff2";
        if (l.endsWith(".woff")) return "font/woff";
        if (l.endsWith(".ttf")) return "font/ttf";
        return "application/octet-stream";
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
