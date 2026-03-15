# 🧠 AI Engineering Guidelines -- Enterprise Next.js Platform

These rules define the **strict engineering standards** for all
AI-generated code in this platform.

This document acts as the **single source of truth for architecture,
performance, accessibility, and UX behavior**.

**These rules are mandatory. AI must follow them without exception.** If
any rule conflicts with generated code → **the code must be refactored
until compliant.**

------------------------------------------------------------------------

# 1️⃣ Core Technology Stack

The platform must use the following technologies **without deviation**.

  Category              Technology
  --------------------- -------------------------------------
  Framework             Next.js (App Router)
  Language              TypeScript -- strict mode
  Styling               Tailwind CSS
  Component Library     shadcn/ui
  State/Data Fetching   React Query (@tanstack/react-query)
  Forms                 React Hook Form
  Validation            Zod
  Notifications         Sonner
  Date Handling         date-fns
  Animation             Framer Motion
  Architecture          Smart / Dumb Component Pattern

AI must **not introduce alternative libraries** unless explicitly
approved.

------------------------------------------------------------------------

# 2️⃣ Mobile-First Product Philosophy (CRITICAL)

This product serves **\~90% mobile users**.

Therefore the UI must be **mobile-first by default**.\
Desktop is an enhancement --- **not the primary design target**.

### Mandatory Principles

-   Design for **320px → 430px** first
-   Touch-friendly interactions
-   Large tap targets
-   Avoid hover-dependent interactions
-   Thumb-zone accessibility
-   Gesture-friendly components
-   Optimized scroll performance
-   Low cognitive load layouts

### Touch Interaction Rules

Minimum tap target:

    44px × 44px

Spacing between interactive elements:

    8px minimum

### Forbidden Mobile UX

-   Hover-only interactions
-   Tiny tap targets
-   Dense desktop layouts
-   Horizontal scroll layouts
-   Complex nested menus

------------------------------------------------------------------------

# 3️⃣ Architecture Pattern

The application follows the **Smart / Dumb Component pattern**.

## Smart Components (Container Layer)

Responsibilities:

-   API communication
-   React Query hooks
-   Mutations
-   Data transformation
-   Business logic
-   Form submission logic

Location:

    /features/*
    /app/**/containers

Smart components **must NOT contain heavy UI markup**.

------------------------------------------------------------------------

## Dumb Components (Presentational Layer)

Responsibilities:

-   Pure UI rendering
-   No business logic
-   No API calls
-   Fully typed props
-   Reusable

Location:

    /components/ui
    /components/shared

Rules:

-   Must accept typed props
-   Must be composable
-   Must be stateless where possible

🚫 Never mix UI and business logic.

------------------------------------------------------------------------

# 4️⃣ React Query Data Layer (MANDATORY)

All server communication must use **React Query**.

Rules:

-   NEVER fetch inside `useEffect`
-   NEVER call `fetch()` directly in components
-   Use `useQuery`, `useMutation`, `useInfiniteQuery`

Queries must live inside:

    /hooks/queries

Example:

    useUsersQuery()
    useCreateOrderMutation()

------------------------------------------------------------------------

# 5️⃣ Forms Standard (React Hook Form + Zod)

Rules:

-   ALWAYS use React Hook Form
-   NEVER manage complex forms with `useState`
-   Use `zodResolver`
-   Types inferred from schema
-   Disable submit during submission
-   Display accessible error messages

Validation schemas must live in:

    /lib/validations

------------------------------------------------------------------------

# 6️⃣ Toast System (Sonner)

Used for:

-   Success
-   Error
-   Warning
-   Informational feedback

Rules:

-   Never use `alert()`
-   Never expose stack traces
-   Toasts must be short

Example:

    toast.success("Profile updated")

------------------------------------------------------------------------

# 7️⃣ Date Handling (date-fns)

Rules:

-   NEVER use `moment.js`
-   NEVER show raw ISO strings
-   Always use `date-fns`

Utilities:

    /lib/date.ts

Common functions:

    parseISO()
    format()
    differenceInDays()
    isBefore()
    isAfter()

------------------------------------------------------------------------

# 8️⃣ shadcn/ui Standards

Rules:

-   Use shadcn components
-   Extend via `className`
-   Never edit core files
-   Maintain accessibility
-   Use consistent variant patterns

------------------------------------------------------------------------

# 9️⃣ Responsive Design System

Mobile-first layout.

Rules:

-   No fixed widths
-   No layout overflow
-   Flexible grid & flex layouts
-   Tailwind breakpoints

Spacing system:

    8px grid

Viewport support:

    320px → 1536px

------------------------------------------------------------------------

# 🔟 Accessibility Standards

Accessibility overrides aesthetics.

Requirements:

-   Semantic HTML
-   ARIA attributes
-   Keyboard navigation
-   Visible focus states
-   Screen reader support
-   WCAG AA contrast

Forms must include:

    aria-invalid
    aria-describedby

------------------------------------------------------------------------

# 1️⃣1️⃣ SEO (Next.js App Router)

All pages must implement:

    generateMetadata()

Include:

-   title
-   description
-   openGraph
-   twitter
-   canonical

Rules:

-   One H1 per page
-   Proper heading hierarchy
-   JSON‑LD structured data
-   Use `Next/Image`

------------------------------------------------------------------------

# 1️⃣2️⃣ GEO (AI Discoverability)

Content must support AI discovery.

Rules:

-   Structured headings
-   FAQ sections when useful
-   Intent‑driven summaries
-   Machine readable formatting

------------------------------------------------------------------------

# 1️⃣3️⃣ Theme System

Supports **Dark and Light mode**.

Rules:

