# AL MYSTERY ROOM
## Product Requirements Document & Technical Specification
**Document Type:** Single Source of Truth (SSOT) for Spec-Driven Development  
**Version:** 1.0.0  
**Status:** Initial Development Specification  
**Project Type:** AI-Powered Interactive Mystery Investigation Platform

---

# 1. PROJECT OVERVIEW

## 1.1 Product Name
**AI Mystery Room**

## 1.2 Product Description

AI Mystery Room is an AI-powered interactive investigation platform where users become detectives and solve fictional mysteries generated dynamically using Artificial Intelligence.

Users provide a short scenario, story idea, or mystery theme. Based on this input, the AI generates a complete fictional investigation containing:

- A mystery scenario.
- A list of suspects.
- One predetermined culprit.
- A detailed incident timeline.
- AI-generated investigation evidence.
- Hidden clues and misleading information.
- Witness statements.
- A final investigation report.

Users investigate the case by examining evidence such as:

- WhatsApp-style conversations.
- Photographs and digital images.
- CCTV recordings or simulated CCTV footage.
- Call records.
- Emails.
- Documents.
- Witness statements.
- Location records.
- Other digital evidence.

After investigating the available evidence, users must identify the culprit and submit their final accusation.

The platform evaluates the accusation and reveals whether the user successfully solved the mystery.

## 1.3 Core Concept

**"You provide the story. AI creates the mystery. You solve the crime."**

The platform transforms a simple story idea into an interactive detective investigation.

## 1.4 Product Goals

1. Create dynamically generated mysteries using Gemini AI.
2. Provide an immersive detective investigation experience.
3. Generate interconnected clues and evidence.
4. Ensure every mystery has exactly one predetermined culprit.
5. Make investigations challenging but logically solvable.
6. Provide an interactive and visually engaging interface.
7. Support multiple mystery scenarios and difficulty levels.
8. Allow users to track completed investigations and results.

---

# 2. TECHNOLOGY STACK

## 2.1 Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend application |
| Vite | Development server and build tool |
| React Router | Client-side navigation |
| Tailwind CSS | Styling and responsive layouts |
| Lucide React | Icons |
| Axios | API communication |
| React Context API | Authentication and global state |

## 2.2 Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Primary database |
| Mongoose | Database object modeling |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |
| Zod | Request and data validation |

## 2.3 Artificial Intelligence

**Primary AI Provider: Google Gemini**

Gemini will handle:

- Scenario understanding.
- Mystery generation.
- Suspect generation.
- Culprit selection.
- Investigation timeline creation.
- Evidence content generation.
- Clue generation.
- Evidence consistency checking.
- Final investigation evaluation.
- Detective feedback and explanations.

AI integration must happen exclusively through the backend.

The Gemini API key must never be exposed in frontend code.

## 2.4 AI Media Generation

Use a provider abstraction for generated media.

| Media | Generation approach |
|---|---|
| WhatsApp conversations | Gemini-generated structured content |
| Emails | Gemini-generated structured content |
| Documents | Gemini-generated text/document layouts |
| Photographs | AI image-generation provider |
| CCTV recordings | AI video-generation provider or simulated CCTV sequences |
| Call records | Gemini-generated structured content |
| Witness statements | Gemini-generated structured content |

**Important implementation rule:** Gemini text generation and image/video generation are separate capabilities. Do not assume a text-generation API can directly produce playable image or video files.

The application must support generated media URLs and fallbacks. If video generation is unavailable, display a realistic CCTV evidence interface using generated timestamps, scene descriptions, and simulated footage rather than presenting a text description as an actual video.

---

# 3. USER ROLES

The initial application will support two user roles.

## 3.1 Guest User

A guest can:

- Access the landing page.
- Explore the platform.
- View example mysteries.
- Register for an account.
- Log in.

Guest investigation access is not included in the initial MVP.

## 3.2 Registered User

An authenticated user can:

- Create a mystery.
- Select a difficulty level.
- Investigate generated cases.
- View suspects.
- Examine evidence.
- Maintain investigation notes.
- Submit a culprit.
- View investigation results.
- Access investigation history.
- Delete their own investigations.

There is no administrator dashboard in the initial MVP.

---

# 4. APPLICATION STRUCTURE

## 4.1 Main Application Pages

