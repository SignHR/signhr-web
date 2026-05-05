# SignHR Design System

> Complete design specification for replicating the SignHR HR Management platform UI.

---

## 1. Color Palette

All colors are defined as HSL values via CSS custom properties. Use Tailwind semantic tokens — **never hardcode colors** in components.

### Light Mode (`:root`)

| Token                      | HSL Value     | Resolved Hex | Usage                                                     |
| -------------------------- | ------------- | ------------ | --------------------------------------------------------- |
| `--background`             | `220 14% 96%` | `#F2F3F5`    | Page background                                           |
| `--foreground`             | `230 25% 12%` | `#171B2C`    | Primary text                                              |
| `--card`                   | `0 0% 100%`   | `#FFFFFF`    | Card/panel surfaces                                       |
| `--card-foreground`        | `230 25% 12%` | `#171B2C`    | Text on cards                                             |
| `--primary`                | `258 58% 56%` | `#7C4DFF`    | Brand purple — buttons, active states, links, focus rings |
| `--primary-foreground`     | `0 0% 100%`   | `#FFFFFF`    | Text/icons on primary                                     |
| `--secondary`              | `258 30% 96%` | `#F3F0FA`    | Hover backgrounds, subtle purple tint                     |
| `--secondary-foreground`   | `258 40% 30%` | `#3B2A66`    | Text on secondary                                         |
| `--muted`                  | `220 14% 93%` | `#EBEBEF`    | Disabled surfaces, empty states                           |
| `--muted-foreground`       | `220 10% 46%` | `#6B7080`    | Secondary text, captions, labels                          |
| `--accent`                 | `35 92% 55%`  | `#F5A623`    | Amber/orange — warnings, highlights                       |
| `--accent-foreground`      | `35 95% 20%`  | `#634003`    | Text on accent                                            |
| `--destructive`            | `0 72% 55%`   | `#E04343`    | Error/danger red                                          |
| `--destructive-foreground` | `0 0% 100%`   | `#FFFFFF`    | Text on destructive                                       |
| `--border`                 | `220 16% 90%` | `#E0E2E8`    | All borders                                               |
| `--input`                  | `220 16% 90%` | `#E0E2E8`    | Input field borders                                       |
| `--ring`                   | `258 58% 56%` | `#7C4DFF`    | Focus rings                                               |
| `--success`                | `152 56% 46%` | `#34B77B`    | Green — approved, active, on-time                         |
| `--success-foreground`     | `0 0% 100%`   | `#FFFFFF`    | Text on success                                           |
| `--warning`                | `35 92% 55%`  | `#F5A623`    | Warning states                                            |
| `--warning-foreground`     | `35 95% 20%`  | `#634003`    | Text on warning                                           |
| `--info`                   | `210 80% 55%` | `#3B8BF5`    | Informational blue                                        |
| `--info-foreground`        | `0 0% 100%`   | `#FFFFFF`    | Text on info                                              |

### Dark Mode (`.dark` class on `<html>`)

| Token                      | HSL Value     | Usage                     |
| -------------------------- | ------------- | ------------------------- |
| `--background`             | `230 20% 10%` | Dark page background      |
| `--foreground`             | `210 20% 92%` | Light text                |
| `--card`                   | `230 18% 14%` | Dark card surfaces        |
| `--card-foreground`        | `210 20% 92%` | Text on dark cards        |
| `--primary`                | `258 58% 62%` | Slightly lighter purple   |
| `--primary-foreground`     | `0 0% 100%`   | Text on primary           |
| `--secondary`              | `258 20% 20%` | Dark secondary            |
| `--secondary-foreground`   | `258 30% 80%` | Text on dark secondary    |
| `--muted`                  | `230 15% 18%` | Dark muted surfaces       |
| `--muted-foreground`       | `220 10% 55%` | Subdued text              |
| `--accent`                 | `35 85% 50%`  | Slightly muted amber      |
| `--accent-foreground`      | `35 95% 90%`  | Light text on dark accent |
| `--destructive`            | `0 65% 48%`   | Darker red                |
| `--destructive-foreground` | `0 0% 100%`   | Text on destructive       |
| `--border`                 | `230 15% 20%` | Dark borders              |
| `--input`                  | `230 15% 20%` | Dark input borders        |
| `--ring`                   | `258 58% 62%` | Focus ring                |
| `--success`                | `152 50% 40%` | Muted green               |
| `--success-foreground`     | `0 0% 100%`   | Text on success           |
| `--warning`                | `35 80% 48%`  | Muted amber               |
| `--warning-foreground`     | `0 0% 100%`   | Text on warning           |
| `--info`                   | `210 70% 50%` | Muted blue                |
| `--info-foreground`        | `0 0% 100%`   | Text on info              |

