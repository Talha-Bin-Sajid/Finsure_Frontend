# FINSURE - Financial Insights & Secure Reporting Platform

A production-quality, frontend-only single-page application built with React, featuring a dark fintech aesthetic with modern UI/UX patterns.

## 🎨 Theme

FINSURE uses a consistent dark theme across the entire application:

- **Background**: `#0c111a`
- **Surface panels**: `#151c27` (cards, modals, sidebars)
- **Accent blue**: `#14e7ff`
- **Buttons/CTAs**: `#0ab6ff`
- **Text**: `#e7f0fa`

## 🚀 Features

### Public Features (Before Login)
- **Landing Page**: Modern hero section with feature highlights
- **Quickstart Guide**: Step-by-step tutorial on using FINSURE
- **Pricing**: Three-tier pricing structure (Free, Pro, Enterprise)
- **FAQs**: Accordion-style frequently asked questions

### Authentication
- **Login/Signup**: Form validation with demo credentials
- **Protected Routes**: Automatic redirect based on auth state
- **Mock 2FA**: Simulated two-factor authentication flow

### Dashboard (After Login)
- **Overview**: Financial summary cards (Income, Expenses, Net Profit, Taxable Income)
- **Recent Uploads**: List of recently uploaded documents
- **Activity Feed**: Recent user actions

### File Management
- **Upload**: Drag-and-drop file upload with progress tracking
- **OCR Simulation**: Mock AI-powered data extraction
- **File Types**: Support for receipts, invoices, and bank statements

### Data Review
- **Extraction Review**: Editable transaction table with inline editing
- **Categorization**: Dropdown categories for transactions
- **CSV Export**: Download extracted data

### Reporting
- **Report Generation**: Create income/expense, tax summary, and cashflow reports
- **Date Range Filters**: Custom date selection for reports
- **Download/Share**: Mock PDF download and share link functionality

### Visualizations
- **Interactive Charts**: Built with Recharts
  - Category breakdown (Pie chart)
  - Monthly trends (Bar chart)
  - Cash flow analysis (Line chart)
- **Superset Integration**: Placeholder for Apache Superset

### Settings & Security
- **Profile Management**: Update name and email
- **Password Change**: Multi-step password update flow
- **2FA Setup**: Simulated QR code and verification
- **Notifications**: Toggle email and push notifications
- **Data Export**: Request full data export
- **Account Deletion**: Permanent account removal

### History
- **Upload History**: Paginated list of all uploads
- **Filters**: Filter by file type and status
- **Search**: Quick search functionality

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Sidebar.tsx
│   ├── Topbar.tsx
│   ├── MobileNav.tsx
│   └── Toast.tsx
├── pages/             # Page components
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Dashboard.tsx
│   ├── Upload.tsx
│   ├── ExtractionReview.tsx
│   ├── History.tsx
│   ├── Reports.tsx
│   ├── Dashboards.tsx
│   ├── Settings.tsx
│   ├── Security.tsx
│   ├── Help.tsx
│   ├── Pricing.tsx
│   ├── FAQs.tsx
│   └── Quickstart.tsx
├── layouts/           # Layout wrappers
│   ├── MainLayout.tsx
│   └── PublicLayout.tsx
├── services/          # API and service layer
│   └── apiClient.ts
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── data/              # Mock data
│   └── mockData.json
├── utils/             # Utility functions
│   └── toast.ts
└── App.tsx            # Main app with routing
```

## 🛠️ Technologies

- **React 18.3**: Latest stable React version
- **TypeScript**: Type-safe development
- **React Router 6**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library for data visualization
- **Lucide React**: Icon library
- **Axios**: HTTP client (for future API integration)
- **Vite**: Fast build tool and dev server

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Demo Credentials

```
Email: demo@finsure.com
Password: demo123
2FA Code: 123456
```

## 🔌 Backend Integration

The project is structured for easy backend integration:

### API Client Configuration

All API calls go through `src/services/apiClient.ts`, which uses a mock API layer. To connect to a real backend:

1. **Set environment variable**:
   ```env
   VITE_API_BASE_URL=https://your-backend-api.com/api
   ```

2. **Replace mock API calls**:
   ```typescript
   // Current: mockApi.auth.login(email, password)
   // Replace with: apiClient.post('/auth/login', { email, password })
   ```

3. **Update authentication flow**:
   - Replace localStorage token management with your auth solution
   - Update AuthContext to handle real token refresh
   - Implement proper session management

### Expected API Endpoints

```
POST   /auth/login
POST   /auth/signup
POST   /auth/verify-2fa
POST   /upload
GET    /extractions/:fileId
PUT    /extractions/:fileId/transactions/:transactionId
GET    /reports
POST   /reports/generate
GET    /history
GET    /dashboard/summary
GET    /dashboard/recent-uploads
GET    /dashboard/activities
GET    /charts/data
```

### Authentication

The app expects JWT-based authentication:
- Store token in `Authorization: Bearer <token>` header
- Token stored in localStorage as `authToken`
- User info stored in localStorage as `user` (JSON string)

## 📦 Build for Production

```bash
# Type check
npm run typecheck

# Build
npm run build

# Preview production build
npm run preview
```

The production build will be in the `dist/` directory.

## 🎯 Key Features for Backend Team

### Mock Data Structure

All mock data is in `src/data/mockData.json`:
- User credentials
- Dashboard summaries
- Transactions
- Reports
- Chart data
- Activity logs

### State Management

- **Authentication**: React Context (`AuthContext.tsx`)
- **Notifications**: Toast manager (`utils/toast.ts`)
- **Local state**: React useState/useEffect

### File Upload Flow

1. User selects/drops files
2. Files validated (type, size)
3. User assigns type tags (receipt/invoice/bank statement)
4. Upload simulation with progress bar
5. Mock OCR processing
6. Redirect to history/extraction review

## 🔒 Security Considerations

- All sensitive operations require authentication
- Protected routes redirect unauthenticated users
- 2FA simulation ready for real implementation
- CSRF protection ready (add tokens to API client)
- XSS protection through React's built-in escaping

## 📱 Responsiveness

- **Desktop**: Full sidebar navigation, expanded layout
- **Tablet**: Collapsible sidebar, optimized spacing
- **Mobile**: Bottom navigation bar, stacked layouts

Breakpoints follow Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

## 🎨 Customization

### Changing Theme Colors

Update colors in:
1. Component files (search for `#0c111a`, `#151c27`, `#14e7ff`, etc.)
2. `tailwind.config.js` for global Tailwind classes
3. `src/index.css` for base styles

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Sidebar.tsx` and `MobileNav.tsx`

## 🐛 Known Limitations (Mock Data)

- File uploads don't actually process files
- OCR extraction is simulated with delays
- PDF generation creates mock downloads
- Charts use static data
- Pagination doesn't slice data
- Search/filters use client-side filtering

## 📄 License

MIT License - This is a demo project for educational purposes.

## 👥 Support

For questions or issues:
- Email: support@finsure.com (mock)
- Documentation: Browse in-app Help section

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