| Route | Page | Access |
|---|---|---|
| `/` | Landing Page | Public |
| `/login` | Login | Public |
| `/register` | Registration | Public |
| `/dashboard` | User Dashboard | Authenticated |
| `/create-mystery` | Mystery Creation | Authenticated |
| `/investigation/:id` | Investigation Room | Authenticated |
| `/investigation/:id/evidence/:evidenceId` | Evidence Viewer | Authenticated |
| `/investigation/:id/accusation` | Final Accusation | Authenticated |
| `/investigation/:id/result` | Investigation Result | Authenticated |
| `/history` | Investigation History | Authenticated |
| `/profile` | User Profile | Authenticated |

All protected routes must verify authentication.

---

# 5. FUNCTIONAL REQUIREMENTS

## 5.1 Landing Page

The landing page introduces AI Mystery Room.

### Required Sections

1. Navigation bar.
2. Hero section.
3. Product introduction.
4. How It Works section.
5. Mystery investigation preview.
6. Features section.
7. Call-to-action section.
8. Footer.

### Hero Section

Main heading:

"Every Mystery Has a Secret. Can You Find It?"

Supporting text:

"Enter a world of secrets, suspicious characters, and hidden evidence. Create your own mystery and put your detective skills to the test."

Primary CTA: Start Investigating

Secondary CTA: Explore How It Works

---

## 5.2 Authentication

Implement secure user registration and login.

### Registration Fields

- Full name.
- Email address.
- Password.
- Confirm password.

### Login Fields

- Email address.
- Password.

### Requirements

- Validate email format.
- Enforce password requirements.
- Hash passwords using bcrypt.
- Issue JWT after successful authentication.
- Protect private API routes.
- Handle expired and invalid tokens.
- Provide logout functionality.

---

## 5.3 User Dashboard

The dashboard is the central workspace after login.

### Dashboard Components

1. Welcome message.
2. Create New Mystery button.
3. Active Investigations.
4. Completed Investigations.
5. Recent Investigation History.
6. Total Cases Solved.
7. Total Investigations.

### Empty State

If the user has no investigations, display:

"No mysteries yet. Your first investigation is waiting."

CTA: Create Your First Mystery.

---

# 6. MYSTERY CREATION SYSTEM

This is the primary entry point into the application.

## 6.1 User Input

The user provides a small scenario or story.

Example:

"An expensive diamond disappeared from a hotel room during a private event. Three employees had access to the room. Nobody admits seeing anything suspicious."

### Input Fields

| Field | Description |
|---|---|
| Mystery Title | Optional custom title |
| Scenario | User-provided story |
| Difficulty | Easy, Medium, Hard |
| Mystery Category | Theft, Missing Person, Cyber Mystery, General Mystery |
| Number of Suspects | 3–6 |
| Evidence Amount | Standard or Extended |

For MVP, mystery categories must remain fictional and non-graphic.

## 6.2 Difficulty Levels

**Easy**
- 3 suspects.
- 5–7 evidence items.
- Clearly identifiable clues.
- Limited misleading evidence.

**Medium**
- 4 suspects.
- 8–12 evidence items.
- Interconnected clues.
- Some misleading information.

**Hard**
- 5–6 suspects.
- 12–16 evidence items.
- Complex timeline.
- Multiple connected clues.
- More subtle contradictions.

Difficulty must change the logical complexity of the investigation, not make the answer arbitrary.

## 6.3 Mystery Generation Workflow

1. User submits the scenario.
2. Frontend validates the input.
3. Backend receives the request.
4. Backend creates an investigation record with status `GENERATING`.
5. Backend sends the scenario and configuration to Gemini.
6. Gemini generates the complete mystery blueprint.
7. Backend validates the generated blueprint.
8. Backend generates the evidence assets.
9. Backend verifies evidence consistency.
10. Backend stores the complete investigation.
11. Investigation status changes to `ACTIVE`.
12. Frontend redirects the user to the Investigation Room.

If generation fails, the investigation must not be marked active.

Show a generation progress interface with stages such as:

- Understanding your story.
- Creating suspects.
- Establishing the mystery.
- Generating evidence.
- Preparing investigation files.

---

# 7. AI MYSTERY GENERATION ENGINE

This is the most important backend component.

## 7.1 Core AI Architecture

The AI engine must use a structured generation pipeline.

**Stage 1: Scenario Analysis**

Understand the user's input and identify:
- Main incident.
- Location.
- Setting.
- Relevant characters.
- Possible motives.
- Potential mystery direction.

