# FlyCo Redesign — Application Guide

## Files to replace

Copy each file from this folder into the corresponding path in your project:

```
flyco-redesign/
│
├── index.css                          →  src/index.css
├── App.js                             →  src/App.js
│
├── components/
│   ├── Navbar.js                      →  src/components/Navbar.js
│   ├── AdminNavbar.js                 →  src/components/AdminNavbar.js
│   └── Footer.js                      →  src/components/Footer.js
│
├── pages/
│   ├── Main.js                        →  src/pages/Main.js
│   ├── Admin.js                       →  src/pages/Admin.js
│   ├── AccessDeniedAdmin.js           →  src/pages/AccessDeniedAdmin.js
│   └── AccessDeniedUser.js            →  src/pages/AccessDeniedUser.js
│
├── screens/
│   ├── Main/
│   │   ├── AuthPage.module.css        →  src/screens/Main/AuthPage.module.css
│   │   ├── login.css                  →  src/screens/Main/login.css
│   │   ├── signup.css                 →  src/screens/Main/signup.css
│   │   ├── Login.js                   →  src/screens/Main/Login.js
│   │   ├── SignUp.js                  →  src/screens/Main/SignUp.js
│   │   ├── Profile.js                 →  src/screens/Main/Profile.js
│   │   ├── Buslines.js                →  src/screens/Main/Buslines.js
│   │   ├── FlightTicketApp.js         →  src/screens/Main/FlightTicketApp.js
│   │   └── TrainTicketApp.js          →  src/screens/Main/TrainTicketApp.js
│   │
│   └── Admin/
│       ├── AuthPage.module.css        →  src/screens/Admin/AuthPage.module.css
│       ├── AdminLogin.js              →  src/screens/Admin/AdminLogin.js
│       ├── EditPlane.js               →  src/screens/Admin/EditPlane.js
│       ├── EditTrain.js               →  src/screens/Admin/EditTrain.js
│       ├── EditAirlines/
│       │   ├── index.js               →  src/screens/Admin/EditAirlines/index.js
│       │   ├── FlightTicketForm.js    →  src/screens/Admin/EditAirlines/FlightTicketForm.js
│       │   ├── FlightTicketEditForm.js→  src/screens/Admin/EditAirlines/FlightTicketEditForm.js
│       │   ├── FlightTicketList.js    →  src/screens/Admin/EditAirlines/FlightTicketList.js
│       │   └── FlightTicketInfo.js    →  src/screens/Admin/EditAirlines/FlightTicketInfo.js
│       └── EditTrainlines/
│           ├── index.js               →  src/screens/Admin/EditTrainlines/index.js
│           ├── TrainTicketForm.js     →  src/screens/Admin/EditTrainlines/TrainTicketForm.js
│           ├── TrainTicketEditForm.js →  src/screens/Admin/EditTrainlines/TrainTicketEditForm.js
│           ├── TrainTicketList.js     →  src/screens/Admin/EditTrainlines/TrainTicketList.js
│           └── TrainTicketInfo.js     →  src/screens/Admin/EditTrainlines/TrainTicketInfo.js
│
└── public/
    └── index.html                     →  public/index.html
```

## Files NOT changed (keep your originals)

```
src/index.js
src/components/AuthContextAdmin.js
src/components/AuthContextUser.js
```

## Notes

- Fonts load from Google Fonts via `index.html` preconnect + `index.css` @import.
  If you're offline during development, fonts fall back to Georgia/system-ui gracefully.

- CSS variables are defined in `src/index.css` on `:root` — all components rely on them,
  so make sure `index.css` is imported in `src/index.js` (it already should be).

- The `page-wrapper` className is used on every page's root div — it's defined in `index.css`
  and ensures `min-height: 100vh` + bottom padding for the fixed footer.

- `login.css` and `signup.css` are now empty stubs — all auth styles live in
  `AuthPage.module.css`. The imports in Login.js / SignUp.js have been removed.