-   Class‑based theming
-   Persist preference in localStorage
-   Follow system preference
-   Token‑based colors

Hardcoded colors are forbidden.

------------------------------------------------------------------------

# 1️⃣4️⃣ Motion System (Framer Motion)

Animations must use **Framer Motion only**.

Centralize variants in:

    /lib/motion.ts

Duration guidelines:

Micro interaction

    150–300ms

Page transitions

    250–400ms

Never exceed

    500ms

------------------------------------------------------------------------

# 1️⃣5️⃣ Animation Performance Rules

Only animate:

    transform
    opacity

Never animate:

    width
    height
    top
    left
    margin

Use GPU acceleration:

    translate3d()
    translateZ(0)

Target performance:

    60fps

------------------------------------------------------------------------

# 1️⃣6️⃣ Performance Budget

### JavaScript

-   Minimal bundle
-   Aggressive code splitting

### CSS

-   Minimal global CSS
-   Avoid unused utilities

### Images

-   WebP / AVIF
-   Lazy loading

### Lighthouse Targets

    Performance ≥ 90
    Accessibility ≥ 95
    Best Practices ≥ 95
    SEO ≥ 95

------------------------------------------------------------------------

# 1️⃣7️⃣ Real User Monitoring (RUM)

Track:

-   LCP
-   CLS
-   INP
-   TTFB
-   Route transition time
-   API latency
-   JS runtime errors

------------------------------------------------------------------------

# 1️⃣8️⃣ Design Token System

All styling must use tokens.

### Colors

    primary
    secondary
    accent
    success
    warning
    error
    muted
    background
    foreground
    border

### Spacing

    space-1 → space-16

### Typography

    text-xs → text-5xl

### Radius

    radius-sm → radius-2xl

### Shadows

    shadow-xs → shadow-xl

------------------------------------------------------------------------

# 1️⃣9️⃣ RBAC Rendering Rules

Permissions defined in:

    /lib/permissions.ts

Use:

    useHasPermission()
    useHasRole()

Rules:

-   Never render unauthorized UI
-   Protect routes at layout level
-   Frontend RBAC complements backend validation

------------------------------------------------------------------------

# 2️⃣0️⃣ Security Standards

### XSS Prevention

-   Sanitize dangerous HTML
-   Escape dynamic content

### Sensitive Data

Never expose:

-   tokens
-   API secrets

Prefer:

    HTTP‑only cookies

### API Client

Handle:

    401 → logout
    403 → unauthorized page

------------------------------------------------------------------------

# 2️⃣1️⃣ Testing Architecture

### Unit Testing

Tools:

    Vitest / Jest
    React Testing Library

Test:

-   hooks
-   schemas
-   utilities
-   permissions

### Integration Testing

Test:

-   form flows
-   mutations
-   RBAC rendering

### E2E Testing

Tool:

    Playwright

Test:

-   authentication
-   protected routes
-   critical journeys

------------------------------------------------------------------------

# 2️⃣2️⃣ State Handling Standards

Every screen must handle:

    Loading
    Error
    Empty
    Not Found
    Unauthorized

### Loading

Use skeleton loaders.

### Error

Rules:

-   No stack traces
-   Friendly messages
-   Retry options

### Empty

Provide explanation and CTA.

### Not Found

Use:

    not-found.tsx

### Unauthorized

    401 → redirect login
    403 → access denied page

------------------------------------------------------------------------

# 2️⃣3️⃣ Next.js App Router File Structure

Routes may include:

    page.tsx
    layout.tsx
    loading.tsx
    error.tsx
    not-found.tsx

Rules:

-   `loading.tsx` → skeleton UI
-   `error.tsx` → retry mechanism
-   `layout.tsx` → providers & guards

------------------------------------------------------------------------

# 2️⃣4️⃣ Global Error Handling

Root must include:

    /app/error.tsx
    /app/not-found.tsx

Must capture:

-   unexpected crashes
-   suspense failures
-   async rendering issues

Errors must be logged to monitoring.

------------------------------------------------------------------------

# 2️⃣5️⃣ API & Routing Standards

All network communications and routing MUST adhere to the following rules:

Rules:

-   **API Calls**: ALL API calls MUST use `src/lib/http-service.ts` exclusively. NEVER use `fetch()` or a raw `axios` instance directly.
-   **Endpoints**: ALL API endpoints MUST be defined and exported inside the `API_CONFIG` object in `src/constants/constants.ts` (e.g., inside `API_CONFIG.ENDPOINTS`).
-   **Routes**: ALL frontend application routes MUST be defined and exported from `src/constants/constants.ts` (e.g., inside a `FRONTEND_ROUTES` object).
-   **Interfaces**: ALL request and response payload interfaces, as well as general models, MUST be defined in `src/constants/interface.ts`.

These constants and interfaces **MUST be used all the time** across the entire application without exception. Avoid hardcoding strings or interfaces.

------------------------------------------------------------------------

# 🚫 Strictly Forbidden

AI must never generate code that:

-   mixes UI and business logic
-   uses native date formatting
-   hardcodes colors
-   animates layout properties
-   exposes backend errors
-   ignores accessibility
-   ignores mobile UX
-   causes layout shifts
-   breaks performance budgets

------------------------------------------------------------------------

# 🏁 Final Engineering Standard

The platform must feel:

-   Fluid
-   Fast
-   Secure
-   Accessible
-   Mobile‑first
-   Maintainable
-   Scalable
-   Premium

If the result feels:

-   janky
-   inconsistent
-   slow
-   inaccessible

The implementation **must be refactored**.

------------------------------------------------------------------------

✅ This document acts as the **authoritative engineering specification
for AI code generation**.