**Stage 2: Mystery Blueprint Generation**

Generate:
- Mystery ID.
- Case title.
- Case description.
- Incident details.
- Suspects.
- Actual culprit.
- Motive.
- Incident timeline.
- Secret events.
- Clue relationships.

**Stage 3: Evidence Generation**

Generate evidence based on the already established blueprint.

Each evidence item must support or challenge a particular theory.

**Stage 4: Consistency Validation**

Verify:
- All evidence follows the timeline.
- Suspect identities remain consistent.
- Evidence does not contradict established facts accidentally.
- The culprit is the same throughout.
- The solution is logically discoverable.
- The mystery has exactly one intended culprit.

**Stage 5: Final Case Publication**

Only publish the mystery after successful validation.

## 7.2 Critical AI Rules

The following rules are mandatory:

1. Select the culprit before generating evidence.
2. Never randomly change the culprit during evidence generation.
3. Never expose the culprit in the public case description.
4. Every suspect must have a believable background.
5. At least two evidence items should meaningfully support the correct solution.
6. Include some evidence that initially creates suspicion around other suspects.
7. Every major clue must connect to the actual incident.
8. The case must be solvable using the evidence available to the user.
9. Never introduce a new decisive clue after the investigation begins.
10. Store the original mystery blueprint as the authoritative source of truth.

The backend must treat the mystery blueprint as immutable after case publication.

---

# 8. EVIDENCE MANAGEMENT SYSTEM

Evidence is the main interactive feature of the application.

## 8.1 Evidence Categories

### A. Chat Evidence

Display fictional WhatsApp-style conversations.

Information:
- Sender.
- Receiver.
- Timestamp.
- Message content.
- Message status.
- Conversation participants.

UI:
- Chat-style interface.
- Different message bubbles.
- Contact names.
- Conversation timestamps.

### B. Image Evidence

Display AI-generated photographs.

Examples:
- Photographs of locations.
- Objects discovered at the scene.
- Suspicious items.
- Photographs of fictional documents.

Information:
- Image.
- Evidence title.
- Description.
- Timestamp.
- Source.

### C. CCTV Evidence

Display a simulated or generated surveillance recording.

Information:
- Video URL, if actual footage exists.
- Camera ID.
- Location.
- Recording timestamp.
- Duration.
- Scene description.

UI:
- CCTV player when video exists.
- Recording timestamp.
- Camera identification.
- Playback controls.

If no video asset exists, use a clearly labelled CCTV transcript or reconstructed scene.

### D. Document Evidence

Examples:
- Emails.
- Letters.
- Reports.
- Receipts.
- Digital documents.

Information:
- Document title.
- Document type.
- Content.
- Creation date.
- Source.

### E. Call Records

Information:
- Caller.
- Receiver.
- Timestamp.
- Duration.
- Call status.

### F. Witness Statements

Information:
- Witness name.
- Statement.
- Statement timestamp.
- Related suspect.
- Reliability indicator.

Reliability must not reveal the correct culprit directly.

## 8.2 Evidence Interaction

Users must be able to:

- Open evidence.
- View full evidence details.
- Switch between evidence categories.
- Mark evidence as reviewed.
- Bookmark important evidence.
- Add personal notes.
- Revisit previously examined evidence.

## 8.3 Evidence Classification

Every evidence item must have an internal classification:

- `SUPPORTING`
- `CONTRADICTING`
- `NEUTRAL`
- `MISLEADING`

These classifications must never be exposed directly to the user.

The user must independently interpret the evidence.

---

# 9. INVESTIGATION ROOM UI

This is the core experience of the platform.

## 9.1 Layout

The investigation room should have a detective investigation dashboard.

### Main Layout

**Left Sidebar**
- Case information.
- Suspect list.
- Investigation progress.
- Evidence categories.

**Main Content Area**
- Selected evidence.
- Evidence viewer.
- Interactive content.

**Right Sidebar**
- Investigation notes.
- Bookmarked evidence.
- Case timeline.

For smaller screens, use responsive drawers or tabs instead of three fixed columns.

## 9.2 Investigation Header

Display:
- Case ID.
- Case title.
- Difficulty.
- Investigation status.
- Evidence reviewed count.
- Total evidence count.

Example:

CASE #MR-001  
THE MISSING DIAMOND  
Status: Active Investigation

## 9.3 Suspect Profiles

