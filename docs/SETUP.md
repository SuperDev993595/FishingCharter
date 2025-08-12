# Fishing Charter Marketplace - Setup Guide

This guide will help you set up the Fishing Charter Marketplace project on your local development environment.

## Prerequisites

Before you begin, make sure you have the following installed:

- **PHP 8.1+** with extensions: bcmath, ctype, fileinfo, json, mbstring, openssl, pdo, tokenizer, xml
- **Composer** (PHP package manager)
- **Node.js 16+** and npm
- **PostgreSQL 12+**
- **Git**

## Backend Setup (Laravel)

### 1. Clone and Navigate to Backend

```bash
cd backend
```

### 2. Install Dependencies

```bash
composer install
```

### 3. Environment Configuration

Copy the environment configuration:

```bash
cp ../docs/env-example.txt .env
```

Edit the `.env` file and update the following values:

- **Database Configuration**: Update `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`
- **Stripe Keys**: Add your Stripe test keys for payment processing
- **OAuth Keys**: Add Google and Facebook OAuth credentials
- **Google Places API**: Add your Google Places API key

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE fishing_charter;
```

Run the migrations:

```bash
php artisan migrate
```

### 6. Install Additional Packages (if needed)

```bash
composer require stripe/stripe-php laravel/socialite
```

### 7. Start the Development Server

```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

## Frontend Setup (Vue.js)

### 1. Navigate to Frontend Directory

```bash
cd ../frontend
```

### 2. Create Vue.js Project

```bash
npm create vue@latest . -- --typescript --router --pinia --eslint
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install Additional Packages

```bash
npm install axios @stripe/stripe-js @vueuse/core
npm install -D @types/node
```

### 5. Environment Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### 6. Start the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Database Seeding (Optional)

To populate the database with sample data:

```bash
php artisan db:seed
```

## Testing the Setup

### 1. Test Backend API

Visit `http://localhost:8000/api/charters` to see if the API is working.

### 2. Test Frontend

Visit `http://localhost:5173` to see the Vue.js application.

## API Documentation

Once the backend is running, you can access the API documentation at:

- **Swagger UI**: `http://localhost:8000/api/documentation` (if installed)
- **API Endpoints**: See `routes/api.php` for all available endpoints

## Key Features to Test

### 1. User Registration/Login
- Register as an Angler, Operator, or Crew member
- Login with credentials
- Test role-based access

### 2. Charter Management
- Create charter listings (Operators only)
- Search and filter charters
- View charter details

### 3. Booking System
- Book a charter (Anglers only)
- Manage bookings
- Payment integration

### 4. Crew System
- Post crew positions (Operators only)
- Apply for crew positions (Crew only)
- Manage applications

### 5. Messaging
- Send messages between users
- View conversation history

### 6. Reviews
- Leave reviews for charters
- View ratings and feedback

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Composer Install Issues**
   - Check PHP version (8.1+ required)
   - Verify PHP extensions are installed
   - Clear composer cache: `composer clear-cache`

3. **Migration Errors**
   - Check database connection
   - Ensure PostgreSQL is running
   - Verify database permissions

4. **Frontend Build Issues**
   - Check Node.js version (16+ required)
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall

### Getting Help

If you encounter issues:

1. Check the Laravel logs: `storage/logs/laravel.log`
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure all required services are running

## Production Deployment

For production deployment:

1. Set `APP_ENV=production` in `.env`
2. Set `APP_DEBUG=false` in `.env`
3. Configure production database
4. Set up SSL certificates
5. Configure web server (Apache/Nginx)
6. Set up proper file permissions
7. Configure backup strategies

## Next Steps

After successful setup:

1. **Customize the UI**: Modify Vue.js components to match your brand
2. **Configure Integrations**: Set up Stripe, Google OAuth, and other services
3. **Add Features**: Implement additional features as needed
4. **Testing**: Write comprehensive tests
5. **Deployment**: Deploy to production environment
