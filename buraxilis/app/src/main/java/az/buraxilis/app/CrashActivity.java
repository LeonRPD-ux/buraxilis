/* Çökəndə xətanı ekranda göstərən diaqnostik səhifə — sonra silinə bilər */
package az.buraxilis.app;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;

public class CrashActivity extends Activity {
    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        String trace = getIntent().getStringExtra("trace");
        if (trace == null) trace = "Naməlum xəta";

        ScrollView sc = new ScrollView(this);
        sc.setBackgroundColor(0xFF0B0C10);
        TextView tv = new TextView(this);
        tv.setText("Çökmə xətası — bu ekranı çək (screenshot) və göndər:\n\n" + trace);
        tv.setTextColor(0xFFE0E0E0);
        tv.setTextSize(12);
        tv.setPadding(24, 40, 24, 40);
        sc.addView(tv);

        Button bt = new Button(this);
        bt.setText("Tətbiqi yenidən aç");
        bt.setOnClickListener(v -> {
            try {
                startActivity(new Intent2(this));
            } catch (Exception e) { }
            finish();
            android.os.Process.killProcess(android.os.Process.myPid());
        });

        android.widget.LinearLayout box = new android.widget.LinearLayout(this);
        box.setOrientation(android.widget.LinearLayout.VERTICAL);
        box.addView(sc, new android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 0, 1f));
        box.addView(bt, new android.widget.LinearLayout.LayoutParams(
                android.widget.LinearLayout.LayoutParams.MATCH_PARENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT));
        setContentView(box);
    }

    /* LauncherActivity-ni açan sadə intent */
    private static class Intent2 extends android.content.Intent {
        Intent2(Activity a) {
            setClassName(a, "az.buraxilis.app.LauncherActivity");
        }
    }
}