### Status Color Patterns

Use translucent background + solid text for status badges:

```
Active/Approved/On Time  → bg-success/10 text-success
Pending/Warning/Late     → bg-accent/10 text-accent-foreground
Error/Rejected           → bg-destructive/10 text-destructive
Remote/Info              → bg-primary/10 text-primary
On Leave/Disabled        → bg-muted text-muted-foreground
```

---

## 2. Typography

### Font Families

```css
--font-display:
  "Space Grotesk", sans-serif; /* Headings, widget titles, stat numbers */
--font-body: "DM Sans", sans-serif; /* Body text, labels, buttons */
```

**Google Fonts import:**

```
https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap
```

### Type Scale

| Element                   | Font Family   | Size            | Weight | Tailwind Classes                                                     |
| ------------------------- | ------------- | --------------- | ------ | -------------------------------------------------------------------- |
| **Page Title (h1)**       | Space Grotesk | 24px (1.5rem)   | 700    | `font-display text-2xl font-bold text-foreground`                    |
| **Section Title (h2)**    | Space Grotesk | 18px (1.125rem) | 600    | `font-display text-lg font-semibold text-foreground`                 |
| **Widget Title (h3)**     | Space Grotesk | 14px (0.875rem) | 600    | `font-display text-sm font-semibold text-foreground`                 |
| **Stat Number**           | Space Grotesk | 30px (1.875rem) | 700    | `font-display text-3xl font-bold tracking-tight text-foreground`     |
| **Stat Number (card)**    | Space Grotesk | 24px (1.5rem)   | 700    | `font-display text-2xl font-bold text-foreground`                    |
| **Body Text**             | DM Sans       | 14px (0.875rem) | 400    | `text-sm text-foreground`                                            |
| **Body Secondary**        | DM Sans       | 14px            | 500    | `text-sm font-medium text-foreground`                                |
| **Caption/Subtitle**      | DM Sans       | 14px            | 400    | `text-sm text-muted-foreground`                                      |
| **Small Label**           | DM Sans       | 12px (0.75rem)  | 400    | `text-xs text-muted-foreground`                                      |
| **Micro Label**           | DM Sans       | 11px            | 500    | `text-[11px] text-muted-foreground`                                  |
| **Section Header**        | DM Sans       | 11px            | 500    | `text-[11px] font-medium text-muted-foreground/70`                   |
| **Table Header**          | DM Sans       | 12px            | 500    | `text-xs font-medium text-muted-foreground uppercase tracking-wider` |
| **Badge/Tag**             | DM Sans       | 12px            | 500    | `text-xs font-medium`                                                |
| **Tiny (calendar event)** | DM Sans       | 10px            | 500    | `text-[10px] font-medium`                                            |

### Application Rules

- All `<h1>`–`<h6>` elements use `font-family: var(--font-display)` via the base layer.
- `<body>` uses `font-family: var(--font-body)` with `antialiased`.
- Only one `<h1>` per page (the page title).

---

## 3. Spacing Scale