Every suspect profile should contain:

- Name.
- Fictional photograph or avatar.
- Age.
- Occupation.
- Relationship to the incident.
- Background.
- Possible motive.
- Alibi.
- Profile description.

The actual culprit must not be revealed.

## 9.4 Evidence Navigation

Evidence should be grouped by type.

Example:

- All Evidence
- Messages
- Photographs
- CCTV
- Documents
- Call Records
- Witness Statements

Provide visual indicators for reviewed and bookmarked evidence.

---

# 10. INVESTIGATION NOTES

Users should be able to maintain their own investigation notes.

### Features

- Add a note.
- Edit a note.
- Delete a note.
- Bookmark evidence.
- Link a note to an evidence item.

Notes must be saved to MongoDB.

Each user must only access their own notes.

---

# 11. FINAL ACCUSATION SYSTEM

Once the user believes they have solved the mystery, they can submit an accusation.

## 11.1 Accusation Screen

Display:

"Who do you believe is responsible?"

Show all suspects as selectable cards.

User must select one suspect.

Also provide an optional reasoning field:

"Explain which evidence led you to this conclusion."

## 11.2 Submission Rules

- Only one active accusation submission is permitted per investigation.
- User must select a suspect.
- Reasoning is optional.
- Confirmation is required before submission.
- The submitted accusation is saved.
- The investigation becomes completed.

MVP uses one final attempt per case.

## 11.3 Evaluation

The backend compares the selected suspect ID against the actual culprit ID stored in the private mystery blueprint.

The verdict must be determined by backend logic, not by trusting a second AI prediction.

Gemini can generate a personalized explanation after the verdict is determined.

## 11.4 Results Screen

### Correct Accusation

Display:

"CASE SOLVED!"

- Correct culprit.
- Actual motive.
- Key evidence.
- Explanation of the mystery.
- Final investigation summary.

### Incorrect Accusation

Display:

"CASE CLOSED. BUT THE WRONG PERSON WAS ACCUSED."

- Selected suspect.
- Actual culprit.
- Explanation of what happened.
- Key overlooked clues.
- Correct investigation timeline.

Never expose the actual culprit before the accusation is submitted.

---

# 12. MONGODB DATABASE DESIGN

Use MongoDB with Mongoose.

## 12.1 User Collection

`users`

Fields:

- `_id`
- `name`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

## 12.2 Investigation Collection

`investigations`

Fields:

- `_id`
- `userId`
- `caseId`
- `title`
- `scenario`
- `category`
- `difficulty`
- `status`
- `generationStatus`
- `blueprint` (private)
- `suspects` (public-safe suspect data)
- `evidence`
- `timeline` (private until verdict)
- `createdAt`
- `completedAt`
- `updatedAt`

Important:

The private blueprint must contain:
- Culprit ID.
- Culprit identity.
- Motive.
- Actual incident sequence.
- Correct solution.
- Internal clue relationships.

Never return these private fields through normal investigation API responses.

## 12.3 Evidence Collection

`evidence`

Fields:

- `_id`
- `investigationId`
- `type`
- `title`
- `description`
- `content`
- `mediaUrl`
- `metadata`
- `internalClassification`
- `relatedSuspectIds`
- `createdAt`

## 12.4 Investigation Notes Collection

`notes`

Fields:

- `_id`
- `userId`
- `investigationId`
- `evidenceId`
- `content`
- `createdAt`
- `updatedAt`

## 12.5 Accusation Collection

`accusations`

Fields:

- `_id`
- `userId`
- `investigationId`
- `selectedSuspectId`
- `reasoning`
- `isCorrect`
- `actualCulpritId`
- `submittedAt`

Accusation creation must be atomic or protected by a unique constraint on `investigationId` and `userId`.

---

# 13. BACKEND API DESIGN

Base URL:

`/api/v1`

## 13.1 Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register account |
| POST | `/auth/login` | Login |
| GET | `/auth/me` | Get authenticated user |
| POST | `/auth/logout` | Logout |

## 13.2 Investigation

| Method | Endpoint | Description |
|---|---|---|
| POST | `/investigations` | Create mystery |
| GET | `/investigations` | Get user investigations |
| GET | `/investigations/:id` | Get investigation |
| GET | `/investigations/:id/status` | Get generation status |
| DELETE | `/investigations/:id` | Delete investigation |

