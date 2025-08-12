# Fishing Charter Marketplace

Australia's leading online marketplace for booking fishing charters and connecting charter operators with experienced crew members.

## Project Overview

This platform serves as a one-stop solution for:
- **Anglers**: Search, compare, and book fishing charters
- **Operators**: List charters and hire qualified deckhands
- **Crew**: Find job opportunities and apply for positions

## Tech Stack

- **Backend**: Laravel 10 (PHP 8.1+)
- **Frontend**: Vue.js 3 with Composition API
- **Database**: PostgreSQL
- **Authentication**: Laravel Sanctum + OAuth (Google, Facebook)
- **Payments**: Stripe
- **Maps**: Google Places API
- **Reviews**: Google Business Reviews API

## Features

### Core Functionality
- [x] User authentication and role-based access
- [x] Charter listings with search and filtering
- [x] Real-time booking system with Stripe integration
- [x] Crew posting and application system
- [x] Messaging system between users
- [x] Reviews and ratings system
- [x] Admin dashboard
- [x] Responsive mobile-first design

### User Roles
- **Anglers**: Book charters, leave reviews, message operators
- **Operators**: List charters, hire crew, manage bookings
- **Crew**: Apply for jobs, manage applications
- **Admins**: Platform management and oversight

## Project Structure

```
project/
├── backend/                 # Laravel API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/               # Vue.js SPA
│   ├── src/
│   ├── public/
│   └── ...
├── docs/                   # Documentation
└── docker/                 # Docker configuration
```

## Quick Start

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- PostgreSQL 12+
- Docker (optional)

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` files in both backend and frontend directories with the following variables:

### Backend (.env)
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=fishing_charter
DB_USERNAME=your_username
DB_PASSWORD=your_password

STRIPE_KEY=your_stripe_public_key
STRIPE_SECRET=your_stripe_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## API Documentation

The API documentation is available at `/api/documentation` when the backend is running.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is proprietary software.
