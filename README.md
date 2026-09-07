# NEERKAAPPAN Command Center

Build the initial frontend foundation for a React.js web application called NEERKAAPPAN – Environmental Intelligence Network.

IMPORTANT: This is only the initial UI foundation. Do NOT build all monitoring pages yet. Focus on creating a polished dashboard shell and main overview screen that we can extend later.

TECH STACK

Use:

React.js

JavaScript

Vite

Tailwind CSS

React Router

Lucide React

Recharts only if needed for the initial dashboard

Do NOT use Next.js.

Do NOT create a backend, database, MQTT connection, authentication, API integration, or WebSocket yet.

Use mock/static data only.

DESIGN

Create a professional environmental disaster monitoring command center.

Dark theme.

Use this color palette:

Background: #020617

Cards: #0f172a

Primary accent: #22d3ee

Secondary accent: #a855f7

Main text: #e2e8f0

Secondary text: #94a3b8

Borders: #1e293b

The design should look modern, technical, clean and professional.

Avoid making it look like a generic admin dashboard.

Use subtle borders, rounded cards, soft shadows and minimal animations.

APPLICATION STRUCTURE

Create a persistent dashboard layout:

┌─────────────────────────────────────────────────────────────┐
│ TOP HEADER                                                  │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│   SIDEBAR    │                 MAIN CONTENT                 │
│              │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘


SIDEBAR

Create a collapsible left sidebar.

Logo:

NEERKAAPPAN
Environmental Intelligence


Add a small green status indicator:

● SYSTEM OPERATIONAL


Navigation:

OVERVIEW

⌂ Dashboard

MONITORING

🗺 Live Map
🌊 River Nodes
🏭 Industrial Nodes
⛰ Landslide Nodes

MANAGEMENT

🚨 Alerts
📊 Analytics
📡 Node Health
📜 History

SYSTEM

⚙ Settings


For now, only the Dashboard page needs to be fully implemented.

Other navigation items should exist visually and have routes/placeholders so we can implement them later.

Sidebar requirements:

Active Dashboard state

Collapsible on desktop

Mobile drawer

Lucide icons

Smooth transitions

Professional spacing

TOP HEADER

Create a top header containing:

Left:

Dashboard
Environmental Intelligence Overview


Right:

● Live System
🔔
Sep 7, 2026


Make the notification icon clickable and show a small notification dropdown containing a few mock alerts.

DASHBOARD

Route:

/dashboard


Redirect / to /dashboard.

Header:

Environmental Intelligence Overview

Monitor environmental conditions, node health and active risks.


SUMMARY CARDS

Create four high-quality summary cards:

Total Nodes

35
31 Online


Icon: network/sensors

Active Alerts

6
2 Critical


Icon: alert triangle

Critical Nodes

3
Requires Attention


Icon: shield warning

System Health

94.8%
Operational


Icon: activity/pulse

Each card should include:

Icon

Large number

Label

Supporting text

Small trend/status indicator

NODE TYPE CARDS

Below the summary cards create three large cards.

RIVER

🌊 RIVER MONITORING

12 Nodes
10 Online

1 Warning
1 Critical

Flood Risk
72%


Button:

View River Nodes →


INDUSTRIAL

🏭 INDUSTRIAL MONITORING

8 Nodes
8 Online

2 Warning
0 Emergency

Pollution Risk
41%


Button:

View Industrial Nodes →


LANDSLIDE

⛰ LANDSLIDE MONITORING

15 Nodes
13 Online

1 Warning
1 High Risk

Landslide Risk
27%


Button:

View Landslide Nodes →


Use distinct visual icons and subtle accent treatments.

LIVE RISK MAP PLACEHOLDER

For this first version, create a large Live Environmental Risk Map section.

If Leaflet can be implemented cleanly without additional configuration, use Leaflet.

Otherwise create a polished map-style placeholder that looks like a real monitoring map.

Show fictional/demo node markers:

🟢 River
🟡 River
🔴 Industrial
🟠 Industrial
🟢 Landslide


Add a legend:

● Normal
● Watch
● Warning
● Critical


Clearly label:

DEMO DATA


Do NOT imply these are real deployed locations.

RISK OVERVIEW

Create a card titled:

Risk Overview


Display:

Flood Risk
██████████████░░░░ 72%

Industrial Pollution
████████░░░░░░░░░░ 41%

Landslide Risk
█████░░░░░░░░░░░░░ 27%


Use appropriate severity styling.

RECENT ALERTS

Create a card titled:

Recent Alerts


Show 4 mock alerts:

🔴 HIGH
Landslide Node 04
Increased rainfall and movement indicators
2 minutes ago


🟠 WARNING
River Node 07
Rapid water-level increase
5 minutes ago


🟡 WATCH
Industrial Node 03
PM2.5 above recent baseline
12 minutes ago


🟡 WATCH
River Node 02
Rainfall increasing
18 minutes ago


Each alert should have:

Severity indicator

Node name

Description

Timestamp

View action

RESPONSIVENESS

The dashboard must work well on:

Desktop

Laptop

Tablet

Mobile

On mobile:

Sidebar becomes a drawer

Summary cards stack

Node cards stack

Map becomes full width

Alerts become full width

No horizontal overflow

COMPONENT STRUCTURE

Do NOT put everything into App.tsx.

Create reusable components such as:

src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Header.tsx
│   │
│   ├── dashboard/
│   │   ├── StatCard.tsx
│   │   ├── NodeTypeCard.tsx
│   │   ├── RiskOverview.tsx
│   │   ├── LiveRiskMap.tsx
│   │   └── RecentAlerts.tsx
│   │
│   └── common/
│       ├── StatusBadge.tsx
│       └── RiskBadge.tsx
│
├── pages/
│   └── Dashboard.tsx
│
├── data/
│   └── mockData.ts
│
├── types/
│   └── node.ts
│
└── App.tsx


Keep the architecture clean because additional pages will be added later.

MOCK DATA

Create centralized mock data in:

src/data/mockData.ts


Do not hard-code repeated values directly inside components.

Use realistic but clearly simulated data.

Add:

DEMO ENVIRONMENT
Sensor values are simulated


somewhere unobtrusive in the dashboard.

IMPORTANT

Do NOT build:

River detail page

Industrial detail page

Landslide detail page

Analytics page

History page

Node Health page

Full Alert Center

Backend

MQTT

Database

Authentication

WebSocket

Those will be implemented in later steps.

For this generation, prioritize:

Excellent visual design

Dashboard layout

Sidebar

Header

Summary cards

Node type cards

Risk overview

Recent alerts

Map/Map placeholder

Responsive behavior

Clean reusable React components

Make the result feel like a real environmental disaster monitoring command center, not a template.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7ded2146-1294-4e27-ae8e-f1eb1088a6fc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