The project follows Tailwind's default 4px spacing scale. Commonly used values:

| Token         | Value | Common Usage                              |
| ------------- | ----- | ----------------------------------------- |
| `gap-1`       | 4px   | Icon groups, tight button rows            |
| `gap-1.5`     | 6px   | Action button pairs                       |
| `gap-2`       | 8px   | Icon + label, search bars, badge groups   |
| `gap-3`       | 12px  | Avatar + text, list items, event cards    |
| `gap-4`       | 16px  | Stat card grids, toolbar items            |
| `gap-5`       | 20px  | Column/widget spacing, main grid gaps     |
| `p-3`         | 12px  | Inner card sections, stat sub-cards       |
| `p-4`         | 16px  | Stat cards, request cards                 |
| `p-5`         | 20px  | Main widget/card padding                  |
| `p-6`         | 24px  | Page content area (`<main>`)              |
| `px-3`        | 12px  | Button horizontal padding, sidebar items  |
| `px-4`        | 16px  | Primary button horizontal padding         |
| `px-5`        | 20px  | Table cells, card inner content           |
| `py-1.5`      | 6px   | Tab buttons, small badges                 |
| `py-2`        | 8px   | Secondary buttons, search inputs          |
| `py-2.5`      | 10px  | Full-width primary buttons                |
| `py-3`        | 12px  | Table header/cells, topbar, user section  |
| `mb-1.5`      | 6px   | Section label to list                     |
| `mb-3`        | 12px  | Widget title to content (small)           |
| `mb-4`        | 16px  | Widget title to content (standard)        |
| `mb-5`        | 20px  | Calendar nav to grid, action bar to table |
| `mb-6`        | 24px  | Page title to main content                |
| `mt-1`        | 4px   | Subtitle below title                      |
| `mt-2`        | 8px   | Stat value below label                    |
| `mt-4`        | 16px  | Attendance time below header              |
| `mt-5`        | 20px  | CTA button below content                  |
| `space-y-0.5` | 2px   | Sidebar nav items                         |
| `space-y-3`   | 12px  | Request card list, event list             |
| `space-y-5`   | 20px  | Sidebar widget columns                    |

---

## 4. Borders & Radius

### Border Radius

| Token          | Value            | Tailwind       | Usage                                                            |
| -------------- | ---------------- | -------------- | ---------------------------------------------------------------- |
| `--radius`     | `0.75rem` (12px) | —              | Base radius variable                                             |
| `rounded-2xl`  | 16px             | `rounded-2xl`  | Cards, panels, stat cards, request cards                         |
| `rounded-xl`   | 12px             | `rounded-xl`   | Buttons, inputs, sidebar items, action icons, quick access icons |
| `rounded-lg`   | 8px              | `rounded-lg`   | Tabs, badges, status pills, small buttons, table rows hover area |
| `rounded-md`   | 6px              | `rounded-md`   | Calendar event pills                                             |
| `rounded-full` | 50%              | `rounded-full` | Avatars, today indicator on calendar                             |

### Borders

| Pattern                 | Tailwind Classes                                                    |
| ----------------------- | ------------------------------------------------------------------- |
| **Card border**         | `border border-border`                                              |
| **Table row separator** | `border-b border-border`                                            |
| **Sidebar right edge**  | `border-r border-border`                                            |
| **Top bar bottom**      | `border-b border-border`                                            |
| **User section top**    | `border-t border-border`                                            |
| **Input/search border** | `border border-border`                                              |
| **Sub-menu left line**  | `border-l border-border`                                            |
| **Calendar grid**       | `border border-border` + internal `border-b border-r border-border` |

All borders use the `border-border` token (1px solid).

---

## 5. Shadows & Elevation

The design is intentionally **flat with minimal elevation**. Shadows are used sparingly:

