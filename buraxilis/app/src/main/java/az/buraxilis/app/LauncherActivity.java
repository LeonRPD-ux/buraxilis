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
    private File updDir;
    private volatile String curVer = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
        updDir = new File(getFilesDir(), "upd");
        updDir.mkdirs();
        web = new WebView(this);
        web.setBackgroundColor(isDark() ? 0xFF0D1126 : 0xFF2540D9);

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(false);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(false);
        /* Sistem qara rejimi: prefers-color-scheme WebView-də işləmir,
           ona görə JS-ə isDark() köprüsü ilə ötürəndə səhifə data-theme=dark qoyur */

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (!HOST.equals(u.getHost())) return null;
                String p = u.getPath() == null ? "" : u.getPath();
                if (p.startsWith("/www/")) p = p.substring(5); else return null;
                /* V29.0: serverdən yenilənmiş məzmun — updDir-dəki daha yeni index.html/version.json üstün tutulur */
                if (p.equals("index.html") || p.equals("version.json")) {
                    try {
                        File fi = new File(updDir, p);
                        if (fi.exists()) {
                            String s = p.equals("index.html") ? readTxt(new File(updDir, "version.txt")) : readTxt(fi);
                            if (curVer == null || vnum(s) > vnum(curVer))
                                return new WebResourceResponse(p.equals("index.html") ? "text/html" : "application/json", "utf-8", new java.io.FileInputStream(fi));
                        }
                    } catch (Throwable e) { }
                }
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
            @JavascriptInterface
            public boolean isDark() {
                return isDark();
            }
            /* V29.0: səhifə versiyasını bildirir + köhnə keş təmizlənir */
            @JavascriptInterface
            public void init(String v) {
                curVer = v == null ? "" : v;
                try {
                    File fi = new File(updDir, "index.html"), vf = new File(updDir, "version.txt");
                    if (fi.exists() && vf.exists() && vnum(readTxt(vf)) < vnum(curVer)) { fi.delete(); vf.delete(); }
                } catch (Throwable e) { }
            }
            /* APK-nın öz versiyası (versionName) — native yeniləmə lazımlığını müəyyən etmək üçün */
            @JavascriptInterface
            public String ver() {
                try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionName; } catch (Throwable e) { return ""; }
            }
            /* V29.0: yeni məzmunu arxa planda yüklə — bitən kimi JS-ə xəbər ver */
            @JavascriptInterface
            public void srvUpd(final String v) {
                new Thread(new Runnable() { public void run() {
                    boolean ok = false;
                    try {
                        byte[] buf = new byte[8192]; int n;
                        java.io.ByteArrayOutputStream bo = new java.io.ByteArrayOutputStream();
                        java.net.HttpURLConnection c = (java.net.HttpURLConnection) new java.net.URL(
                            "https://buraxilis.kennedyleonscott220.workers.dev/index.html?nocache=" + System.currentTimeMillis()).openConnection();
                        c.setConnectTimeout(15000); c.setReadTimeout(30000);
                        java.io.InputStream in = c.getInputStream();
                        while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
                        in.close();
                        byte[] data = bo.toByteArray();
                        if (data.length < 100000) throw new Exception("fayl çox qısadır");
                        File tmp = new File(updDir, "index.html.new");
                        java.io.FileOutputStream fo = new java.io.FileOutputStream(tmp);
                        fo.write(data); fo.close();
                        new File(updDir, "index.html").delete();
                        tmp.renameTo(new File(updDir, "index.html"));
                        java.io.InputStream in2 = new java.net.URL(
                            "https://buraxilis.kennedyleonscott220.workers.dev/version.json?nocache=" + System.currentTimeMillis()).openStream();
                        bo.reset();
                        while ((n = in2.read(buf)) > 0) bo.write(buf, 0, n);
                        in2.close();
                        if (bo.size() > 0 && bo.size() < 4096) {
                            java.io.FileOutputStream fo2 = new java.io.FileOutputStream(new File(updDir, "version.json"));
                            fo2.write(bo.toByteArray()); fo2.close();
                        }
                        java.io.FileOutputStream fo3 = new java.io.FileOutputStream(new File(updDir, "version.txt"));
                        fo3.write(v.getBytes("utf-8")); fo3.close();
                        ok = true;
                    } catch (Throwable e) { ok = false; }
                    final boolean fok = ok;
                    runOnUiThread(new Runnable() { public void run() {
                        try { web.evaluateJavascript("try{window.onSrvUpd(" + (fok ? "'" + v + "',1" : "'',0") + ")}catch(e){}", null); } catch (Throwable e) { }
                    }});
                }}).start();
            }
        }, "AndroidBridge");

        BroadcastReceiver done = new BroadcastReceiver() {
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
        };
        try {
            androidx.core.content.ContextCompat.registerReceiver(this, done,
                    new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
                    androidx.core.content.ContextCompat.RECEIVER_NOT_EXPORTED);
        } catch (Throwable e) {
            registerReceiver(done, new IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE));
        }

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

    /* V29.0: "V30.1" → 30001 kimi müqayisə üçün */
    private static long vnum(String v) {
        try {
            java.util.regex.Matcher m = java.util.regex.Pattern.compile("(\\d+)\\.(\\d+)").matcher(v == null ? "" : v);
            if (m.find()) return Long.parseLong(m.group(1)) * 1000 + Long.parseLong(m.group(2));
        } catch (Throwable e) { }
        return 0;
    }

    private static String readTxt(File f) {
        try {
            java.util.Scanner sc = new java.util.Scanner(f, "utf-8").useDelimiter("\\A");
            return sc.hasNext() ? sc.next() : "";
        } catch (Throwable e) { return ""; }
    }

    /* Sistem qaranlıq rejimdədirsə true */
    private boolean isDark() {
        int m = getResources().getConfiguration().uiMode & android.content.res.Configuration.UI_MODE_NIGHT_MASK;
        return m == android.content.res.Configuration.UI_MODE_NIGHT_YES;
    }

    /* İstifadəçi tərəfindən saxlanmış temaya müdaxilə etmədən sistem rejimini sinxronlaşdır */
    private void syncDark() {
        if (web == null) return;
        try {
            web.evaluateJavascript(
                "(function(){var t=null;try{t=JSON.parse(localStorage.getItem('th'))}catch(e){}" +
                "if(!t&&window.AndroidBridge&&AndroidBridge.isDark)document.documentElement.dataset.theme=AndroidBridge.isDark()?'dark':'light'})()",
                null);
        } catch (Throwable e) { }
    }

    @Override
    public void onConfigurationChanged(android.content.res.Configuration c) {
        super.onConfigurationChanged(c);
        syncDark();
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