## 13.3 Suspects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/investigations/:id/suspects` | Get suspects |
| GET | `/investigations/:id/suspects/:suspectId` | Get suspect details |

## 13.4 Evidence

| Method | Endpoint | Description |
|---|---|---|
| GET | `/investigations/:id/evidence` | Get evidence list |
| GET | `/investigations/:id/evidence/:evidenceId` | Get evidence details |
| POST | `/investigations/:id/evidence/:evidenceId/review` | Mark evidence reviewed |
| POST | `/investigations/:id/evidence/:evidenceId/bookmark` | Bookmark evidence |

## 13.5 Notes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/investigations/:id/notes` | Get notes |
| POST | `/investigations/:id/notes` | Create note |
| PATCH | `/notes/:noteId` | Update note |
| DELETE | `/notes/:noteId` | Delete note |

## 13.6 Accusation

| Method | Endpoint | Description |
|---|---|---|
| POST | `/investigations/:id/accusation` | Submit final accusation |
| GET | `/investigations/:id/result` | Get final result |

All endpoints must implement authentication and ownership authorization where applicable.

---

# 14. BACKEND PROJECT STRUCTURE

Recommended structure:

```text
backend/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Investigation.js
│   │   ├── Evidence.js
│   │   ├── Note.js
│   │   └── Accusation.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── investigationController.js
│   │   ├── evidenceController.js
│   │   ├── noteController.js
│   │   └── accusationController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── investigationRoutes.js
│   │   ├── evidenceRoutes.js
│   │   ├── noteRoutes.js
│   │   └── accusationRoutes.js
│   │
│   ├── services/
│   │   ├── geminiService.js
│   │   ├── mysteryGenerator.js
│   │   ├── evidenceGenerator.js
│   │   ├── consistencyValidator.js
│   │   ├── mediaService.js
│   │   └── accusationService.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   │
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── investigationValidator.js
│   │
│   ├── utils/
│   │   ├── generateCaseId.js
│   │   └── apiResponse.js
│   │
│   └── server.js
│
├── .env
├── .env.example
├── package.json
└── README.md
```

---

# 15. FRONTEND PROJECT STRUCTURE

```text
frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── investigation/
│   │   ├── evidence/
│   │   └── suspects/
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CreateMysteryPage.jsx
│   │   ├── InvestigationPage.jsx
│   │   ├── AccusationPage.jsx
│   │   ├── ResultPage.jsx
│   │   ├── HistoryPage.jsx
│   │   └── ProfilePage.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── investigationService.js
│   │   └── evidenceService.js
│   │
│   ├── hooks/
│   ├── utils/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
└── vite.config.js
```

---

# 16. UI/UX DESIGN SYSTEM

## 16.1 Design Direction

The application should feel like a premium detective investigation platform.

Visual inspiration:
- Detective case management systems.
- Dark mystery investigation rooms.
- Digital forensic interfaces.
- Cinematic mystery games.

Avoid a generic SaaS dashboard appearance.

## 16.2 Color Palette

| Element | Color |
|---|---|
| Primary Background | `#0B0F14` |
| Secondary Background | `#121922` |
| Card Background | `#18212B` |
| Primary Accent | `#C89B3C` |
| Secondary Accent | `#64748B` |
| Primary Text | `#F5F5F5` |
| Secondary Text | `#A1AAB5` |
| Success | `#22C55E` |
| Danger | `#EF4444` |

## 16.3 Typography

Use:
- Inter for interface text.
- Space Grotesk for headings.

## 16.4 Design Requirements

- Dark-first interface.
- Responsive layouts.
- Smooth transitions.
- Subtle animations.
- Consistent spacing.
- Clear visual hierarchy.
- Reusable components.
- Loading skeletons.
- Empty states.
- Error states.
- Toast notifications.

## 16.5 Investigation Room Styling

Use:
- Evidence cards.
- Case-file panels.
- Timeline indicators.
- Suspect profile cards.
- Chat message interfaces.
- Document preview panels.
- CCTV viewer panels.
- Evidence status indicators.

The UI should be immersive without sacrificing usability.

---

# 17. SECURITY REQUIREMENTS