| Shadow            | Value                           | Usage                                                        |
| ----------------- | ------------------------------- | ------------------------------------------------------------ |
| `shadow-sm`       | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Active tab buttons, primary CTA buttons, active sidebar item |
| `hover:shadow-sm` | Same as above, on hover         | Request cards (`hover:shadow-sm transition-shadow`)          |
| No shadow         | —                               | Cards, panels, tables — all use `border` only                |

**Design rule:** Cards use borders for definition, not shadows. Only interactive "active" elements get `shadow-sm`.

---

## 6. Component Patterns

### Buttons

#### Primary Button

```html
<button
  class="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
>
  <Plus class="h-4 w-4" />
  Add Employee
</button>
```

#### Primary Button (Full Width)

```html
<button
  class="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
>
  Start Working
</button>
```

#### Secondary / Outline Button

```html
<button
  class="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors"
>
  <Filter class="h-4 w-4" />
  Filter
</button>
```

#### Ghost / Icon Button

```html
<button
  class="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
>
  <Bell class="h-[18px] w-[18px]" />
</button>
```

#### Small Action Button (Approve/Reject)

```html
<!-- Approve -->
<button
  class="rounded-lg bg-success/10 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/20 transition-colors"
>
  Approve
</button>
<!-- Reject -->
<button
  class="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
>
  Reject
</button>
```

#### Tab Button

```html
<!-- Active -->
<button
  class="rounded-lg px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground shadow-sm"
>
  All
</button>
<!-- Inactive -->
<button
  class="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
>
  Post
</button>
```

#### Small Pill Button (sidebar action)

```html
<button
  class="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
>
  View All
</button>
```

### Input / Search

```html
<div
  class="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2"
>
  <search class="h-4 w-4 text-muted-foreground" />
  <input
    type="text"
    placeholder="Search employees..."
    class="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-56"
  />
</div>
```

### Card

```html
<!-- Standard widget card -->
<div class="rounded-2xl border border-border bg-card p-5">
  <h3 class="font-display text-sm font-semibold text-foreground">
    Widget Title
  </h3>
  <!-- content -->
</div>

<!-- Stat card -->
<div class="rounded-2xl border border-border bg-card p-4">
  <div class="flex items-center justify-between">
    <p class="text-sm text-muted-foreground">Label</p>
    <Icon class="h-5 w-5 text-primary" />
  </div>
  <p class="mt-2 font-display text-2xl font-bold text-foreground">42</p>
</div>

<!-- Request / list item card -->
<div
  class="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 hover:shadow-sm transition-shadow"
>
  <!-- avatar + content + status -->
</div>

<!-- Sub-stat card (inside a widget) -->
<div class="rounded-xl bg-secondary/50 p-3">
  <p class="font-display text-lg font-bold text-foreground">12</p>
  <p class="text-xs text-muted-foreground">
    Meetings <span class="opacity-60">· this month</span>
  </p>
</div>
```

### Badge / Status Tag

```html
<!-- Status badge -->
<span
  class="inline-flex items-center rounded-lg px-2.5 py-0.5 text-xs font-medium bg-success/10 text-success"
>
  Active
</span>

<!-- Status badge with icon -->
<span
  class="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent-foreground"
>
  <Clock class="h-3 w-3" />
  Pending
</span>
```

### Avatar / Initials

```html
<!-- Standard (40px) -->
<div
  class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
>
  AS
</div>

<!-- Small (36px) -->
<div
  class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
>
  S
</div>

<!-- Table row (32px) -->
<div
  class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary"
>
  AS
</div>
```

Avatar color rotation for lists:

```
bg-primary/15 text-primary
bg-accent/20 text-accent-foreground
bg-success/15 text-success
bg-destructive/10 text-destructive
```

### Quick Access Icon Button

```html
<button
  class="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-primary/30 hover:bg-secondary hover:text-primary"
>
  <UserPlus class="h-4 w-4" />
</button>
```

### Table

