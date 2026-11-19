/* Yeni versiya üçün fon bildirişi (APK rejimi).
 * AlarmManager 12 saatda bir işə salır; server versiyası cari səhifə versiyasından
 * böyükdürsə və bu versiya üçün artıq bildiriş göstərilməyibsə — bildiriş verir. */
package az.buraxilis.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class UpdateCheckReceiver extends BroadcastReceiver {
    private static final String URL_VERSION =
        "https://buraxilis.kennedyleonscott220.workers.dev/version.json";
    private static final String CHANNEL = "updates";
    private static final int NOTIFY_ID = 2026;

    private static int num(String v) {
        if (v == null) return 0;
        java.util.regex.Matcher m = java.util.regex.Pattern.compile("(\\d+)\\.(\\d+)").matcher(v);
        if (!m.find()) return 0;
        try { return Integer.parseInt(m.group(1)) * 1000 + Integer.parseInt(m.group(2)); }
        catch (Throwable e) { return 0; }
    }

    @Override
    public void onReceive(final Context ctx, Intent intent) {
        new Thread(new Runnable() { public void run() {
            try {
                SharedPreferences p = ctx.getSharedPreferences("app", Context.MODE_PRIVATE);
                String cur = p.getString("curVer", "");
                if (cur == null || cur.length() == 0) return;

                HttpURLConnection c = (HttpURLConnection) new URL(URL_VERSION + "?t=" + System.currentTimeMillis()).openConnection();
                c.setConnectTimeout(12000);
                c.setReadTimeout(15000);
                BufferedReader r = new BufferedReader(new InputStreamReader(c.getInputStream(), "utf-8"));
                String line = r.readLine();
                r.close();
                if (line == null) return;
                String srv = new JSONObject(line).optString("version", "");
                if (srv.length() == 0 || num(srv) <= num(cur)) return;

                String last = p.getString("notified", "");
                if (srv.equals(last)) return;
                p.edit().putString("notified", srv).apply();

                NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
                if (nm == null) return;
                if (Build.VERSION.SDK_INT >= 26) {
                    NotificationChannel ch = new NotificationChannel(CHANNEL, "Yeniləmələr", NotificationManager.IMPORTANCE_DEFAULT);
                    ch.setDescription("Yeni versiya bildirişləri");
                    nm.createNotificationChannel(ch);
                }
                Intent open = new Intent(ctx, LauncherActivity.class);
                open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                int flag = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= 23) flag |= PendingIntent.FLAG_IMMUTABLE;
                PendingIntent pi = PendingIntent.getActivity(ctx, 0, open, flag);

                Notification.Builder b;
                if (Build.VERSION.SDK_INT >= 26) b = new Notification.Builder(ctx, CHANNEL);
                else b = new Notification.Builder(ctx);
                b.setSmallIcon(android.R.drawable.stat_sys_download)
                 .setContentTitle("Yeni versiya: " + srv)
                 .setContentText("Tətbiq daxilində yenilənmək üçün toxun.")
                 .setAutoCancel(true)
                 .setContentIntent(pi);
                nm.notify(NOTIFY_ID, b.build());
            } catch (Throwable e) { }
        }}).start();
    }
}