1. Store API keys exclusively in backend environment variables.
2. Hash passwords using bcrypt.
3. Authenticate protected endpoints using JWT.
4. Validate all incoming requests.
5. Enforce investigation ownership.
6. Never expose the actual culprit before accusation submission.
7. Never expose private AI prompts or mystery blueprints.
8. Prevent users from accessing other users' investigations.
9. Sanitize user-generated text.
10. Apply API rate limiting.
11. Validate uploaded files and file sizes.
12. Restrict generated media access to authorized users.
13. Protect against duplicate accusation submissions.
14. Do not trust frontend verdict calculations.
15. Use environment variables for all deployment secrets.

The platform must generate fictional cases and fictional evidence. It must not present generated material as authentic evidence or allow the creation of defamatory accusations against real individuals.

---

# 18. ERROR HANDLING

The application must handle:

- Invalid registration details.
- Invalid login credentials.
- Expired authentication tokens.
- Gemini API failures.
- AI response parsing failures.
- Invalid mystery generation.
- Evidence generation failures.
- Media generation failures.
- Database connection failures.
- Missing investigation IDs.
- Unauthorized access.
- Duplicate accusation submissions.
- Network errors.

Every backend response must follow a consistent structure.

Example:

```json
{
  "success": false,
  "message": "Unable to generate investigation",
  "error": {
    "code": "MYSTERY_GENERATION_FAILED"
  }
}
```

Do not expose stack traces, API keys, internal prompts, or private case information in production responses.

---

# 19. ENVIRONMENT VARIABLES

Backend `.env.example`:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=

JWT_SECRET=
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=
GEMINI_MODEL=

FRONTEND_URL=http://localhost:5173

MEDIA_PROVIDER_API_KEY=
MEDIA_STORAGE_BUCKET=
```

Frontend `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

Never commit actual `.env` files to GitHub.

---

# 20. NON-FUNCTIONAL REQUIREMENTS

## Performance

- Initial frontend page should load quickly.
- API responses should be optimized.
- Database queries should use appropriate indexes.
- AI generation must run asynchronously where necessary.
- Evidence assets should load progressively.
- Media should be lazy-loaded.

## Scalability

- Keep AI services separate from controllers.
- Use modular Express architecture.
- Support asynchronous investigation generation.
- Avoid generating all media synchronously in one HTTP request.
- Allow future integration of background job queues.

## Reliability

- Validate all AI-generated JSON.
- Retry transient AI failures with limits.
- Prevent incomplete investigations from becoming active.
- Maintain one authoritative mystery blueprint.
- Ensure accusation submission is atomic.

---

# 21. MVP DEVELOPMENT PHASES

Development must follow this sequence.

## Phase 1: Project Foundation

- Initialize React + Vite.
- Initialize Express backend.
- Connect MongoDB.
- Configure environment variables.
- Set up project structure.
- Configure routing.
- Create base design system.

**Completion criteria:** Frontend and backend run successfully and communicate.

## Phase 2: Authentication

- Registration.
- Login.
- JWT authentication.
- Protected routes.
- Logout.

**Completion criteria:** Users can securely register, log in, and access their dashboard.

## Phase 3: Mystery Generation

- Scenario input form.
- Gemini integration.
- Structured mystery generation.
- Suspect generation.
- Culprit selection.
- Timeline generation.
- Blueprint validation.

**Completion criteria:** The application can generate a complete, logically consistent mystery.

## Phase 4: Evidence Generation

- Generate WhatsApp conversations.
- Generate documents.
- Generate call records.
- Generate witness statements.
- Integrate image generation.
- Integrate CCTV simulation or video generation.
- Validate evidence consistency.

**Completion criteria:** Each investigation has a coherent evidence collection.

## Phase 5: Investigation Room

- Investigation dashboard.
- Suspect profiles.
- Evidence categories.
- Evidence viewer.
- Bookmarks.
- Investigation notes.
- Reviewed status.

**Completion criteria:** Users can investigate a case without seeing the answer.

## Phase 6: Accusation and Results

- Suspect selection.
- Final accusation.
- Backend verdict calculation.
- Solution explanation.
- Results page.
- Investigation completion.

**Completion criteria:** Users can submit an accusation and receive the correct result.

## Phase 7: Dashboard and History

- Active investigations.
- Completed investigations.
- Investigation history.
- Statistics.
- Delete investigation.

**Completion criteria:** Users can manage their investigations.

## Phase 8: Testing and Deployment

- Functional testing.
- API testing.
- Authentication testing.
- AI consistency testing.
- Responsive testing.
- Security review.
- Production deployment.

---

# 22. OUT OF SCOPE FOR MVP