```html
<div class="rounded-2xl border border-border bg-card overflow-hidden">
  <table class="w-full">
    <thead>
      <tr class="border-b border-border">
        <th
          class="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
        >
          Column
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
      >
        <td class="px-5 py-3 text-sm text-foreground">Cell content</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Sidebar

```html
<aside
  class="flex h-screen w-[260px] flex-shrink-0 flex-col border-r border-border bg-card"
>
  <!-- Logo area: px-5 py-5 -->
  <!-- Nav: flex-1 overflow-y-auto px-3 pb-4 -->
  <!-- User section: border-t border-border px-4 py-3 -->
</aside>
```

#### Sidebar Nav Item (Active)

```html
<button
  class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium bg-primary text-primary-foreground shadow-sm"
>
  <Home class="h-[18px] w-[18px] flex-shrink-0" />
  <span class="flex-1 text-left">Dashboard</span>
</button>
```

#### Sidebar Nav Item (Inactive)

```html
<button
  class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-foreground/70 hover:bg-secondary hover:text-secondary-foreground transition-all"
>
  <Users class="h-[18px] w-[18px] flex-shrink-0" />
  <span class="flex-1 text-left">Employees</span>
  <ChevronDown class="h-3.5 w-3.5 opacity-40" />
</button>
```

#### Sidebar Sub-Item (Active)

```html
<button
  class="flex w-full items-center rounded-lg px-3 py-1.5 text-[13px] font-medium text-primary"
>
  Team
</button>
```

#### Sidebar Section Title

```html
<p class="mb-1.5 px-3 text-[11px] font-medium text-muted-foreground/70">
  People
</p>
```

#### Sub-menu Container

```html
<ul class="ml-5 mt-0.5 space-y-0.5 border-l border-border pl-3">
  <!-- sub-items -->
</ul>
```

### Top Bar / Header

```html
<header
  class="flex h-14 items-center justify-between border-b border-border bg-card px-6"
>
  <!-- Left: hamburger + breadcrumb -->
  <div class="flex items-center gap-4">
    <button
      class="text-muted-foreground hover:text-foreground transition-colors"
    >
      <menu class="h-5 w-5" />
    </button>
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <span>SignHR</span>
      <span class="opacity-40">›</span>
      <span class="font-medium text-foreground">Dashboard</span>
    </div>
  </div>
  <!-- Right: icon buttons -->
  <div class="flex items-center gap-1">
    <!-- ThemeToggle, Bell, Chat, Search — all ghost icon buttons -->
  </div>
</header>
```

### Calendar Event Pill

```html
<div
  class="mt-1 truncate rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-primary/15 text-primary"
>
  Team Standup
</div>
```

### Calendar Date Badge

```html
<!-- Today -->
<span
  class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold"
>
  1
</span>
<!-- Normal day -->
<span
  class="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs text-foreground/70"
>
  15
</span>
```

### Event Date Chip (Sidebar)

```html
<div
  class="flex flex-col items-center rounded-lg bg-primary/10 px-2.5 py-1.5 text-primary"
>
  <span class="text-[10px] font-medium">Mar</span>
  <span class="text-base font-bold leading-tight">3</span>
</div>
```

### Empty State

```html
<div
  class="flex flex-col items-center justify-center py-20 text-muted-foreground"
>
  <MessageSquare class="mb-3 h-10 w-10 opacity-20" />
  <p class="text-sm">No posts yet</p>
</div>
```

---

## 7. Layout & Grid

### Page Structure

```
┌─────────────────────────────────────────────────┐
│ Sidebar (260px)  │  Main Content Area           │
│ ┌─────────────┐  │ ┌─────────────────────────┐  │
│ │ Logo        │  │ │ Top Bar (h-14)          │  │
│ │ Navigation  │  │ ├─────────────────────────┤  │
│ │ ...         │  │ │ Content (p-6, scroll)   │  │
│ │ User        │  │ │                         │  │
│ └─────────────┘  │ └─────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

