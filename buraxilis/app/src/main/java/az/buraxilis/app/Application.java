package az.buraxilis.app;

import java.io.PrintWriter;
import java.io.StringWriter;

public class Application extends android.app.Application {

    @Override
    public void onCreate() {
        super.onCreate();
        final Thread.UncaughtExceptionHandler prev = Thread.getDefaultUncaughtExceptionHandler();
        Thread.setDefaultUncaughtExceptionHandler((t, e) -> {
            try {
                StringWriter sw = new StringWriter();
                e.printStackTrace(new PrintWriter(sw));
                String trace = sw.toString();
                try (PrintWriter f = new PrintWriter(openFileOutput("crash.txt", MODE_PRIVATE))) {
                    f.print(trace);
                }
                android.content.Intent i = new android.content.Intent(this, CrashActivity.class);
                i.putExtra("trace", trace);
                i.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(i);
                if (prev != null) prev.uncaughtException(t, e);
            } catch (Throwable ignored) {
                if (prev != null) prev.uncaughtException(t, e);
            }
        });
    }
}
