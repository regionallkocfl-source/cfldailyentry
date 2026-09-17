BUILD: v25.09.17-B2
PWA cache updated. Refresh button adds a cache-busting query to the Apps Script web app.

CFL DAILY DATA INPUT - GITHUB PWA

यह folder GitHub Pages पर सीधे upload/push करने के लिए है। इसमें Google Sheet ID, Apps Script source code या admin codes नहीं हैं।

UPLOAD METHOD 1 - Browser:
1. GitHub पर नया repository खोलें.
2. इस GITHUB_PWA_UPLOAD folder की सारी files upload करें (icons folder सहित).
3. Settings -> Pages -> Deploy from a branch -> main -> /(root) -> Save.
4. GitHub Pages URL खोलें.
5. पहली बार Apps Script Web App का /exec URL paste करें और Save & Open App दबाएँ.
6. Chrome/Edge में Install button या browser Install App option से PWA install करें.

UPLOAD METHOD 2 - BAT:
PUSH_TO_GITHUB_KEEP_OPEN.bat चलाएँ और GitHub repository HTTPS URL paste करें.

IMPORTANT:
- Apps Script deployment को Web App के रूप में deploy होना चाहिए.
- Current Apps Script Code.gs already uses XFrameOptionsMode.ALLOWALL, इसलिए GitHub PWA shell iframe में app दिखा सकता है.
- PWA shell offline open हो सकता है, लेकिन Live Data/Google Sheets/Photos/GPS backend के लिए internet आवश्यक है.
- Apps Script code बदलने के बाद CLASP push + new Web App deployment version करें; GitHub PWA को दोबारा upload करने की जरूरत नहीं, जब तक PWA shell files न बदलें.