```html
<div class="flex h-screen overflow-hidden bg-background">
  <aside class="w-[260px] flex-shrink-0 ...">...</aside>
  <div class="flex flex-1 flex-col overflow-hidden">
    <header class="h-14 ...">...</header>
    <main class="flex-1 overflow-y-auto p-6">...</main>
  </div>
</div>
```

### Grid System

| Layout            | Classes                                                                                |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Dashboard**     | `grid grid-cols-12 gap-5` → left `col-span-3`, center `col-span-6`, right `col-span-3` |
| **Calendar**      | `grid grid-cols-12 gap-5` → calendar `col-span-8`, sidebar `col-span-4`                |
| **Calendar grid** | `grid grid-cols-7`                                                                     |
| **Stats row**     | `grid grid-cols-4 gap-4`                                                               |
| **Quick stats**   | `grid grid-cols-2 gap-3`                                                               |

### Key Dimensions

| Element           | Value                        |
| ----------------- | ---------------------------- |
| Sidebar width     | `260px` (`w-[260px]`)        |
| Top bar height    | `56px` (`h-14`)              |
| Content padding   | `24px` (`p-6`)               |
| Grid gap (main)   | `20px` (`gap-5`)             |
| Grid gap (stats)  | `16px` (`gap-4`)             |
| Sidebar icon size | `18px` (`h-[18px] w-[18px]`) |

### Responsive

Currently designed for desktop only (1280px+ content area within `max-width: 1400px` container). No mobile breakpoints implemented. The sidebar is always visible.

---

## 8. Animation & Transitions

### CSS Transitions

| Pattern                | Classes             | Duration                 |
| ---------------------- | ------------------- | ------------------------ |
| **Color transitions**  | `transition-colors` | 150ms (Tailwind default) |
| **All transitions**    | `transition-all`    | 150ms                    |
| **Shadow transitions** | `transition-shadow` | 150ms                    |

### Keyframe Animations

```css
/* Fade-in with slide up — used for dashboard widgets */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Usage: animate-fade-in with staggered animationDelay */
```

```css
/* Accordion open/close */
@keyframes accordion-down {
  from {
    height: 0;
  }
  to {
    height: var(--radix-accordion-content-height);
  }
}
@keyframes accordion-up {
  from {
    height: var(--radix-accordion-content-height);
  }
  to {
    height: 0;
  }
}
```

### Staggered Entry Animation

Dashboard widgets use `animate-fade-in` with incremental `animationDelay`:

```tsx
<div class="animate-fade-in" style={{ animationDelay: "0ms" }}>...</div>
<div class="animate-fade-in" style={{ animationDelay: "80ms" }}>...</div>
<div class="animate-fade-in" style={{ animationDelay: "160ms" }}>...</div>
<div class="animate-fade-in" style={{ animationDelay: "240ms" }}>...</div>
```

### Hover States

| Component          | Hover Effect                                                    |
| ------------------ | --------------------------------------------------------------- |
| Table rows         | `hover:bg-secondary/50`                                         |
| Cards (list items) | `hover:shadow-sm`                                               |
| Quick access icons | `hover:border-primary/30 hover:bg-secondary hover:text-primary` |
| Sidebar items      | `hover:bg-secondary hover:text-secondary-foreground`            |
| Ghost icon buttons | `hover:bg-secondary hover:text-foreground`                      |
| Calendar cells     | `hover:bg-secondary/30`                                         |
| Event items        | `hover:bg-secondary/50`                                         |

---

## 9. Icons & Assets

### Icon Library

**Lucide React** (`lucide-react`) — line-style icons with consistent 1.5px stroke.

### Icon Sizing Convention

