# IRCTC Inspector Dashboard

A comprehensive React-based dashboard application for railway inspectors to scan, manage, and track product information using QR codes with professional routing and detailed forms.

## Features

### 🔐 **Authentication & Navigation**
- **Inspector Authentication**: Dummy login with inspector name "Rohit"
- **React Router**: Multi-page navigation with proper routing
- **Active Navigation**: Highlighted current page in navbar

### 📱 **QR Code Scanning**
- **Real-time Camera Scanning**: Live QR code detection with camera
- **Manual Input Fallback**: Type product IDs manually (PROD001, PROD002, PROD003)
- **Test Mode**: Random product selection for demo purposes

### 📊 **Enhanced Product Dashboard**
- **Comprehensive Product Details**:
  - Basic Information (Name, ID, Model, Serial Number)
  - Vendor Information (Contact, Email, Warranty)
  - Maintenance Schedule (Last/Next maintenance dates)
  - Technical Specifications
  - Current Status & Condition
- **Live GPS Tracking**: Automatically captures and displays scan location
- **Professional Layout**: Organized cards with status indicators

### 📝 **Professional Update Form**
- **Detailed Condition Assessment**: 
  - Condition rating (Excellent, Good, Fair, Poor, Critical)
  - Operational status tracking
  - Maintenance type classification
  - Priority level assignment
- **Issue Tracking**: Checkbox selection for common issues
- **Inspector Notes**: Detailed notes and recommendations
- **Form Validation**: Required fields and proper data handling

### 📈 **Product History & Audit Trail**
- **Timeline View**: Chronological maintenance history
- **Filtering & Search**: Filter by maintenance type, search by inspector/notes
- **Statistics Dashboard**: Maintenance counts and trends
- **Detailed Records**: Complete audit trail with timestamps

### 🖼️ **Image Management**
- **Geo-tagged Uploads**: Automatic location tagging for images
- **Image Preview**: Real-time preview before upload
- **File Validation**: Image format validation

### 🎨 **Professional Design**
- **IRCTC Theme**: Blue (#1E40AF), black, and white color scheme
- **Responsive Layout**: Works on desktop and mobile devices
- **Status Indicators**: Color-coded status and condition badges
- **Professional Forms**: Clean, organized form layouts

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS 3
- **QR Scanning**: qr-scanner library
- **Location Services**: Browser Geolocation API

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Open Browser**: Navigate to `http://localhost:5173`

## Usage

### 🚀 **Getting Started**
1. **Login**: The app automatically logs in as "Rohit" (dummy user)
2. **Scan QR Code**: 
   - Use camera to scan QR codes
   - Or manually enter product IDs: PROD001, PROD002, PROD003
   - Or click "Test with Random Product" for demo

### 📊 **Dashboard Navigation**
3. **View Product Details**: Comprehensive product information with:
   - Basic information, vendor details, maintenance schedule
   - Technical specifications and current status
   - Live GPS location tracking

### 📝 **Product Management**
4. **Update Condition**: Professional form with:
   - Condition assessment and status tracking
   - Issue identification and recommendations
   - Inspector notes and priority assignment
5. **View History**: Complete audit trail with:
   - Timeline view of all maintenance records
   - Filtering and search capabilities
   - Maintenance statistics and trends
6. **Upload Images**: Geo-tagged image uploads with preview

### 🧭 **Navigation**
- Use the navbar to navigate between pages
- Active page is highlighted in the navigation
- Breadcrumb navigation for easy back navigation

## Sample Data

The application includes comprehensive sample product data in `data.json`:

### **PROD001**: Railway Signal Controller
- **Vendor**: Bharat Electronics Limited
- **Specifications**: 24V DC, 50W power consumption
- **Maintenance History**: 2 records (Preventive maintenance, Repair)

### **PROD002**: Track Monitoring Sensor  
- **Vendor**: Hindustan Aeronautics Limited
- **Specifications**: Vibration & Temperature sensor, 0-1000 Hz range
- **Maintenance History**: 1 record (Calibration)

### **PROD003**: Communication Antenna
- **Vendor**: Tata Advanced Systems
- **Specifications**: 400-470 MHz frequency, 8 dBi gain
- **Maintenance History**: 1 record (Inspection)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar with routing
│   ├── QRScanner.jsx           # QR code scanning component
│   ├── ProductDashboard.jsx    # Enhanced product dashboard
│   ├── UpdateConditionForm.jsx # Professional condition update form
│   └── ProductHistory.jsx      # Maintenance history & audit trail
├── App.jsx                     # Main application with routing
├── index.css                   # Tailwind CSS imports
└── main.jsx                    # Application entry point

data.json                       # Comprehensive product database
```

## Routes

- **`/`** - QR Scanner page (default)
- **`/dashboard`** - Product dashboard with detailed information
- **`/update-condition`** - Professional form for updating product condition
- **`/history`** - Product maintenance history and audit trail

## Browser Compatibility

- Modern browsers with camera access support
- Geolocation API support required for location tracking
- ES6+ JavaScript support

## Development

- **Build**: `npm run build`
- **Preview**: `npm run preview`
- **Lint**: `npm run lint`