The following features are not required in the first version:

- Multiplayer investigations.
- Live multiplayer collaboration.
- Real-time chat between detectives.
- Leaderboards.
- Competitive tournaments.
- Subscription payments.
- Premium mystery marketplace.
- User-generated public mystery sharing.
- Admin dashboard.
- Voice-based detective assistant.
- AI-generated interactive 3D crime scenes.
- Unlimited accusation attempts.

These can be considered for future versions.

---

# 23. FUTURE ENHANCEMENTS

Potential future features:

1. Multiplayer detective mode.
2. Real-time collaborative investigation.
3. Daily mystery challenges.
4. Global detective leaderboard.
5. Mystery difficulty progression.
6. AI detective assistant.
7. Voice interrogation simulations.
8. Interactive crime scene maps.
9. AI-generated video evidence.
10. Community-created mystery scenarios.
11. Mystery sharing and replay.
12. Achievement and reward system.

---

# 24. ACCEPTANCE CRITERIA

The MVP is considered complete only when the following requirements work end-to-end.

| ID | Requirement | Expected Result |
|---|---|---|
| AC-01 | User registration | User account created successfully |
| AC-02 | User login | Authenticated dashboard accessible |
| AC-03 | Mystery input | User can submit a scenario |
| AC-04 | AI generation | Gemini generates a structured mystery |
| AC-05 | Culprit consistency | Exactly one predetermined culprit |
| AC-06 | Suspect generation | All suspects have complete profiles |
| AC-07 | Evidence generation | Multiple evidence categories available |
| AC-08 | Evidence consistency | Evidence follows the authoritative timeline |
| AC-09 | Investigation room | User can inspect all available evidence |
| AC-10 | Investigation notes | Notes can be created, updated, and deleted |
| AC-11 | Evidence bookmarks | Evidence can be bookmarked |
| AC-12 | Final accusation | User can select one suspect |
| AC-13 | Verdict | Backend correctly evaluates the accusation |
| AC-14 | Solution reveal | Actual culprit and explanation become visible after submission |
| AC-15 | Investigation history | Completed cases are accessible |
| AC-16 | Authorization | Users cannot access another user's cases |
| AC-17 | Responsive design | Application works on desktop and mobile |
| AC-18 | Failure handling | Generation failures do not create active incomplete cases |

---

# 25. IMPORTANT DEVELOPMENT RULES FOR CODEX

These rules are mandatory.

1. This document is the single source of truth for product requirements and architecture.
2. Read this specification completely before writing code.
3. Follow the defined MERN architecture.
4. Use Gemini as the primary AI reasoning and content-generation provider.
5. Never hardcode investigation results or randomly select a culprit.
6. Never expose private mystery blueprint data to the frontend.
7. Never generate evidence independently of the established mystery blueprint.
8. Keep frontend, backend, database, and AI logic modular.
9. Use reusable React components.
10. Follow consistent naming conventions.
11. Validate all backend inputs.
12. Do not leave non-functional buttons or placeholder API integrations.
13. Do not silently replace failed AI generation with fake success responses.
14. Build features in the defined development phases.
15. Test each phase before proceeding to the next.
16. Maintain this specification when making architectural decisions.
17. If a requirement is ambiguous, choose the simplest implementation consistent with this document and record the assumption.
18. Do not introduce unnecessary dependencies.
19. Update the project README with setup instructions and environment variables.
20. Do not mark a phase complete until its acceptance criteria pass.

---

# 26. DEFINITION OF DONE

The project is considered successfully delivered when:

- A user can register and log in.
- A user can submit a custom mystery scenario.
- Gemini generates a complete fictional investigation.
- The system establishes a predetermined culprit.
- Suspects and evidence are generated consistently.
- Evidence is presented through an immersive investigation interface.
- Users can review evidence and take notes.
- Users can submit a final accusation.
- The backend evaluates the accusation correctly.
- The system reveals the actual solution.
- Investigation results are saved.
- The application works responsively.
- No critical authentication, authorization, or data-leakage issues remain.

**FINAL PRODUCT VISION**

AI Mystery Room is not simply a chatbot that tells detective stories.

It is an interactive AI-powered investigation platform where every case has an established truth, every suspect has a background, every clue has a purpose, and every user must investigate before reaching a conclusion.

**The objective is to make users feel like actual detectives solving a carefully constructed fictional mystery.**