| Context                      | Size | Tailwind                 |
| ---------------------------- | ---- | ------------------------ |
| **Top bar / sidebar nav**    | 18px | `h-[18px] w-[18px]`      |
| **Page header icons**        | 20px | `h-5 w-5`                |
| **Stat card icons**          | 20px | `h-5 w-5`                |
| **Button inline icons**      | 16px | `h-4 w-4`                |
| **Table action icons**       | 14px | `h-3.5 w-3.5`            |
| **Small badge icons**        | 12px | `h-3 w-3`                |
| **Empty state icon**         | 40px | `h-10 w-10 opacity-20`   |
| **Chevron (sidebar expand)** | 14px | `h-3.5 w-3.5 opacity-40` |

### Commonly Used Icons

```
Home, Users, FileText, Calendar, Clock, CreditCard, FolderOpen, Settings,
ChevronDown, ChevronRight, ChevronLeft, Bell, MessageSquareText, Search,
Menu, Sun, Moon, Plus, Filter, MoreHorizontal, Mail, Phone,
UserPlus, FolderOpen, CalendarOff, Cake, MapPin, BarChart3,
CheckCircle2, XCircle, AlertCircle
```

### Logo

The app logo is imported as a static asset (`src/assets/logo.png`), displayed at `h-9 w-auto` in the sidebar.

---

## 10. Visual Tone

SignHR follows a **clean, airy, and professional** aesthetic inspired by modern SaaS admin panels. The design uses generous white space and very subtle borders (never heavy shadows) to define visual hierarchy. The primary brand purple (`#7C4DFF`) is used sparingly — only for active states, primary CTAs, and focus indicators — while the majority of the interface remains neutral with soft gray backgrounds and muted text.

The rounded corners (`rounded-2xl` for cards, `rounded-xl` for buttons) give the UI a friendly, approachable feel without being overly playful. Typography pairs a geometric display font (Space Grotesk) for headings and numbers with a humanist sans-serif (DM Sans) for body text, creating a balance between authority and readability.

Status communication is color-coded and consistent: green for positive/active, amber for warnings/pending, red for errors/rejected, and purple for informational/remote states. These colors appear as translucent badges (`bg-color/10 text-color`) rather than solid blocks, keeping the interface calm and scannable.

The dark mode inverts surfaces to deep blue-grays (`230 20% 10%`) rather than pure black, with slightly boosted purple primary and lighter text, maintaining the same visual hierarchy and brand recognition across both themes.

---

## 11. Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.4);
}
```

---

## 12. Theme Toggle Implementation

Theme is managed via a React context provider that toggles a `light`/`dark` class on `<html>`:

```tsx
// ThemeProvider wraps the app
// Theme stored in localStorage key: "signhr-theme"
// Toggle: Sun icon (dark→light) / Moon icon (light→dark)
// Button: rounded-xl ghost icon button in the top-right header bar
```

---

## Quick Reference: CSS Variable Setup

```css
@layer base {
  :root {
    --background: 220 14% 96%;
    --foreground: 230 25% 12%;
    --card: 0 0% 100%;
    --card-foreground: 230 25% 12%;
    --primary: 258 58% 56%;
    --primary-foreground: 0 0% 100%;
    --secondary: 258 30% 96%;
    --secondary-foreground: 258 40% 30%;
    --muted: 220 14% 93%;
    --muted-foreground: 220 10% 46%;
    --accent: 35 92% 55%;
    --accent-foreground: 35 95% 20%;
    --destructive: 0 72% 55%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 16% 90%;
    --input: 220 16% 90%;
    --ring: 258 58% 56%;
    --radius: 0.75rem;
    --success: 152 56% 46%;
    --success-foreground: 0 0% 100%;
    --warning: 35 92% 55%;
    --warning-foreground: 35 95% 20%;
    --info: 210 80% 55%;
    --info-foreground: 0 0% 100%;
    --font-display: "Space Grotesk", sans-serif;
    --font-body: "DM Sans", sans-serif;
  }
}
```

Tailwind config must map all tokens using `hsl(var(--token-name))` format.
